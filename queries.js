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
  const responseResult = new ResponseClass();
  const { firstname, lastname, origin } = req.body;
  pool.query(
    'INSERT INTO students (firstname, lastname, origin) VALUES ($1, $2, $3)',
    [firstname, lastname, origin],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send('Student added');
      // responseResult.status = true;
      // responseResult.code = 201;
      // responseResult.message = 'Student added';
      // responseResult.data = results.rows[0];
      // res.status(201).json(responseResult);
    }
  );
};

// PUT | updateStudent()
const updateStudent = (request, response) => {
  const id = parseInt(request.params.id);
  var responseReturn = new ResponseClass();
  try {
    const { firstname, lastname, origin } = request.body;
    pool.query(
      'UPDATE students SET firstname = $1, lastname = $2, origin = $3 WHERE id = $4',
      [firstname, lastname, origin, id],
      (error, results) => {
        if (error) {
          throw error;
        }

        responseReturn.status = true;
        responseReturn.code = 200;
        responseReturn.message = 'User updated successfully';
        responseReturn.data = null;
        response.status(200).send(responseReturn);
      }
    );
  } catch (error) {
    responseReturn.status = false;
    responseReturn.code = 500;
    responseReturn.message = error.message;
    responseReturn.data = null;
    response.status(500).json(responseReturn);
  }
};

// DELETE | deleteStudent()

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
};
