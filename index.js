const xlsx = require("xlsx");
const express = require("express");
const app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
const { write } = require("fs");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(cors()); // middle ware : CORS : Cross Origin Resource Sharing
// GET ALL DATA
var wBook = xlsx.readFile("users.xlsx");
var wSheet = wBook.Sheets[wBook.SheetNames[0]];
var excelData = xlsx.utils.sheet_to_json(wSheet);
app.get("/", function (req, res) {
  res.send(excelData);
  console.log(excelData.length);
});
// add user
app.post("/addUser", function (req, res) {
  let data = req.body;
  data += excelData;

  res.send("user added");
});

// GET SPECIFIC USER (QUERY STRING)
app.get("/user", function (req, res) {
  let psw;
  for (let i = 0; i < excelData.length; i++) {
    const email = excelData[i].email;

    if (req.query.email == email) {
      // console.log(excelData[i].password);
      psw = excelData[i].password;
    } else {
      // console.log("no query");
    }
  }
  // console.log(psw);
  if (psw) {
    res.send(psw.toString());
  } else {
    res.send("no account was found");
  }
});

app.listen(3030);
