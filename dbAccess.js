const sqlite3 = require('sqlite3').verbose();

function connect() {
    const db = new sqlite3.Database('./db/database.sqlite', 
    function (err) { 
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the SQLite database');
    });
    return db
}

function trash(db) {
    db.run('DROP TABLE IF EXISTS Clicks',function (err) {
        if (err) { console.error(err) }
        else { console.log("Dropping Clicks Table")
        init(db);
    }
    })
    
}

function init(db) {
    db.run('CREATE TABLE IF NOT EXISTS Clicks(id INTEGER PRIMARY KEY AUTOINCREMENT,created TEXT DEFAULT CURRENT_TIMESTAMP, message TEXT);',function (err) {
        if (err) { console.error(err) }
        else { console.log("Create Clicks Table")}
    })
}

function add(db,req) {
    console.log(req.body)
    let myMessage = req.body.message||"no message sent"
    db.run('INSERT INTO Clicks (message) VALUES (?)',[myMessage],function (err) {
        if (err) { console.error(err) }
        else { console.log("Adding Message to Table")}
    })
}

function readAll(db,res) {
    db.all('SELECT * FROM Clicks',function (err,rows){
        if (err) { console.error(err) }
        else {
            console.log(rows)
            res.send(rows)
        }
    });
}

module.exports = {connect,trash,add,readAll}