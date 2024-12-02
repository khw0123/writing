const express = require("express");
const app = express();

const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
var db;
const port = process.env.PORT || 3000;

MongoClient.connect(
  "mongodb+srv://khw18837:Khwmongodb1!@cluster0.o3xdh.mongodb.net/writing-api?retryWrites=true&w=majority",
  function (err, client) {
    if (err) return console.log(err);
    db = client.db("writing-api");
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    });
  }
);

app.get("/", function (req, res) {
  db.collection("writings")
    .find()
    .toArray(function (err, result) {
      console.log(result);
      res.render("index.ejs", { posts: result });
    });
});

app.get("/write", function (req, res) {
  res.render("form.ejs");
});

app.post("/add", function (req, res) {
  db.collection("writings").insertOne(
    {
      제목: req.body["writing-title"],
      날짜: req.body["writing-date"],
      작성자: req.body["writing-writer"],
      글: req.body["writing-writing"],
    },
    function (err, result) {
      console.log("저장 완료");
    }
  );
  res.send("전송 완료");
});
