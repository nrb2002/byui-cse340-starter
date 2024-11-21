const{Pool} = require("pg"); //import the Pool functionality from the PostgreSQL package
require("dotenv").config() //import the "dotenv" package which allows the sensitive information about the database
/* ***************
 * Connection Pool
 * SSL Object needed for local testing of app
 * But will cause problems in production environment
 * If - else will make determination which to use
 * *************** */
let pool //creates a local pool variable to hold the functionality of the "Pool" connection.
if(process.env.NODE_ENV == "development"){
    pool = new Pool({
        connectionString: process.env.DATABASE_URL, 
        ssl: {
            rejectUnauthorized: false, //Do not reject connection when connecting with a remote database
        },    
    })
    // Added for troubleshooting queries
    // during development
    module.exports = {
        async query(text, params){
            try{
                const res = await pool.query(text, params)
                console.log("executer query", {text})
                return res
            } catch(error){
                console.error('error in query', {text})
                throw error
            } 
        },
    }
} else{
    pool = new Pool({
        connectionString: process.env.DATABASE_URL, //indicates the value of the connection string will be found in an environment variable 
    })    
    module.exports = pool
}