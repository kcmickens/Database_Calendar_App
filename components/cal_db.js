const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('/Users/malcolmphipps/Desktop/Test Database/Test', sqlite3.OPEN_READWRITE, (err) => {
    if(err){
        console.error(err.message);
    }
    console.log('Connected to Calendar Database');
});

db.close((err) => {
    if(err){
        console.error(err.message);
    }
    console.log('Close the Calendar Databse connection')
});