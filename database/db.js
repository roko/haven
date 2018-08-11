var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('havendata.db');

db.serialize(function() {
  db.run("CREATE TABLE testAgain (info TEXT)");

  var stmt = db.prepare("INSERT INTO testAgain VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM testAgain", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});

db.close();
// const expo = require('expo');

// const db = expo.SQLite.openDatabase('havendata.db');

// const initializedb = () => {
//     db.transaction(tx => {
//       tx.executeSql(
//         `create table if not exists testAgain (
//           id integer primary key not null,
//           message text
//         );`, [], null, (t, err) => {console.log(err)}
//       );
//     //   tx.executeSql(
//     //     `create table if not exists user (
//     //       id integer primary key not null,
//     //       mediaTypes text,
//     //       interests text,
//     //       discoverable boolean
//     //     );`, [], null, (t, err) => {console.log(err)}
//     //   );
//     //   tx.executeSql(
//     //     `create table if not exists media (
//     //       id integer primary key not null,
//     //       photoVidId integer NOT NULL,
//     //         FOREIGN KEY (photoVidId) REFERENCES photoVid(id),
//     //       musicId integer NOT NULL,
//     //         FOREIGN KEY (musicId) REFERENCES music(id),
//     //       journalId integer NOT NULL,
//     //         FOREIGN KEY (journalId) REFERENCES journal(id),
//     //     );`, [], null, (t, err) => {console.log(err)}
//     //   )
//       console.log('initialized haven db')
//     });
//   }

// module.exports.db = db;