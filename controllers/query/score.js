const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.POSTGRES_CONNECTION_URL
});
const { ErrorHandler, handlerError } = require("../../helpers/error");

exports.insert = (request, response, next) => {
  const data = request.body;
  const insert = `insert into scoreme.score(score, comment) values ($1, $2) returning id, score, comment`;
  const values = [data.score, data.comment];
  pool.query(insert, values, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res.rows);
      response.send(res.rows);
    }
  });
};
