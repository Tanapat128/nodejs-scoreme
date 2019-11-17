const dotenv = require("dotenv").config();
const express = require("express");
const pg = require("pg");
var http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");
const pgConnectionString = process.env.POSTGRES_CONNECTION_URL;
const pool = new Pool({
  connectionString: pgConnectionString
});
const { handlerError, ErrorHandler } = require("./helpers/error");

const PORT = process.env.PORT || 9010;
const URL = process.env.URL;

const app = express();
const server = http.createServer(app);

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(
  cors({
    origin: true
  })
);

const score = require("./controllers/query/score");
const con = require("./middleware/console");

app.post("/score", con.request, score.insert);

server.listen(PORT, URL, () => {
    console.log(
      `✔ Listening on PORT: ${server.address().port} > ${
        process.env.NODE_ENV
      } > ${server.address().address}`
    );
  });
