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
 *  Build inventory by item detail view
 * ************************** */
//Create an asynchronous function that pulls the vehicles by classification
invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.inventoryId //get the classification_id that has been sent, as a named parameter, through the URL
  const data = await invModel.getItemByInventoryId(inv_id)
  const grid = await utilities.buildInventoryGrid(data) //calls a utility function to build a grid, containing all vehicles within that classification
  let nav = await utilities.getNav() //calls the function to build the navigation bar for use in the view and stores it in the nav variable
  const invMake = data.inv_make //extracts the name of the classification, which matches the classification_id, from the data returned from the database
  const invItemModel = data.inv_model
  const invYear = data.inv_year
  
  //calls the Express render function to return a view to the browser
  res.render("./inventory/item", {
    title: invMake+' '+invItemModel+' ('+invYear+')',
    nav,
    grid,
  })
}



module.exports = invCont