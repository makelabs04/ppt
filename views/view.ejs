<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= presentation.title %> - PPT Builder</title>
    <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:'Calibri',sans-serif; background:#222; color:#333; }
        .viewer-container { display:flex; min-height:100vh; }
        .slide-container {
            flex:1; display:flex; align-items:center; justify-content:center;
            background:linear-gradient(135deg,#667eea 0%,#764ba2 100%); padding:20px;
        }
        .slide {
            background:#fff; width:100%; max-width:900px; aspect-ratio:16/9;
            border-radius:8px; box-shadow:0 20px 60px rgba(0,0,0,.3);
            padding:60px; position:relative; overflow:hidden;
        }
        .slide-header {
            background:#f8f9fa; padding:20px; margin:-60px -60px 20px -60px;
            border-bottom:2px solid #00adee;
        }
        .slide-header h2 { color:#00adee; font-size:28px; }
        .slide-content { display:flex; gap:30px; height:calc(100% - 100px); }
        .slide-text { flex:1; overflow-y:auto; }
        .slide-text p { color:#333; font-size:16px; line-height:1.6; margin-bottom:12px; }
        .slide-text ul { margin-left:20px; list-style:none; }
        .slide-text li {
            color:#333; font-size:16px; margin-bottom:10px;
            padding-left:20px; position:relative;
        }
        .slide-text li:before { content:"•"; position:absolute; left:0; color:#00adee; font-weight:bold; }
        .slide-image { flex:0 0 auto; max-width:340px; }
        .slide-image img { width:100%; height:100%; object-fit:cover; border-radius:5px; border:1px solid #ddd; }
        .sidebar { width:200px; background:#333; padding:20px; overflow-y:auto; display:flex; flex-direction:column; }
        .sidebar h3 { color:#00adee; margin-bottom:20px; font-size:16px; }
        .slides-nav { list-style:none; flex:1; overflow-y:auto; margin-bottom:20px; }
        .slide-nav-item {
            background:#444; color:#fff; padding:10px; margin-bottom:10px;
            border-radius:5px; cursor:pointer; border-left:3px solid transparent;
            font-size:13px; transition:.3s;
        }
        .slide-nav-item:hover { background:#555; }
        .slide-nav-item.active { border-left-color:#00adee; background:#1a1a1a; color:#00adee; }
        .controls { display:flex; gap:8px; flex-direction:column; }
        .btn {
            padding:10px; border:none; border-radius:5px; cursor:pointer;
            font-weight:bold; transition:.3s; font-size:12px; text-align:center;
            text-decoration:none; display:block;
        }
        .btn-nav  { background:#00adee; color:#fff; }
        .btn-nav:hover { background:#0091c9; }
        .btn-edit { background:#28a745; color:#fff; }
        .btn-edit:hover { background:#218838; }
        .slide-counter { text-align:center; color:#999; font-size:12px; margin-bottom:15px; }
        .pres-title { color:#00adee; font-size:13px; font-weight:bold; margin-bottom:15px; word-break:break-word; padding-bottom:15px; border-bottom:1px solid #444; }
        .title-slide-body { display:flex; align-items:center; justify-content:center; flex-direction:column; height:100%; }
        .title-slide-body h1 { color:#00adee; font-size:36px; text-align:center; margin-bottom:15px; }
        .title-slide-body p  { color:#666; font-size:18px; text-align:center; }
        @media(max-width:768px) {
            .viewer-container { flex-direction:column; }
            .sidebar { width:100%; max-height:150px; flex-direction:row; flex-wrap:wrap; }
            .slides-nav { display:flex; flex-direction:row; overflow-x:auto; }
            .slide-nav-item { white-space:nowrap; }
            .slide { padding:30px; aspect-ratio:auto; min-height:350px; }
        }
    </style>
</head>
<body>
<div class="viewer-container">
    <div class="slide-container">
        <div class="slide" id="currentSlide"></div>
    </div>
    <div class="sidebar">
        <div class="pres-title"><%= presentation.title %></div>
        <div class="slide-counter"><span id="slideNum">1</span> / <span id="slideTotal"><%= slides.length %></span></div>
        <ul class="slides-nav" id="slidesList"></ul>
        <div class="controls">
            <button class="btn btn-nav" onclick="prevSlide()">← Prev</button>
            <a href="/" class="btn btn-nav">🏠 Home</a>
            <a href="/editor?id=<%= presentation.id %>" class="btn btn-edit">✏️ Edit</a>
            <button class="btn btn-nav" onclick="nextSlide()">Next →</button>
        </div>
    </div>
</div>

<script>
    const slides = <%- JSON.stringify(slides) %>;
    let cur = 0;

    function renderSlide() {
        const s = slides[cur];
        let html = '';

        if (s.content_type === 'paragraph') {
            html = s.content.split('\n').filter(l=>l.trim())
                .map(l => `<p>${esc(l)}</p>`).join('');
        } else {
            const items = s.content.split('\n').map(l=>l.trim()).filter(Boolean);
            html = '<ul>' + items.map(it=>`<li>${esc(it)}</li>`).join('') + '</ul>';
        }

        const imgHTML = s.image_path
            ? `<div class="slide-image"><img src="/${s.image_path}" alt=""></div>`
            : '';

        document.getElementById('currentSlide').innerHTML = `
            <div class="slide-header"><h2>${esc(s.title || 'Slide '+(cur+1))}</h2></div>
            <div class="slide-content">
                <div class="slide-text">${html}</div>
                ${imgHTML}
            </div>`;

        document.getElementById('slideNum').textContent = cur + 1;
        renderNav();
    }

    function renderNav() {
        const ul = document.getElementById('slidesList');
        ul.innerHTML = '';
        slides.forEach((s,i) => {
            const li = document.createElement('li');
            li.className = 'slide-nav-item' + (i===cur?' active':'');
            li.textContent = `Slide ${i+1}: ${s.title || 'Untitled'}`;
            li.onclick = () => { cur=i; renderSlide(); };
            ul.appendChild(li);
        });
    }

    function nextSlide() { if(cur<slides.length-1){cur++; renderSlide();} }
    function prevSlide() { if(cur>0){cur--; renderSlide();} }

    function esc(s) {
        return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    document.addEventListener('keydown', e => {
        if(e.key==='ArrowLeft') prevSlide();
        if(e.key==='ArrowRight') nextSlide();
    });

    document.addEventListener('DOMContentLoaded', () => {
        if (!slides.length) {
            document.getElementById('currentSlide').innerHTML = '<div class="title-slide-body"><h1>No Slides</h1><p>Go back and add slides first.</p></div>';
            return;
        }
        renderSlide();
    });
</script>
</body>
</html>
