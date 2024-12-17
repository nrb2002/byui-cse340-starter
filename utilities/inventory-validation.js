//Import the utilities file
const utilities = require(".")

//Import the express validator package
const { body, validationResult } = require("express-validator")
const validate = {}

//Import the inventory model
const invModel = require("../models/inventory-model")

/*  **********************************
  *  Classification Data Validation Rules
  * ********************************* */
 /* 
 This is a function that will return an array of rules to be used when checking the incoming data. 
 Each rule focuses on a specific input from the Classification form.
  */
 validate.classificationRules = () => {
  return [
    // firstname is required and must be string
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Please provide a valid classification name of more than 3 characters.") // on error this message is sent.

    
    //Check if classification name exists in the database before creating a new user
    .custom(async (classification_name) => {
      const classificationExists = await invModel.checkExistingClassification(classification_name)
      if (classificationExists){
        throw new Error(`Classification ${classification_name} exists. Please try with a different name.`)
      }
    })
  ]
}

validate.checkClassData = async (req, res, next) => {
  const { classification_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("./inventory/add-classification", {
      errors,
      title: "New Classification",
      nav,      
      classification_name,
    })
    return
  }
  next()
}




/*
if errors are found, then the errors, along with the initial data, 
will be returned to the registration view for correction

*/
validate.checkClassData = async (req, res, next) => {
  const { classification_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("./inventory/add-classification", {
      errors,
      title: "New Classification",
      nav,  
          
      classification_name,
    })
    return
  }
  next()
}
  


module.exports = validate