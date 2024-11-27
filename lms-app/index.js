const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
const PORT = 3000;

// POST: Create a new course
app.post('/courses', (req, res) => {
    const newCourse = req.body;

    fs.readFile('db.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).send('Error reading database.');

        const courses = JSON.parse(data);
        courses.push(newCourse);

        fs.writeFile('db.json', JSON.stringify(courses, null, 2), (err) => {
            if (err) return res.status(500).send('Error saving course.');
            res.status(201).send('Course added successfully!');
        });
    });
});

// GET: Retrieve all courses
app.get('/courses', (req, res) => {
    fs.readFile('db.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).send('Error reading database.');

        const courses = JSON.parse(data);
        res.status(200).json(courses);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
