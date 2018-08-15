var sqlite3 = require('sqlite3').verbose();
var database = new sqlite3.Database('./havendata.db');

//check for db changes in the havendata.db folder in the ROOT folder, not the database folder

//db will throw errors if columns are not formatted as one line, do not separate into neat to read rows

// Entire db setup is wrapped in a function which is exported to database test file so that any changes here will
// be reflected in database that is built for tests
var runSchema = function(database) {
  database.serialize(function() {
    // database.run("DROP TABLE IF EXISTS user");
    database.run("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, mediaTypes TEXT, interests TEXT, discoverable BOOLEAN)");
    
    // database.run("DROP TABLE IF EXISTS media");
    database.run("CREATE TABLE IF NOT EXISTS media (id INTEGER PRIMARY KEY, photoVidId INTEGER, musicId INTEGER,journalId INTEGER, FOREIGN KEY (photoVidId) REFERENCES photoVid(id), FOREIGN KEY (musicId) REFERENCES music(id),FOREIGN KEY (journalId) REFERENCES journal(id))");
    
    // database.run("DROP TABLE IF EXISTS photoVid");
    database.run("CREATE TABLE IF NOT EXISTS photoVid (id INTEGER PRIMARY KEY, title TEXT, description TEXT, file TEXT, userId INTEGER, FOREIGN KEY (userId) REFERENCES user(id))");
    
    // database.run("DROP TABLE IF EXISTS music");
    database.run("CREATE TABLE IF NOT EXISTS music (id INTEGER PRIMARY KEY, title TEXT, file TEXT, userId INTEGER, FOREIGN KEY (userId) REFERENCES user(id))");
    
    // database.run("DROP TABLE IF EXISTS journal");
    database.run("CREATE TABLE IF NOT EXISTS journal(id INTEGER PRIMARY KEY, title TEXT, description TEXT, file TEXT, userId INTEGER, FOREIGN KEY (userId) REFERENCES user(id))");
    
    // database.run("DROP TABLE IF EXISTS contacts");
    database.run("CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY, name TEXT, phone INTEGER, email TEXT, emergencyContact BOOLEAN)");
  });
}

runSchema(database);

var addJournalEntry = function (req) {
  console.log('CALLING THIS NOW')
	database.serialize(function(){
        var sqliteCommand = `INSERT INTO journal VALUES (${req.body.id}, '${req.body.title}' , '${req.body.description}', '${req.body.file}', ${req.body.userId})`;
        database.run(sqliteCommand, (err)=> {
          if (err) {
            console.log(err)
          }
          console.log('is this even saving??')
        });
  });
}


//if db connection is closed it won't let us make more entries so I have commented this out for the time being
// db.close();

module.exports.database = database;
module.exports.runSchema = runSchema;
module.exports.addJournalEntry = addJournalEntry;
// addJournalEntry({body:
//  { "id": "55",
//   "userId": "7",
//   "title": "title",
//    "description": "summary",
//    "file": "what my thoughts are"}
//  })
    //media columns
    //       id integer primary key not null,
    //       photoVidId integer NOT NULL,
    //         FOREIGN KEY (photoVidId) REFERENCES photoVid(id),
    //       musicId integer NOT NULL,
    //         FOREIGN KEY (musicId) REFERENCES music(id),
    //       journalId integer NOT NULL,
    //         FOREIGN KEY (journalId) REFERENCES journal(id),
    //photoVid columns
    //     id integer primary key not null,
    //     title TEXT,
    //     description TEXT,
    //     file TEXT,
    //     userId integer NOT NULL,
    //     FOREIGN KEY (userId) REFERENCES user(id),
    // music columns
    //     id integer primary key not null,
    //     title TEXT,
    //     file TEXT,
    //     userId integer NOT NULL,
    //     FOREIGN KEY (userId) REFERENCES user(id),
    //journal columns
    //     id integer primary key not null,
    //     title TEXT,
    //     description TEXT,
    //     file TEXT,
    //     userId integer NOT NULL,
    //     FOREIGN KEY (userId) REFERENCES user(id),
    // contact columns 
    //     id integer primary key not null,
    //     name TEXT,
    //     phone INTEGER,
    //     email TEXT,
    //     emergencyFlag BOOLEAN

//test helper function to make sure db is being properly populated
//   var stmt = db.prepare("INSERT INTO testAgain VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

//   db.each("SELECT rowid AS id, info FROM testAgain", function(err, row) {
//       console.log(row.id + ": " + row.info);
//   });

////////////////////////////////////////
//old code for using expo's sqlite3

// const expo = require('expo');

// const db = expo.SQLite.openDatabase('havendata.db');

// const initializedb = () => {
//     db.transaction(tx => {
//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS if not exists testAgain (
//           id integer primary key not null,
//           message text
//         );`, [], null, (t, err) => {console.log(err)}
//       );
//     //   tx.executeSql(
//     //     `CREATE TABLE IF NOT EXISTS if not exists user (
//     //       id integer primary key not null,
//     //       mediaTypes text,
//     //       interests text,
//     //       discoverable boolean
//     //     );`, [], null, (t, err) => {console.log(err)}
//     //   );
//     //   tx.executeSql(
//     //     `CREATE TABLE IF NOT EXISTS if not exists media (
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
