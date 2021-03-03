var express = require('express')
var database = require('./dbAccess.js')
var db = database.connect()

var app = express();
app.use(express.json());

app.get('/', function(req,res) {
    res.sendFile("index.html", {root:__dirname})
})

app.post('/click',function(req,res){
    database.add(db,req)
})

app.post('/trash',function(req,res){
    database.trash(db)
})

app.get('/click',function(req,res){
    database.readAll(db,res)
})

app.listen(3000, function() {
    console.log("Server Listening at http://localhost:3000")
})

