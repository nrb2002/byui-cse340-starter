const invModel = require("../models/inventory-model") //Import Inventory Model
const utilities = require("../utilities/") //Import utilities

const invCont = {} //Create an empty object of invCont

/* ***************************
 *  Build inventory by classification view
 * ************************** */
//Create an asynchronous function that pulls the vehicles by classification
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId //get the classification_id that has been sent, as a named parameter, through the URL
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data) //calls a utility function to build a grid, containing all vehicles within that classification
  let nav = await utilities.getNav() //calls the function to build the navigation bar for use in the view and stores it in the nav variable
  const className = data[0].classification_name //extracts the name of the classification, which matches the classification_id, from the data returned from the database
  
  //calls the Express render function to return a view to the browser
  res.render("./inventory/classification", {
    title: className + " Vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory item detail view
 * ************************** */
//Create an asynchronous function that pulls the vehicles with all its details
invCont.buildItemDetailView = async function (req, res, next) {
  const inventoryId = req.params.inventoryId //get the inv_id that has been sent, as a named parameter, through the URL
  const data = await invModel.getItemDetailByInvetoryId(inv_id)
  const grid = await utilities.buildItemDetailGrid(data) //calls a utility function to build a grid, containing all details attached to the selected vehicle
  let nav = await utilities.getNav() //calls the function to build the navigation bar for use in the view and stores it in the nav variable
  
  //extracts the make, model, and year that match the inv_id, from the data returned from the database
  const invMake = data[0].inv_make
  const invItemModel = data[0].inv_model
  const invYear = data[0].inv_year 
  
  //calls the Express render function to return a view to the browser
  res.render("./inventory/detail", {
    title: invMake +' '+ invItemModel +' '+'('+invYear+')',
    nav,
    item,
  })
}

module.exports = invCont