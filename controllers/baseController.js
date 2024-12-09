const utilities = require("../utilities/") //import utilities
const baseController = {} //Create an empty baseController object

//Create an asynchronous function that builds the Home nav links
baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()

  //For testing purposes only,
  //assign the message to the request object
  //The first parameter indicates the "type" of message. 
  //The second parameter is the actual message to be displayed.
  //req.flash("notice", "This is a flash message.")

  res.render("index", {title: "Home", nav})
}

module.exports = baseController