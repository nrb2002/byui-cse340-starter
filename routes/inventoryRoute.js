//Needed resources
const express = require("express") //Import Express
const router = new express.Router() //Use Express to create a router object
const invController = require("../controllers/invController") //Import the Inventory controller
const utilities = require("../utilities/")
const classValidate = require("../utilities/inventory-validation") //Import the validation function

//Route to build inventory by Classification view
/*
"get" indicates that the route will listen for the GET method within the request (typically a clicked link or the URL itself).
/type/:classificationId the route being watched for.
invController.buildByClassification is the function from the invController that will fulfill the request sent by the route.
*/
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

//Route to build a specific inventory item detail view
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));

/***************************
 * Deliver management view  
 * *************************/ 
//Get the route sent when the 'Management' link is clicked or activated in the url
router.get("/", utilities.handleErrors(invController.buildManagement));

/***************************
 * Deliver Add Classification view  
 * *************************/ 
//Get the route sent when the 'Management' link is clicked or activated in the url
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

/***************************************************************************************************** */
// POSTING DATA FROM FORMS
/***************************************************************************************************** */

/***************************
 * Post data from add classification view 
 * *************************/ 
//Get the route sent when the 'Submit' button is clicked
// Process the registration data, run the validation, and handle errors if any
router.post(
    "/add-classification",
    classValidate.classificationRules(),
    //classValidate.checkClassData, //Will double check later
    utilities.handleErrors(invController.addClassification)
  )



module.exports = router;