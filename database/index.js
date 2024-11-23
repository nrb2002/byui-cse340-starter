const { Pool } = require("pg") //Import the Pool functionality from the pg package
require("dotenv").config() //Import dotenv package that stores sensitive info about the database location and connection
/* ***************
 * Connection Pool
 * SSL Object needed for local testing of app
 * But will cause problems in production environment
 * If - else will make determination which to use
 * *************** */
let pool //Create a local pool variable

//Check to see if the code exists in a development environment
if (process.env.NODE_ENV == "development") {
    //create a new pool instance from the imported Pool class
    pool = new Pool({
        //Set the connection string as stored in the .env file
        connectionString: process.env.DATABASE_URL,
        ssl: {
            //prevent server from rejecting remote connection
        rejectUnauthorized: false,
        },
    })

    // Added for troubleshooting queries
    // During development
    module.exports = {
        async query(text, params) {
            try {
                const res = await pool.query(text, params)
                console.log("executed query", { text })
                return res
            } catch (error) {
                console.error("error in query", { text })
                throw error
            }
        },
    }
} else {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    })
    module.exports = pool
}