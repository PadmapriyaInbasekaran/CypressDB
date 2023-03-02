const { defineConfig } = require("cypress");
const mysql = require('mysql2')
function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.db)
  // start connection to db
  connection.connect()
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error)
      else {
        connection.end()
        return resolve(results)
      }
    })
  })
}
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
        on('task', { queryDb: query => { return queryTestDb(query, config) }, }); //For running sql query
    
    },
    specPattern: "cypress/e2e/*.js",
    "env": {
      "db": {
        "host": "localhost",
        "user": "root",
        "password": "admin",
        "database": "cypressDB"
      }
    }
  }
});
