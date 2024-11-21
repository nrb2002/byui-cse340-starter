const pool = require("../database/") //import the database connection file named index.js

/* ***************************
 *  Get all classification data
 * ************************** */
//creates an "asynchronous" function
async function getClassifications(){
    //return (send back) the result of the SQL query, which will be sent to the database server using a pool connection 
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

module.exports = {getClassifications} //exports the function for use elsewhere