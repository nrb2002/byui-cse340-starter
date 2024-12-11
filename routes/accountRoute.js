/***************************
 * Account routes
 *  
 * *************************/ 
//Needed resources
const express = require("express") //Import Express
const router = new express.Router() //Use Express to create a router object
const accountController = require("../controllers/accountController") //Import the Inventory controller
const utilities = require("../utilities") //Import utilities

/***************************
 * Deliver login view  
 * *************************/ 
//Get the route sent when the 'My Account' link is clicked
router.get("/login", utilities.handleErrors(accountController.buildLogin));

//export router
module.exports = router;