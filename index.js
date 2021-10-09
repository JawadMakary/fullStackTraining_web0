const xlsx = require("xlsx");
const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
const { write } = require("fs");
app.use(bodyParser.json());
app.use(cors()); // middle ware : CORS : Cross Origin Resource Sharing
// GET ALL DATA
var wBook = xlsx.readFile("users.xlsx");
var wSheet = wBook.Sheets[wBook.SheetNames[0]];
var excelData = xlsx.utils.sheet_to_json(wSheet);
app.get("/", function (req, res) {
  res.send(excelData);
  // console.log(excelData.length);
});
var emails = [];
for (let i = 0; i < excelData.length; i++) {
  emails.push(excelData[i].email);
} // add user
console.log(emails);
app.post("/addNewUser", function (req, res) {
  console.log(req.body);
  excelData.push(req.body);
  // excelpush = xlsx.utils.json_to_sheet(excelData);
  res.send(excelData);
});
app.post("/checkUser", function (req, res) {
  // var cred = { email: "tet", password: 123 };
  var email = req.body.email;
  var password = req.body.password;
  for (let i = 0; i < emails.length; i++) {
    if (email == emails[i]) {
      res.send("true");
    } else {
      res.send("false");
    }
  }
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

app.listen(3030, () => {
  console.log("the server is running");
});
