const express = require('express');
const cors = require('cors');
const fs = require("fs");
var bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/abc', function (req, res) {
    const jsonData = fs.readFileSync("./test.json");
    res.send( JSON.parse(jsonData));
});

// app.get('/abc/:id', function (req, res) {
//     const jsonData = fs.readFileSync("./test.json");
//     const data = JSON.parse(jsonData);
//     const {id} = req.params;
//     const aaa = data.filter(item => item.id == id)
//     res.send(aaa);
// });

app.post('/insert', function (req, res) {
    console.log(req.body)
    const jsonData = fs.writeFileSync("./test.json", JSON.stringify(req.body))
    res.send("성공");
});



app.listen(3030);