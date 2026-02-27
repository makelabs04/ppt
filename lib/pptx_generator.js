const PptxGenJS = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

async function generatePPTX(presentationId, db) {
    const [presRows] = await db.execute('SELECT * FROM presentations WHERE id = ?', [presentationId]);
    if (presRows.length === 0) throw new Error('Presentation not found');

    const presentation = presRows[0];
    const [slides] = await db.execute(
        'SELECT * FROM slides WHERE presentation_id = ? ORDER BY slide_number',
        [presentationId]
    );

    const outputDir = path.join(__dirname, '..', 'uploads', 'pptx');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const safeTitle = presentation.title.replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `${Date.now()}_${safeTitle}.pptx`;
    const filePath = path.join(outputDir, fileName);

    const prs = new PptxGenJS();

    const colors = {
        white:    'FFFFFF',
        blue:     '00adee',
        lightGray:'f8f9fa',
        darkText: '333333'
    };

    // ── Title Slide ──────────────────────────────────────────────────────────
    const titleSlide = prs.addSlide();
    titleSlide.background = { color: colors.white };

    titleSlide.addShape(prs.ShapeType.rect, {
        x: 0, y: 0, w: 10, h: 1,
        fill: { color: colors.blue },
        line: { type: 'none' }
    });

    titleSlide.addText(presentation.title.toUpperCase(), {
        x: 0.5, y: 0.1, w: 9, h: 0.8,
        fontSize: 36, bold: true, color: colors.white,
        fontFace: 'Calibri', align: 'center', valign: 'middle'
    });

    if (presentation.description) {
        titleSlide.addText(presentation.description, {
            x: 0.5, y: 1.5, w: 9, h: 0.6,
            fontSize: 18, color: colors.darkText,
            fontFace: 'Calibri', align: 'center'
        });
    }

    titleSlide.addText('Created with PPT Builder', {
        x: 0.5, y: 4.8, w: 9, h: 0.4,
        fontSize: 12, color: 'aaaaaa',
        fontFace: 'Calibri', align: 'center'
    });

    // ── Content Slides ───────────────────────────────────────────────────────
    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        const pptSlide = prs.addSlide();
        pptSlide.background = { color: colors.white };

        // Header bar
        pptSlide.addShape(prs.ShapeType.rect, {
            x: 0, y: 0, w: 10, h: 0.55,
            fill: { color: colors.lightGray },
            line: { type: 'none' }
        });

        // Slide number accent
        pptSlide.addShape(prs.ShapeType.rect, {
            x: 0, y: 0, w: 0.08, h: 0.55,
            fill: { color: colors.blue },
            line: { type: 'none' }
        });

        // Title
        pptSlide.addText(slide.title || `Slide ${i + 1}`, {
            x: 0.25, y: 0.08, w: 9.5, h: 0.39,
            fontSize: 22, bold: true, color: colors.blue,
            fontFace: 'Calibri', align: 'left', valign: 'middle'
        });

        // Layout
        const hasImage = slide.image_path && fs.existsSync(path.join(__dirname, '..', slide.image_path));
        const imagePosition = slide.image_position || 'right';
        let contentX = 0.4;
        let contentW = 9.2;
        let imageX = 5.5;

        if (hasImage) {
            contentW = 4.8;
            if (imagePosition === 'right') {
                contentX = 0.4;
                imageX = 5.5;
            } else {
                contentX = 4.8;
                imageX = 0.4;
            }
        }

        // Content
        const content = slide.content || '';
        const contentType = slide.content_type || 'paragraph';

        if (contentType === 'paragraph') {
            const paragraphs = content.split('\n\n').filter(p => p.trim());
            let y = 0.75;
            for (const para of paragraphs) {
                const text = para.replace(/\n/g, ' ').trim();
                pptSlide.addText(text, {
                    x: contentX, y, w: contentW, h: 0.9,
                    fontSize: 11, color: colors.darkText,
                    fontFace: 'Calibri', align: 'left', valign: 'top',
                    wrap: true
                });
                y += 1.05;
                if (y > 5.2) break;
            }
        } else {
            // Bullet list
            const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
            let y = 0.75;
            for (const line of lines) {
                pptSlide.addText([
                    { text: '• ', options: { color: colors.blue, bold: true, fontSize: 13 } },
                    { text: line, options: { color: colors.darkText, fontSize: 11 } }
                ], {
                    x: contentX + 0.1, y, w: contentW - 0.2, h: 0.5,
                    fontFace: 'Calibri', align: 'left', valign: 'top',
                    wrap: true
                });
                y += 0.55;
                if (y > 5.2) break;
            }
        }

        // Image
        if (hasImage) {
            try {
                const absImagePath = path.join(__dirname, '..', slide.image_path);
                pptSlide.addImage({
                    path: absImagePath,
                    x: imageX, y: 0.7, w: 4, h: 4.5
                });
            } catch (e) {
                console.warn(`Could not add image to slide ${i + 1}:`, e.message);
            }
        }

        // Slide number footer
        pptSlide.addText(`${i + 1} / ${slides.length}`, {
            x: 8.5, y: 5.3, w: 1.2, h: 0.2,
            fontSize: 9, color: 'aaaaaa',
            fontFace: 'Calibri', align: 'right'
        });
    }

    await prs.writeFile({ fileName: filePath });
    return 'uploads/pptx/' + fileName;
}

module.exports = { generatePPTX };
