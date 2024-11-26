const utilities = require("../utilities/") //import utilities
const baseController = {} //Create an empty baseController object

//Create an asynchronous function that builds the Home nav links
baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("index", {title: "Home", nav})
}

module.exports = baseController