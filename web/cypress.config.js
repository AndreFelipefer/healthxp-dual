const { Client, Pool } = require("pg"); // Inclui o Pool além do Client para gerenciamento de conexões

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // Registro da task 'deleteStudent' e 'InsertStudent'
      on("task", {
        deleteStudent(email) {
          const client = new Client({
            user: "glpzoojy",
            host: "isabelle.db.elephantsql.com",
            database: "glpzoojy",
            password: "5tPI92MDdSxzjp0F8v0mHLxf-1t8HqgU",
            port: 5432, // porta padrão do PostgreSQL
          });

          client.connect();

          return client
            .query(`DELETE FROM "public"."students" WHERE "email" = $1`, [
              email,
            ])
            .then(() => {
              client.end();
              return null; // Retorna null para indicar que a task foi bem-sucedida
            })
            .catch((err) => {
              client.end();
              throw err; // Lança um erro se a query falhar
            });
        },

        resetStudent(student) {
          return new Promise(function (resolve, reject) {
            const pool = new Pool({
              user: "glpzoojy",
              host: "isabelle.db.elephantsql.com",
              database: "glpzoojy",
              password: "5tPI92MDdSxzjp0F8v0mHLxf-1t8HqgU",
              port: 5432, // porta padrão do PostgreSQL
            });

            const query = `
              WITH add AS (
                INSERT INTO "public"."students" (name, email, age, weight, feet_tall)
                VALUES ($1, $2, $3, $4, $5)
              )
                DELETE FROM students WHERE email = $2;
            `;

            const values = [
              student.name,
              student.email,
              student.age,
              student.weight,
              student.feet_tall,
            ];

            pool.query(query, values, function (error, result) {
              if (error) {
                reject({ error: error });
              } else {
                resolve({ success: result });
              }
              pool.end(); // Certifique-se de fechar a conexão
            });
          });
        },
      });
    },
  },
};
