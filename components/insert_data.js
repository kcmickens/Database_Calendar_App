const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('/Users/malcolmphipps/Desktop/CalApp.db')

let sql = `SELECT * FROM Events`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(`${row.EventId} ${row.event_name} ${row.description} ${row.start_time} ${row.end_time} ${row.Location}`);
  });
});

db.close();