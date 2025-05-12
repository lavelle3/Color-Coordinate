console.log('Starting backend...');

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// SQLite DB setup
const db = new sqlite3.Database('./colors.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS colors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      hex TEXT UNIQUE NOT NULL
    )
  `);
});

// GET all colors
app.get('/api/colors', (req, res) => {
  db.all('SELECT * FROM colors', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ADD new color
app.post('/api/colors', (req, res) => {
  const { name, hex } = req.body;
  db.run(
    'INSERT INTO colors (name, hex) VALUES (?, ?)',
    [name, hex],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID, name, hex });
    }
  );
});

// EDIT color
app.put('/api/colors/:id', (req, res) => {
  const { name, hex } = req.body;
  const { id } = req.params;
  db.run(
    'UPDATE colors SET name = ?, hex = ? WHERE id = ?',
    [name, hex, id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id, name, hex });
    }
  );
});

// DELETE color
app.delete('/api/colors/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM colors WHERE id = ?', [id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ success: true });
  });
});

// Start server
app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});
