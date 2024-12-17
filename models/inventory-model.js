//Import the pool object containing the database connection string
const pool = require("../database/") 

/***************************************************************************************** */

 // EVERYTHING ABOUT CLASSIFICATIONS

/***************************************************************************************** */

/* ***************************
 *  Get all classification data
 * ************************** */

//Create an asynchronous function to pull data 
//from the Classification table
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* **********************
 *   Check for existing classification
 * ********************* */
/*
Hopefully, this function looks familiar. 
It queries the database to see if a record exists with the same email that is being submitted. It returns the count of rows found. Anything greater than zero means the email already exists in the database.
*/
async function checkExistingClassification(classification_name){
  try {
    const sql = "SELECT * FROM public.classification WHERE classification_name = $1"
    const classification_name = await pool.query(sql, [classification_name])
    return classification_name.rowCount
  } catch (error) {
    return error.message
  }
}

/* *****************************
*   Insert new classification
* *************************** */
async function addClassification(classification_name){
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
    return await pool.query(sql, [classification_name])
  } catch (error) {
    return error.message
  }
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows //send the data as an array of all the rows, back to where the function was called (in the controller)
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getItemByInventoryId(inv_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory 
      WHERE inv_id = $1`,
      [inv_id]
    )
    return data.rows[0] //send the data as an array of all the rows, back to where the function was called (in the controller)
  } catch (error) {
    console.error("getItemByInventoryId error " + error)
  }
}



module.exports = {
  getClassifications, 
  getInventoryByClassificationId, 
  getItemByInventoryId, 
  checkExistingClassification, 
  addClassification
};