<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PPT Builder - Presentations</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Calibri', sans-serif; background-color: #f5f5f5; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header {
            background: #fff; padding: 30px; border-radius: 8px; margin-bottom: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,.1); display: flex;
            justify-content: space-between; align-items: center;
        }
        .header h1 { color: #00adee; font-size: 32px; margin-bottom: 6px; }
        .header p  { color: #666; }
        .create-btn {
            background: #00adee; color: #fff; border: none; padding: 12px 30px;
            border-radius: 5px; cursor: pointer; font-size: 16px; font-weight: bold;
            text-decoration: none; display: inline-block;
        }
        .create-btn:hover { background: #0091c9; }
        .presentations-grid {
            display: grid; grid-template-columns: repeat(auto-fill, minmax(300px,1fr)); gap: 20px;
        }
        .presentation-card {
            background: #fff; border-radius: 8px; overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,.1); transition: transform .3s, box-shadow .3s;
        }
        .presentation-card:hover { transform: translateY(-5px); box-shadow: 0 4px 12px rgba(0,0,0,.15); }
        .card-header { background: #f8f9fa; padding: 20px; border-bottom: 2px solid #e0e0e0; }
        .card-header h3 { color: #00adee; margin-bottom: 8px; word-break: break-word; }
        .card-header p  { color: #666; font-size: 13px; margin-bottom: 4px; }
        .status {
            display: inline-block; padding: 4px 10px; border-radius: 20px;
            font-size: 12px; margin-top: 8px;
        }
        .status.draft     { background: #fff3cd; color: #856404; }
        .status.completed { background: #d4edda; color: #155724; }
        .card-body { padding: 20px; display: flex; gap: 10px; }
        .btn {
            flex: 1; padding: 10px 15px; border: none; border-radius: 5px; cursor: pointer;
            font-size: 13px; font-weight: bold; text-decoration: none;
            text-align: center; display: inline-block;
        }
        .btn-view   { background: #00adee; color: #fff; }
        .btn-view:hover { background: #0091c9; }
        .btn-edit   { background: #28a745; color: #fff; }
        .btn-edit:hover { background: #218838; }
        .btn-delete { background: #dc3545; color: #fff; }
        .btn-delete:hover { background: #c82333; }
        .empty-state {
            text-align: center; padding: 60px 20px; background: #fff;
            border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,.1);
        }
        .empty-state h2 { color: #666; margin-bottom: 15px; }
        .empty-state p  { color: #999; margin-bottom: 20px; }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <div>
            <h1>📊 PPT Builder</h1>
            <p>Create and manage your presentations</p>
        </div>
        <a href="/editor" class="create-btn">+ Create New</a>
    </div>

    <% if (presentations.length > 0) { %>
    <div class="presentations-grid">
        <% presentations.forEach(p => { %>
        <div class="presentation-card">
            <div class="card-header">
                <h3><%= p.title %></h3>
                <% if (p.description) { %>
                <p><strong>Description:</strong> <%= p.description.substring(0, 60) %>...</p>
                <% } %>
                <p><strong>Created:</strong> <%= new Date(p.created_at).toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'}) %></p>
                <p><strong>Updated:</strong> <%= new Date(p.updated_at).toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'}) %></p>
                <span class="status <%= p.status || 'draft' %>"><%= (p.status || 'draft').charAt(0).toUpperCase() + (p.status || 'draft').slice(1) %></span>
            </div>
            <div class="card-body">
                <a href="/view?id=<%= p.id %>" class="btn btn-view">👁️ View</a>
                <a href="/editor?id=<%= p.id %>" class="btn btn-edit">✏️ Edit</a>
                <button class="btn btn-delete" onclick="deletePresentation(<%= p.id %>, '<%= p.title.replace(/'/g, "\\'") %>')">🗑️ Delete</button>
            </div>
        </div>
        <% }) %>
    </div>
    <% } else { %>
    <div class="empty-state">
        <h2>No presentations yet</h2>
        <p>Create your first presentation to get started</p>
        <a href="/editor" class="create-btn">Create First Presentation</a>
    </div>
    <% } %>
</div>

<script>
function deletePresentation(id, title) {
    if (!confirm('Delete "' + title + '"? This cannot be undone.')) return;
    fetch('/api/delete_presentation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'id=' + id
    })
    .then(r => r.json())
    .then(d => {
        if (d.success) { alert('Deleted!'); location.reload(); }
        else alert('Error: ' + d.message);
    });
}
</script>
</body>
</html>
