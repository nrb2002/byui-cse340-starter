//Needed resources
const express = require("express") //Import Express
const router = new express.Router() //Use Express to create a router object
const invController = require("../controllers/invController") //Import the Inventory controller
const utilities = require("../utilities/")

//Route to build inventory by Classification view
/*
"get" indicates that the route will listen for the GET method within the request (typically a clicked link or the URL itself).
/type/:classificationId the route being watched for.
invController.buildByClassification is the function from the invController that will fulfill the request sent by the route.
*/
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

//Route to build a specific inventory item detail view
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));

module.exports = router;