import sqlite3

conn = sqlite3.connect('calendar.db')

c = conn.cursor()

c.execute(CREATE TABLE Events(
    EventId INTEGER PRIMARY KEY,
    event_name TEXT NOT NULL,
    description TEXT,
    Day DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    Location NOT NULL
))

c.execute(CREATE TABLE Users(
    UserId INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
))

c.execute(CREATE TABLE Participants(
    EventId INTEGER
    UserId INTEGER
    PRIMARY KEY(EventId, UserId)
))

conn.commit()

conn.close()