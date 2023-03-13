const pg = require('pg');

let pool;

if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    })
  }
  else {
    pool = new pg.Pool({
      database: "to_do_list", // DB NAME not table!
      host: "localhost",
      port: 5432,
      // number of milliseconds a client must sit idle in the pool and not be checked out
      // before it is disconnected from the backend and discarded
      // default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients
      idleTimeoutMillis: 30000,
    });
  }
  
  // Code below is for "happy" & "sad" behaviors when connecing to DB
  pool.on("connect", () => {
    console.log("DB CONNECTED");
  });
  
  pool.on("error", (err) => {
    console.log("ERROR CONNECTING");
    console.log(err);
  });
  
module.exports = pool;