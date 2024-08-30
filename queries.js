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

module.exports = {
  getStudents,
};
