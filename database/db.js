var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('havendata.db');

db.serialize(function() {
    db.run("DROP TABLE IF EXISTS user");
    db.run("CREATE TABLE user (id INTEGER PRIMARY KEY, mediaTypes TEXT, interests TEXT, discoverable BOOLEAN)");

    db.run("DROP TABLE IF EXISTS media");
    db.run("CREATE TABLE media (id INTEGER PRIMARY KEY, photoVidId INTEGER, musicId INTEGER,journalId INTEGER, FOREIGN KEY (photoVidId) REFERENCES photoVid(id), FOREIGN KEY (musicId) REFERENCES music(id),FOREIGN KEY (journalId) REFERENCES journal(id))");
    
    db.run("DROP TABLE IF EXISTS photoVid");
    db.run("CREATE TABLE photoVid (id INTEGER PRIMARY KEY, title TEXT, description TEXT, file TEXT, userId INTEGER, FOREIGN KEY (userId) REFERENCES user(id))");

    db.run("DROP TABLE IF EXISTS music");
    db.run("CREATE TABLE music (id INTEGER PRIMARY KEY, title TEXT, file TEXT, userId INTEGER, FOREIGN KEY (userId) REFERENCES user(id))");

    db.run("DROP TABLE IF EXISTS journal");
    db.run("CREATE TABLE journal(id INTEGER PRIMARY KEY, title TEXT, description TEXT, file TEXT, userId INTEGER, FOREIGN KEY (userId) REFERENCES user(id))");

    db.run("DROP TABLE IF EXISTS contacts");
    db.run("CREATE TABLE contacts(id INTEGER PRIMARY KEY, name TEXT, phone INTEGER, email TEXT, emergencyContact BOOLEAN)");
    // db.run("CREATE TABLE photoVid (
    //     id integer primary key not null,
    //     title TEXT,
    //     description TEXT,
    //     file TEXT,
    //     userId integer NOT NULL,
    //     FOREIGN KEY (userId) REFERENCES user(id),
    // )");

    // db.run("CREATE TABLE music (
    //     id integer primary key not null,
    //     title TEXT,
    //     file TEXT,
    //     userId integer NOT NULL,
    //     FOREIGN KEY (userId) REFERENCES user(id),
    // )");

    // db.run("CREATE TABLE photoVid (
    //     id integer primary key not null,
    //     title TEXT,
    //     description TEXT,
    //     file TEXT,
    //     userId integer NOT NULL,
    //     FOREIGN KEY (userId) REFERENCES user(id),
    // )");


    // db.run("CREATE TABLE contacts (
    //     id integer primary key not null,
    //     name TEXT,
    //     phone INTEGER,
    //     email TEXT,
    //     emergencyFlag BOOLEAN
    // )");

//   var stmt = db.prepare("INSERT INTO testAgain VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

//   db.each("SELECT rowid AS id, info FROM testAgain", function(err, row) {
//       console.log(row.id + ": " + row.info);
//   });
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