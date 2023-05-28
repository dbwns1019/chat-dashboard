const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const path = require("path");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dbwnsdlWkd1019",
    database: "project",
    port: 3306,
});

app.use(
    cors({
      origin: "*", // 출처 허용 옵션
      credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
      optionsSuccessStatus: 200, // 응답 상태 200으로 설정
    })
  );
app.set("port", process.env.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
// // Set public path
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));




app.get("", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

app.get("/user", (req,res) => {
  connection.query("SELECT * FROM user", function (err, results, fields) {
    if (err) {
      console.log("ERROR");
    }
    console.log(results);
    // res.render(results);
    res.render("dashboard.pug", { data: results });
  });
})


app.post("/insert", (req, res) => {
  console.log(req.body);
  const values = [Object.values(req.body)];
  connection.query(
    "INSERT INTO user (userName, userAge) VALUES ?",
    [values],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
      console.log(results);
    }
    
  )
});

app.listen(app.get("port"), () => {
    console.log("Express server listening on port " + app.get("port"));
});