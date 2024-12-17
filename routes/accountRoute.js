/***************************
 * Account routes
 *  
 * *************************/ 
//Needed resources
const express = require("express") //Import Express
const router = new express.Router() //Use Express to create a router object
const accountController = require("../controllers/accountController") //Import the Inventory controller
const utilities = require("../utilities") //Import utilities
const regValidate = require("../utilities/account-validation") //Import the validation function
const resetValidate = require("../utilities/account-validation") //Import the validation function

/***************************
 * Deliver login view  
 * *************************/ 
//Get the route sent when the 'My Account' link is clicked
router.get("/login", utilities.handleErrors(accountController.buildLogin));

/***************************
 * Deliver registration view  
 * *************************/ 
//Get the route sent when the 'Sign up' link is clicked
router.get("/register", utilities.handleErrors(accountController.buildRegister));

/***************************
 * Deliver verify username view  
 * *************************/ 
//Get the route sent when the 'Reinitialize' link is clicked
router.get("/username", utilities.handleErrors(accountController.buildUsername));

/***************************
 * Deliver reset view  
 * *************************/ 
//Get the route sent when the 'Reinitialize' link is clicked
router.get("/reset", utilities.handleErrors(accountController.buildReset));


/** ************************************************************************************* */ 
/** POST DATA ROUTES */ 
/** ************************************************************************************* */ 

/***************************
 * Post data from login view 
 * *************************/ 
// Process the login attempt
router.post(
  "/login",
  (req, res) => {
    res.status(200).send('login process') //the request was successful and returns "login process" to the browser
  }
)

/***************************
 * Post data from register view 
 * *************************/ 
//Get the route sent when the 'Sign up' link is clicked
// router.post("/register", utilities.handleErrors(accountController.registerAccount));

// Process the registration data, run the validation, and handle errors if any
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )

/***************************
 * Post data from reset view 
 * *************************/ 
//Get the route sent when the 'Sign up' link is clicked
// router.post("/reset", utilities.handleErrors(accountController.resetAccount));

// Process the reset data, run the validation, and handle errors if any
router.post(
  "/reset",
  resetValidate.resetRules(),
  resetValidate.checkResetData,
  utilities.handleErrors(accountController.resetAccount)
)

  

//export router
module.exports = router;