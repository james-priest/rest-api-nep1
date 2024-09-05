const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;
const db = require('./queries');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

app.get('/', (_req, res) => {
  res.json({ info: 'Node.js, Express and Postgres API' });
});
app.get('/students', db.getStudents);
app.get('/students/:id', db.getStudentById);
app.post('/students', db.createStudent);
app.put('/students/:id', db.updateStudent);
