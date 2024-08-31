const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});
const ResponseClass = require('./model/response');

// GET | getStudents()
const getStudents = (_req, res) => {
  const responseResult = new ResponseClass();
  pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    responseResult.status = true;
    responseResult.code = 200;
    responseResult.message = 'Success';
    responseResult.data = results.rows;

    res.status(200).json(responseResult);
  });
};

// GET | getStudentById()
const getStudentById = (req, res) => {
  const responseResult = new ResponseClass();
  const id = req.params.id;
  // pool.query(`SELECT * FROM students s WHERE s.id=${id};`, (error, results) => {
  pool.query(
    `SELECT * FROM students s WHERE s.id=$1;`,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rowCount === 0) {
        responseResult.status = true;
        responseResult.code = 404;
        responseResult.message = 'User not found';
        responseResult.data = null;
      } else {
        responseResult.status = true;
        responseResult.code = 200;
        responseResult.message = 'Success';
        responseResult.data = results.rows[0];
      }
      res.status(200).json(responseResult);
    }
  );
};

// POST | createStudent()
const createStudent = (req, res) => {
  const { firstname, lastname, origin } = req.body;
  pool.query(
    'INSERT INTO students (firstname, lastname, origin) VALUES ($1, $2, $3)',
    [firstname, lastname, origin],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send('Student added');
    }
  );
};

// PUT | updateStudent()

// DELETE | deleteStudent()

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
};
