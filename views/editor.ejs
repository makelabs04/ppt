<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PPT Builder - Editor</title>
    <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family: 'Calibri', sans-serif; background:#f5f5f5; color:#333; }
        .editor-container { display:grid; grid-template-columns:250px 1fr 320px; min-height:100vh; }

        /* ── Sidebar ── */
        .sidebar { background:#f8f9fa; border-right:1px solid #e0e0e0; padding:20px; overflow-y:auto; max-height:100vh; }
        .sidebar h3 { color:#00adee; margin-bottom:15px; font-size:16px; }
        .slides-list { list-style:none; }
        .slide-item {
            background:#fff; border:2px solid transparent; border-radius:5px;
            padding:10px; margin-bottom:10px; cursor:pointer; transition:.3s; position:relative;
        }
        .slide-item:hover { border-color:#00adee; }
        .slide-item.active { border-color:#00adee; background:#e3f2fd; }
        .slide-item h4 { color:#333; font-size:14px; margin-bottom:4px; word-break:break-word; }
        .slide-item p  { color:#999; font-size:12px; }
        .slide-item .del-btn {
            position:absolute; top:5px; right:5px; background:none; border:none;
            color:#dc3545; cursor:pointer; font-size:16px; display:none;
        }
        .slide-item:hover .del-btn { display:block; }
        .add-slide-btn {
            width:100%; background:#00adee; color:#fff; border:none; padding:12px;
            border-radius:5px; cursor:pointer; font-weight:bold; margin-top:10px;
        }
        .add-slide-btn:hover { background:#0091c9; }

        /* ── Main ── */
        .editor-main { background:#fff; padding:30px; overflow-y:auto; max-height:100vh; }
        .editor-header { margin-bottom:30px; padding-bottom:20px; border-bottom:2px solid #f8f9fa;
            display:flex; justify-content:space-between; align-items:center; }
        .editor-header h2 { color:#00adee; }
        .header-actions { display:flex; gap:10px; }
        .btn {
            padding:10px 20px; border:none; border-radius:5px; cursor:pointer;
            font-weight:bold; font-size:14px; text-decoration:none; display:inline-block;
        }
        .btn-save     { background:#00adee; color:#fff; }
        .btn-save:hover { background:#0091c9; }
        .btn-download { background:#28a745; color:#fff; }
        .btn-download:hover { background:#218838; }
        .btn-back     { background:#6c757d; color:#fff; }
        .btn-back:hover { background:#5a6268; }
        .form-group { margin-bottom:20px; }
        .form-group label { display:block; margin-bottom:8px; font-weight:bold; color:#333; }
        .form-group input[type=text],
        .form-group textarea,
        .form-group select {
            width:100%; padding:12px; border:1px solid #ddd; border-radius:5px;
            font-family:'Calibri',sans-serif; font-size:14px;
        }
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
            outline:none; border-color:#00adee; box-shadow:0 0 5px rgba(0,173,238,.3);
        }
        .form-group textarea { resize:vertical; min-height:120px; }
        .slide-form { border-top:2px solid #f8f9fa; padding-top:20px; }
        .image-controls { display:flex; gap:10px; }
        .image-controls input { flex:1; }

        /* ── Preview ── */
        .preview-panel { background:#f8f9fa; border-left:1px solid #e0e0e0; padding:20px; overflow-y:auto; max-height:100vh; }
        .preview-panel h3 { color:#00adee; margin-bottom:15px; font-size:16px; }
        .slide-preview { background:#fff; border:1px solid #ddd; border-radius:5px; padding:15px; min-height:200px; }
        .slide-preview h4 { color:#00adee; font-size:14px; margin-bottom:8px; word-break:break-word; }
        .slide-preview p  { color:#333; font-size:11px; line-height:1.5; margin-bottom:8px; }
        .slide-preview ul { margin-left:15px; }
        .slide-preview li { color:#333; font-size:11px; margin-bottom:5px; }
        .preview-image   { max-width:100%; max-height:150px; object-fit:contain; margin-top:10px; border:1px solid #ddd; border-radius:4px; }
        .preview-header  { background:#f8f9fa; padding:8px 10px; margin:-15px -15px 10px; border-bottom:2px solid #00adee; }
        .image-preview-box { position:relative; display:inline-block; margin-top:8px; }
        .image-preview-box img { max-width:100%; max-height:120px; border:1px solid #ddd; border-radius:4px; }
        .remove-img-btn {
            position:absolute; top:-8px; right:-8px; background:#dc3545; color:#fff;
            border:none; border-radius:50%; width:22px; height:22px; font-size:14px;
            cursor:pointer; line-height:22px; text-align:center;
        }
        @media(max-width:900px) {
            .editor-container { grid-template-columns:1fr; }
            .preview-panel    { display:none; }
        }
    </style>
</head>
<body>
<div class="editor-container">

    <!-- Sidebar: slides list -->
    <div class="sidebar">
        <h3>📋 Slides</h3>
        <ul class="slides-list" id="slidesList"></ul>
        <button class="add-slide-btn" onclick="addSlide()">+ Add Slide</button>
    </div>

    <!-- Main editor -->
    <div class="editor-main">
        <div class="editor-header">
            <h2>✏️ Editor</h2>
            <div class="header-actions">
                <button class="btn btn-back" onclick="goBack()">← Back</button>
                <button class="btn btn-save" onclick="savePresentation()">💾 Save</button>
                <button class="btn btn-download" id="downloadBtn" style="display:none" onclick="generatePPTX()">⬇️ Download PPT</button>
            </div>
        </div>

        <!-- Presentation meta -->
        <div class="form-group">
            <label>Presentation Title *</label>
            <input type="text" id="title" placeholder="My Presentation" value="<%= presentation.title || '' %>">
        </div>
        <div class="form-group">
            <label>Description</label>
            <input type="text" id="description" placeholder="Optional description" value="<%= presentation.description || '' %>">
        </div>

        <div class="slide-form" id="slideEditor"></div>
    </div>

    <!-- Preview -->
    <div class="preview-panel">
        <h3>👁️ Preview</h3>
        <div id="preview"></div>
    </div>
</div>

<script>
    const presentation = <%- JSON.stringify(presentation) %>;
    let currentSlideIndex = 0;

    function initializeEditor() {
        if (!presentation.slides || presentation.slides.length === 0) {
            presentation.slides = [{ title:'', content:'', contentType:'paragraph', imagePath:'', imagePosition:'right', imageLeft:0, imageTop:0, imageWidth:300, imageHeight:300 }];
        }
        if (presentation.id) document.getElementById('downloadBtn').style.display = 'block';
        renderSlidesList();
        renderSlideEditor(0);
    }

    function renderSlidesList() {
        const list = document.getElementById('slidesList');
        list.innerHTML = '';
        presentation.slides.forEach((s, i) => {
            const li = document.createElement('li');
            li.className = 'slide-item' + (i === currentSlideIndex ? ' active' : '');
            li.innerHTML = `
                <h4>${htmlEscape(s.title || 'Slide ' + (i+1))}</h4>
                <p>${s.contentType === 'list' ? '📝 Bullet list' : '📄 Paragraph'}</p>
                <button class="del-btn" onclick="event.stopPropagation(); deleteSlide(${i})">✕</button>
            `;
            li.onclick = () => selectSlide(i);
            list.appendChild(li);
        });
    }

    function renderSlideEditor(i) {
        const slide = presentation.slides[i];
        const imageUI = slide.imagePath
            ? `<div class="image-preview-box">
                <img src="/${slide.imagePath}" alt="slide image">
                <button class="remove-img-btn" onclick="removeImage()">✕</button>
               </div>`
            : `<button type="button" class="btn btn-save" style="font-size:12px;padding:8px 14px;" onclick="document.getElementById('imageUpload').click()">📷 Upload Image</button>`;

        document.getElementById('slideEditor').innerHTML = `
            <h3 style="color:#00adee; margin-bottom:20px;">Slide ${i+1}</h3>
            <div class="form-group">
                <label>Slide Title</label>
                <input type="text" id="slideTitle" value="${htmlEscapeAttr(slide.title)}" oninput="updatePreview()" placeholder="Slide title">
            </div>
            <div class="form-group">
                <label>Content Type</label>
                <select id="contentType" onchange="updatePreview()">
                    <option value="paragraph" ${slide.contentType === 'paragraph' ? 'selected' : ''}>Paragraph Text</option>
                    <option value="list"      ${slide.contentType === 'list'      ? 'selected' : ''}>Bullet List</option>
                </select>
            </div>
            <div class="form-group">
                <label>Content</label>
                <textarea id="slideContent" oninput="updatePreview()" rows="8">${htmlEscapeText(slide.content)}</textarea>
                <small style="color:#999;">Bullet list: one item per line &nbsp;|&nbsp; Paragraph: double-Enter for new paragraph</small>
            </div>
            <div class="form-group">
                <label>Image</label>
                ${imageUI}
                <input type="file" id="imageUpload" accept="image/*" onchange="uploadImage(this.files[0])" style="display:none">
            </div>
            ${slide.imagePath ? `
            <div class="form-group">
                <label>Image Position</label>
                <select id="imagePosition" onchange="updatePreview()">
                    <option value="right" ${slide.imagePosition === 'right' ? 'selected' : ''}>Right</option>
                    <option value="left"  ${slide.imagePosition === 'left'  ? 'selected' : ''}>Left</option>
                </select>
            </div>
            ` : ''}
        `;
        renderSlidesList();
        updatePreview();
    }

    function updatePreview() {
        const slide = presentation.slides[currentSlideIndex];
        const titleEl   = document.getElementById('slideTitle');
        const contentEl = document.getElementById('slideContent');
        const typeEl    = document.getElementById('contentType');
        const posEl     = document.getElementById('imagePosition');

        if (titleEl)   slide.title = titleEl.value;
        if (contentEl) slide.content = contentEl.value;
        if (typeEl)    slide.contentType = typeEl.value;
        if (posEl)     slide.imagePosition = posEl.value;

        const content = slide.content || '';
        let contentHTML = '';

        if (slide.contentType === 'paragraph') {
            contentHTML = content.split('\n\n').filter(p => p.trim())
                .map(p => `<p>${htmlEscape(p.trim()).replace(/\n/g,'<br>')}</p>`).join('');
        } else {
            const items = content.split('\n').map(l => l.trim()).filter(Boolean);
            if (items.length) contentHTML = '<ul>' + items.map(it => `<li>${htmlEscape(it)}</li>`).join('') + '</ul>';
        }

        document.getElementById('preview').innerHTML = `
            <div class="slide-preview">
                <div class="preview-header"><strong>${htmlEscape(slide.title || 'Slide '+(currentSlideIndex+1))}</strong></div>
                ${contentHTML}
                ${slide.imagePath ? `<img src="/${slide.imagePath}" class="preview-image" alt="">` : ''}
            </div>`;
    }

    function selectSlide(i) {
        updatePreview();
        currentSlideIndex = i;
        renderSlideEditor(i);
    }

    function addSlide() {
        presentation.slides.push({ title:'', content:'', contentType:'paragraph', imagePath:'', imagePosition:'right', imageLeft:0, imageTop:0, imageWidth:300, imageHeight:300 });
        selectSlide(presentation.slides.length - 1);
    }

    function deleteSlide(i) {
        if (presentation.slides.length === 1) { alert('Must have at least one slide'); return; }
        if (!confirm('Delete this slide?')) return;
        presentation.slides.splice(i, 1);
        if (currentSlideIndex >= presentation.slides.length) currentSlideIndex = presentation.slides.length - 1;
        selectSlide(currentSlideIndex);
    }

    function removeImage() {
        if (!confirm('Remove image?')) return;
        presentation.slides[currentSlideIndex].imagePath = '';
        renderSlideEditor(currentSlideIndex);
    }

    function uploadImage(file) {
        if (!file) return;
        updatePreview();
        const fd = new FormData();
        fd.append('image', file);
        fetch('/api/upload_image', { method:'POST', body:fd })
            .then(r => r.json())
            .then(d => {
                if (d.success) {
                    presentation.slides[currentSlideIndex].imagePath = d.file_path;
                    renderSlideEditor(currentSlideIndex);
                    alert('✓ Image uploaded!');
                } else { alert('Error: ' + d.message); }
            }).catch(() => alert('Upload error'));
    }

    function savePresentation() {
        const title = document.getElementById('title').value;
        if (!title.trim()) { alert('Enter a title'); return; }
        updatePreview();

        const payload = { id: presentation.id || '', title, description: document.getElementById('description').value, slides: presentation.slides };
        const btn = document.querySelector('.btn-save');
        btn.textContent = '⏳ Saving...'; btn.disabled = true;

        fetch('/api/save_presentation', {
            method:'POST',
            headers:{ 'Content-Type':'application/json' },
            body: JSON.stringify(payload)
        })
        .then(r => r.json())
        .then(d => {
            if (d.success) {
                presentation.id = d.presentation_id;
                document.getElementById('downloadBtn').style.display = 'block';
                alert('✓ Saved!');
            } else { alert('Error: ' + d.message); }
            btn.textContent = '💾 Save'; btn.disabled = false;
        }).catch(() => { alert('Save error'); btn.textContent = '💾 Save'; btn.disabled = false; });
    }

    function generatePPTX() {
        if (!presentation.id) { alert('Save first'); return; }
        const btn = document.getElementById('downloadBtn');
        btn.textContent = '⏳ Generating...'; btn.disabled = true;

        fetch('/api/generate_pptx', {
            method:'POST',
            headers:{ 'Content-Type':'application/json' },
            body: JSON.stringify({ presentation_id: presentation.id })
        })
        .then(r => r.json())
        .then(d => {
            if (d.success) {
                const a = document.createElement('a');
                a.href = '/' + d.file_path;
                a.download = d.file_path.split('/').pop();
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                alert('✓ Downloaded!');
            } else { alert('Error: ' + d.message); }
            btn.textContent = '⬇️ Download PPT'; btn.disabled = false;
        }).catch(() => { alert('Download error'); btn.textContent = '⬇️ Download PPT'; btn.disabled = false; });
    }

    function goBack() {
        if (confirm('Go back? Make sure you saved!')) window.location.href = '/';
    }

    function htmlEscape(s) {
        return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
    }
    function htmlEscapeAttr(s) { return htmlEscape(s || '').replace(/"/g,'&quot;'); }
    function htmlEscapeText(s) { return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    document.addEventListener('DOMContentLoaded', initializeEditor);
</script>
</body>
</html>
