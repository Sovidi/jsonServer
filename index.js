const express = require('express');
const cors = require('cors');
const fs = require("fs");
var bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const data = {
    select : function(){
        return JSON.parse(fs.readFileSync("./test.json"));
    },
    insert : function(newObj){
        const jsonData = data.select();
        let newData = [...jsonData, {id:jsonData.length+1, ...newObj}];
        fs.writeFileSync("./test.json", JSON.stringify(newData));
        return newData;
    },
    update : function(){},
    delete : function(){}
}


app.get('/abc', function (req, res) {
    // console.log(req.body)
    // console.log(req.query)
    // console.log(req.params)
    res.send(data.select());
});

app.delete('/abc/:id', function (req, res) {
    const jsonData = data.select();
    const {id} = req.params;
    const delData = jsonData.filter(item => item.id != id);
    
    fs.writeFileSync("./test.json", JSON.stringify(delData))
    res.send(delData);
});

app.post('/insert', function (req, res) {
    // console.log(req.body)
    // console.log(req.query)
    // console.log(req.params)
    // {id:0, ...req.body}
    res.send( data.insert(req.body) );
});



app.listen(3040);