const { Pool } = require('pg'); // Inclui apenas o Pool para gerenciamento de conexões
require('dotenv').config();

// Configuração do Pool de conexões
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT // porta padrão do PostgreSQL
});

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // Registro da task 'deleteStudent'
      on('task', {
        deleteStudent(email) {
          return pool.query(`DELETE FROM "public"."students" WHERE "email" = $1`, [email])
            .then(() => {
              return null; // Retorna null para indicar que a task foi bem-sucedida
            })
            .catch((err) => {
              throw err; // Lança um erro se a query falhar
            });
        },

        // Registro da task 'resetStudent'
        resetStudent(student) {
          const query = `
            WITH add AS (
              INSERT INTO "public"."students" (name, email, age, weight, feet_tall)
              VALUES ($1, $2, $3, $4, $5)
            )
            DELETE FROM "public"."students" WHERE email = $2;
          `;

          const values = [
            student.name,
            student.email,
            student.age,
            student.weight,
            student.feet_tall,
          ];

          return pool.query(query, values)
            .then((result) => {
              return { success: result }; // Retorna sucesso com o resultado da query
            })
            .catch((error) => {
              return { error: error }; // Retorna o erro se a query falhar
            });
        },

        // Registro da task 'selectStudentID'
        selectStudentID(studentEmail) {
          const query = 'SELECT id FROM students WHERE email = $1';

          return pool.query(query, [studentEmail])
            .then((result) => {
              return { success: result.rows }; // Retorna as linhas resultantes da query
            })
            .catch((error) => {
              return { error: error }; // Retorna o erro se a query falhar
            });
        },
      });
    },
    video: true, // Garante que os vídeos sejam gravados
    videosFolder: 'cypress/videos',
    projectId: "grkj2i", // Personaliza a pasta de saída para os vídeos
    baseUrl: 'http://localhost:3000',
    env: {
      apiHelper: 'http://localhost:5000'
    }
  },
};
