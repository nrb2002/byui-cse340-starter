//Import the pool object containing the database connection string
const pool = require("../database/") 

/* ***************************
 *  Get all classification data
 * ************************** */

//Create an asynchronous function to pull data 
//from the Classification table
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

module.exports = {getClassifications}