const express = require('express');
const mysql = require('mysql2/promise');
const session = require('express-session');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// ─────────────────────────────────────────────────────────────
// UPDATE THESE — hPanel → Databases → MySQL Databases
// ─────────────────────────────────────────────────────────────
const db = mysql.createPool({
  host:     '127.0.0.1',                  // always localhost on Hostinger
  user:     'u966260443_ppt',      // your DB username
  password: 'Makelabs@123',            // your DB password
  database: 'u966260443_ppt',      // your DB name
  waitForConnections: true,
  connectionLimit: 10,
});
// ─────────────────────────────────────────────────────────────

// Multer — upload images to uploads/images/
const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, 'uploads', 'images')),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

app.set('db', db);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
  secret: 'ppt-builder-secret-key',
  resave: false,
  saveUninitialized: false,
}));

// ── ROUTES: Pages ─────────────────────────────────────────────

// Home — list all presentations
app.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, title, description, created_at, updated_at, status FROM presentations ORDER BY updated_at DESC'
    );
    res.render('index', { presentations: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error: ' + err.message);
  }
});

// Editor — new or edit
app.get('/editor', async (req, res) => {
  const id = req.query.id || null;
  let presentation = { id: '', title: '', description: '', slides: [] };

  if (id) {
    try {
      const [pres] = await db.query('SELECT * FROM presentations WHERE id = ?', [id]);
      if (pres.length > 0) {
        presentation = pres[0];
        const [slides] = await db.query(
          'SELECT * FROM slides WHERE presentation_id = ? ORDER BY slide_number', [id]
        );
        presentation.slides = slides.map(s => ({
          title:         s.title          || '',
          content:       s.content        || '',
          contentType:   s.content_type   || 'paragraph',
          imagePath:     s.image_path     || '',
          imagePosition: s.image_position || 'right',
          imageLeft:     s.image_left     || 0,
          imageTop:      s.image_top      || 0,
          imageWidth:    s.image_width    || 300,
          imageHeight:   s.image_height   || 300,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (!presentation.slides || presentation.slides.length === 0) {
    presentation.slides = [{
      title: '', content: '', contentType: 'paragraph',
      imagePath: '', imagePosition: 'right',
      imageLeft: 0, imageTop: 0, imageWidth: 300, imageHeight: 300,
    }];
  }

  res.render('editor', { presentation });
});

// View presentation
app.get('/view', async (req, res) => {
  const id = req.query.id;
  if (!id) return res.redirect('/');
  try {
    const [pres] = await db.query('SELECT * FROM presentations WHERE id = ?', [id]);
    if (pres.length === 0) return res.redirect('/');
    const [slides] = await db.query(
      'SELECT * FROM slides WHERE presentation_id = ? ORDER BY slide_number', [id]
    );
    res.render('view', { presentation: pres[0], slides });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// ── ROUTES: API ───────────────────────────────────────────────

// Upload image
app.post('/api/upload_image', upload.single('image'), (req, res) => {
  if (!req.file) return res.json({ success: false, message: 'No image provided' });
  const filePath = 'uploads/images/' + req.file.filename;
  res.json({ success: true, file_path: filePath, file_name: req.file.filename });
});

// Save presentation
app.post('/api/save_presentation', async (req, res) => {
  const data = req.body;
  if (!data.title || !data.title.trim())
    return res.json({ success: false, message: 'Title is required' });

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    let presentationId;

    if (!data.id || data.id === '') {
      const [result] = await conn.execute(
        'INSERT INTO presentations (title, description) VALUES (?, ?)',
        [data.title, data.description || '']
      );
      presentationId = result.insertId;
    } else {
      presentationId = parseInt(data.id);
      await conn.execute(
        'UPDATE presentations SET title = ?, description = ?, updated_at = NOW() WHERE id = ?',
        [data.title, data.description || '', presentationId]
      );
    }

    await conn.execute('DELETE FROM slides WHERE presentation_id = ?', [presentationId]);

    if (Array.isArray(data.slides)) {
      for (let i = 0; i < data.slides.length; i++) {
        const s = data.slides[i];
        await conn.execute(
          `INSERT INTO slides
           (presentation_id, slide_number, title, content, content_type, image_path, image_position, image_left, image_top, image_width, image_height)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            presentationId, i + 1,
            s.title         || '',
            s.content       || '',
            s.contentType   || 'paragraph',
            s.imagePath     || '',
            s.imagePosition || 'right',
            parseInt(s.imageLeft)   || 0,
            parseInt(s.imageTop)    || 0,
            parseInt(s.imageWidth)  || 300,
            parseInt(s.imageHeight) || 300,
          ]
        );
      }
    }

    await conn.commit();
    res.json({ success: true, presentation_id: presentationId, message: 'Saved successfully' });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.json({ success: false, message: 'Save failed: ' + err.message });
  } finally {
    conn.release();
  }
});

// Get single presentation
app.get('/api/get_presentation', async (req, res) => {
  const id = req.query.id;
  try {
    const [pres] = await db.execute('SELECT * FROM presentations WHERE id = ?', [id]);
    if (pres.length === 0) return res.json({ success: false, message: 'Not found' });
    const [slides] = await db.execute(
      'SELECT * FROM slides WHERE presentation_id = ? ORDER BY slide_number', [id]
    );
    pres[0].slides = slides;
    res.json({ success: true, data: pres[0] });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Get all presentations
app.get('/api/get_presentations', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT id, title, description, created_at, updated_at FROM presentations ORDER BY updated_at DESC'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Delete presentation
app.post('/api/delete_presentation', async (req, res) => {
  const id = parseInt(req.body.id);
  const fs = require('fs');
  try {
    const [slides] = await db.execute(
      'SELECT image_path FROM slides WHERE presentation_id = ?', [id]
    );
    slides.forEach(s => {
      if (s.image_path) {
        const absPath = path.join(__dirname, s.image_path);
        if (fs.existsSync(absPath)) fs.unlinkSync(absPath);
      }
    });
    await db.execute('DELETE FROM presentations WHERE id = ?', [id]);
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Generate PPTX
app.post('/api/generate_pptx', async (req, res) => {
  const { presentation_id } = req.body;
  if (!presentation_id)
    return res.json({ success: false, message: 'Presentation ID is required' });

  try {
    const { generatePPTX } = require('./lib/pptx_generator');
    const fs = require('fs');
    const pptxPath = await generatePPTX(presentation_id, db);

    if (pptxPath && fs.existsSync(pptxPath)) {
      await db.execute(
        "UPDATE presentations SET status = 'completed', file_path = ?, updated_at = NOW() WHERE id = ?",
        [pptxPath, presentation_id]
      );
      res.json({ success: true, file_path: pptxPath, message: 'PPTX generated successfully' });
    } else {
      res.json({ success: false, message: 'PPTX file was not created' });
    }
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'Error: ' + err.message });
  }
});

// ─────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log('PPT Builder running on port ' + PORT);
});
