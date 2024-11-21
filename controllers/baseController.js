/*
A controller is the location where the logic of the application resides. 
It is responsible for determining what action is to be carried out in order 
to fulfill requests submitted from remote clients. The "base" controller 
will be responsible only for requests to the application in general, 
and not to specific areas (such as inventory or accounts).
*/

const utilities = require("../utilities/") //imports an index.js file from a utilities folder
const baseController = {} //creates an empty object named baseController

//creates an anonymous, asynchronous function and assigns the function to 
//buildHome which acts as a method of the baseController object
baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav() //calls a getNav() function that will be found in the utilities > index.js file
  res.render("/", baseController.buildHome)
}

//exports the baseController object for use elsewhere.
module.exports = baseController