import * as SQLite from 'expo-sqlite';
let sql = "INSERT INTO Events (EventId,event_name,description,start_time,end_time,location) VALUES (,'test1','failure #5234','2020-04-27 10:30','2020-04-27 11:30','My computer');";
let db = new SQLite.openDatabase('cal_db.db')
db.transaction(tx =>{
  tx.executeSql('CREATE TABLE IF NOT EXISTS Events (EventId INTEGER PRIMARY KEY, event_name TEXT NOT NULL, description TEXT, start_time TIME NOT NULL, end_time TIME NOT NULL, Location TEXT);',
  [],(tx,results) => {
    console.log(results.rows._array)
  },function(tx,err){
    console.log(err);
  });
  tx.executeSql('CREATE TABLE IF NOT EXISTS Users (UserId INTEGER PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL UNIQUE);'
  ,[],(tx,results) => {
    console.log(results.rows._array)
  },function(tx,err){
    console.log(err);
  });
  tx.executeSql('CREATE TABLE IF NOT EXISTS Participants (EventId INTEGER, UserId INTEGER, PRIMARY KEY(EventId, UserId);'
  ,[],function(tx,err){
    console.log(err);
  });
  tx.executeSql(sql,[],function(tx,err){
    console.log(err);
  });
});
export {db};