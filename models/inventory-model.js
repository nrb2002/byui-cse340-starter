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
 *   Check for existing classification before inserting
 * ********************* */
/*
Hopefully, this function looks familiar. 
It queries the database to see if a record exists with the same email that is being submitted. It returns the count of rows found. Anything greater than zero means the email already exists in the database.
*/
async function checkExistingClassification(classification_name){
  try {
    const sql = "SELECT * FROM public.classification WHERE classification_name = $1"
    const className = await pool.query(sql, [classification_name])
    return className.rowCount
  } catch (error) {
    return error.message
  }
}

/* *****************************
*   Insert new classification
* *************************** */
async function insertClassification(classification_name){
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *"
    return await pool.query(sql, [classification_name])
  } catch (error) {
    return error.message
  }
}

/* **********************
 *   Check for existing classification before inserting
 * ********************* */
/*
Hopefully, this function looks familiar. 
It queries the database to see if a record exists with the same email that is being submitted. It returns the count of rows found. Anything greater than zero means the email already exists in the database.
*/
async function checkExistingInventory(inv_model){
  try {
    const sql = "SELECT * FROM public.inventory WHERE inv_model = $1"
    const invModel = await pool.query(sql, [inv_model])
    return invModel.rowCount
  } catch (error) {
    return error.message
  }
}

/* *****************************
*   Insert new classification
* *************************** */
async function insertInventory(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id){
  try {
    const sql = "INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
    return await pool.query(sql, [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id])
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
  checkExistingInventory,
  insertClassification,
  insertInventory
};