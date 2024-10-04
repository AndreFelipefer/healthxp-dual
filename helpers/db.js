require('dotenv').config()
const { Pool } = require("pg"); // Inclui apenas o Pool para gerenciamento de conexões
const ShortUniqueId = require('short-unique-id')

// Configuração do Pool de conexões
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT // porta padrão do PostgreSQL
});

const deleteAndCreateStudent = (req, res) => {
  const student = req.body;

  const queryDelete = `
    DELETE FROM students WHERE email = $1;
  `
  const queryInsert = `
    INSERT INTO "public"."students" (name, email, age, weight, feet_tall)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id as student_id;
  `
  const values = [
    student.name,
    student.email,
    student.age,
    student.weight,
    student.feet_tall,
  ];

  pool.query(queryDelete, [student.email], function (error, result) {
    if (error) {
      return res.status(500).json(error);
    }
    pool.query(queryInsert, values, function (error, result) {
      if (error) {
        return res.status(500).json(error);
      }
      res.status(201).json({ student_id: result.rows[0].student_id });
    });
  });


};

const deleteStudentByEmail = (req, res) => {
  const studentEmail = req.params.email;
  const query = "DELETE FROM students WHERE email = $1;";

  pool.query(query, [studentEmail], function (error, result) {
    if (error) {
      return res.status(500).json(error);
    }
    res.status(204).end();
  });
};

const selectStudent = (req, res) => {
  const studentEmail = req.params.email;
  const query = "SELECT id FROM students WHERE email = $1";

  pool.query(query, [studentEmail], function (error, result) {
    if (error) {
      return res.status(500).json(error);
    }
    res.status(200).json(result.rows[0]);
  });
};

const insertEnrollByEmail = (req, res) => {

  const { email, plan_id, price } = req.body
  const uid = new ShortUniqueId({ length: 6 });
  const query = `
    INSERT INTO enrollments(enrollment_code, student_id, plan_id, credit_card, status, price)
    SELECT 
    '${uid.rnd().toUpperCase()}' as enrollment_code,
    id as student_id,
    $2 as plan_id,
    '4242' as credit_card,
    true as status,
    $3 as price
    FROM students 
    WHERE email  = $1
    RETURNING enrollment_code;`


  const VALUES = [email, plan_id, price]

  pool.query(query, VALUES, function (error, result) {
    if (error) {
      return res.status(500).json(error);
    }
    res.status(201).json({enrollment_code: result.rows[0].enrollment_code});
  });
}

module.exports = {
  deleteAndCreateStudent,
  deleteStudentByEmail,
  selectStudent,
  insertEnrollByEmail
};
