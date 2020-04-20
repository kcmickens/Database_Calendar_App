var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('Cal_Schema');

db.serialize(function()
{
    db.run("CREATE TABLE Events (EventId INTEGER PRIMARY KEY, event_name TEXT NOT NULL, description TEXT, start_time TIME NOT NULL, end_time TIME NOT NULL, Location)");
    db.run("CREATE TABLE Users (UserId INTEGER PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL UNIQUE");
    db.run("CREATE TABLE Participants (EventId INTEGER, UserId INTEGER, PRIMARY KEY(EventId, UserId");

});

db.close();