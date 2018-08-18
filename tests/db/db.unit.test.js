const imports = require('../../database/db');
const runSchema = imports.runSchema;
var sqlite3 = require('sqlite3').verbose();
var testDB = new sqlite3.Database(':memory');

// runSchema function contains all schema from database file so that test db generated will have 
// identical structure to application database
const createDatabaseForTest = () => {
  runSchema(testDB);
};  

// the test suite below leaves a lot to be desired, obviously. I'm leaving it as is for now 
// I have not figured out how to access the database within the test functions so that more 
// meaningful tests can be run. Will schedule office hours with tech mentor 
describe('database', () => {
  it('exists', () => {
    testDB.run('.open :memory')
    console.log(testDB);
    expect(testDB).toBeTruthy();
    expect(testDB.filename).toEqual(':memory');
  })
});

