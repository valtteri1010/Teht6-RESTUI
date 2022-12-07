const mysql = require("mysql");
const express = require("express");
//const bodyParser = require("body-parser");
/* const app = express().use(bodyParser.json()); //vanha tapa - ei enää voimassa. 
kts. https://devdocs.io/express/ -> req.body*/
var app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

const server = app.listen(3001, () => console.log("Serveri valmiina"));

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "urheilijat",
  multipleStatements: true,
});

conn.connect((err) => {
  if (err) {
    console.log("Tapahtui virhe yhdistettäessä tietokantaan");
    return;
  }
  console.log("Yhteys muodostettu");
});

/*CORS isn’t enabled on the server, this is due to security reasons by default,
so no one else but the webserver itself can make requests to the server.*/
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader("Content-type", "application/json");

  // Pass to next layer of middleware
  next();
});

app.get("/urheilijat", (req, res) => {
  conn.query("SELECT * FROM urheilijanTiedot", (err, rows) => {
    if (err) throw err;
    return res.status(200).json(rows);
  });
});

app.get("/urheilijat/:id", (req, res) => {
  const id = Number(req.params.id);
  //const id = req.params.id;
  conn.query("SELECT * FROM urheilijanTiedot WHERE id=?", id, (err, rows) => {
    if (err) throw err;
    res.end(JSON.stringify(rows[0]));
  });
});

app.put("/urheilijat/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedUser = req.body;
  conn.query(
    "UPDATE urheilijanTiedot SET ? WHERE id = ?;",
    [updatedUser, req.params.id],
    function (error, results) {
      if (error) throw error;
      conn.query(
        "SELECT * FROM urheilijanTiedot WHERE id=?",
        id,
        (err, rows) => {
          if (err) throw err;
          res.end(JSON.stringify(rows[0]));
        }
      );
    }
  );
});

// DELETE a user

app.delete("/urheilijat/:id", (req, res) => {
  console.log("Poistetun urheilijan id:");
  const id = Number(req.params.id);
  console.log(id);
  conn.query(
    "DELETE FROM urheilijanTiedot where id = ?",
    [req.params.id],
    function (error, results) {
      if (error) throw error;
      return;
    }
  );
});

app.post("/lisaa", (req, res) => {
  let urheilija = req.body;
  console.log(urheilija);
  if (!urheilija) {
    return res
      .status(400)
      .send({ error: true, message: "Urheilija-objektia ei voitu lisätä" });
  }
  conn.query(
    "INSERT INTO urheilijanTiedot SET ? ",
    urheilija,
    function (error, results, fields) {
      if (error) throw error;
      return res.send(JSON.stringify({ id: results.insertId, ...urheilija }));
    }
  );
});

module.exports = app;
