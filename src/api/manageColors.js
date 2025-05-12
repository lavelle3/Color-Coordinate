const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: 'faure',
    user: 'brauncw',
    password: '835308860',
    database: 'brauncw'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    }
    console.log('Connected to the database');
    initializeDatabase();
    
});

// Initialize database with valid colors
function initializeDatabase() {
    const validColors = [
        { name: 'Red', hex: '#FF0000' },
        { name: 'Orange', hex: '#FFA500' },
        { name: 'Yellow', hex: '#FFFF00' },
        { name: 'Green', hex: '#00FF00' },
        { name: 'Blue', hex: '#0000FF' },
        { name: 'Purple', hex: '#800080' },
        { name: 'Grey', hex: '#808080' },
        { name: 'Brown', hex: '#A52A2A' },
        { name: 'Black', hex: '#000000' },
        { name: 'Teal', hex: '#008080' }
    ];

    db.query('SELECT COUNT(*) AS count FROM colors', (err, results) => {
        if (err) throw err;

        if (results[0].count < 10) {
            validColors.forEach(color => {
                const randomId = Math.floor(Math.random() * 1000000); 
                db.query(
                    'INSERT IGNORE INTO colors (id, name, hex_value) VALUES (?, ?, ?)',
                    [randomId, color.name, color.hex],
                    err => {
                        if (err) console.error(err.message);
                    }
                );
            });
        }
        db.query('SELECT * FROM colors', (err, colors) => {
            if (err) {
                console.error('Error fetching colors:', err.message);
            } else {
                console.log('Colors in database:', colors);
            }
        });
    });
}

// Get all colors
app.get('/colors', (req, res) => {
    db.query('SELECT * FROM colors ORDER BY id', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
});

// Get color count
app.get('/color_count', (req, res) => {
    db.query('SELECT COUNT(*) AS count FROM colors', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results[0]);
        }
    });
});

// Add a new color
app.post('/colors', (req, res) => {
    const { name, hex_value } = req.body;

    if (!name || !hex_value) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    if (!hexRegex.test(hex_value)) {
        return res.status(400).json({ error: 'Invalid hex value format' });
    }

    

    const randomId = Math.floor(Math.random() * 1000000); 

    db.query(
        'SELECT * FROM colors WHERE name = ? OR hex_value = ?',
        [name, hex_value],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            if (results.length > 0) {
                return res.status(409).json({ error: 'Duplicate name or hex value' });
            }

            db.query(
                'INSERT INTO colors (id, name, hex_value) VALUES (?, ?, ?)',
                [randomId, name, hex_value],
                err => {
                    if (err) {
                        res.status(500).json({ error: err.message });
                    } else {
                        res.status(201).json({ message: 'Color added' });
                    }
                }
            );
        }
    );
});

// Delete a color
app.delete('/colors/delete', (req, res) => {
    const { name } = req.query; // Read from query parameters

    if (!name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    db.query('SELECT COUNT(*) AS count FROM colors', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results[0].count <= 2) {
            return res.status(400).json({ error: 'Cannot delete. At least 2 colors must remain.' });
        }

        db.query('DELETE FROM colors WHERE name = ?', [name], err => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ message: 'Color deleted' });
            }
        });
    });
});

app.put('/colors/edit', (req, res) => {
    const { newName, name, new_hex_value } = req.body;

    if (!name || !new_hex_value || !newName) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const hexRegex = /^#([0-9A-Fa-f]{6})$/;
    if (!hexRegex.test(new_hex_value)) {
        return res.status(400).json({ error: 'Invalid hex value format' });
    }

    db.query('SELECT * FROM colors WHERE name = ?', [name], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(404).json({ error: 'Color not found' });
        }

        const id = results[0].id;

        db.query(
            'DELETE FROM colors WHERE id = ?',
            [id],
            err => {
                if (err) return res.status(500).json({ error: err.message });

                db.query(
                    'INSERT INTO colors (id, name, hex_value) VALUES (?, ?, ?)',
                    [id, newName, new_hex_value],
                    err => {
                        if (err) {
                            res.status(500).json({ error: err.message });
                        } else {
                            res.status(200).json({ message: 'Color updated' });
                        }
                    }
                );
            }
        );
    });
}
);

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});