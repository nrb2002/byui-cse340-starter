//Import the utilities file
const utilities = require(".")

//Import the express validator package
const { body, validationResult } = require("express-validator")

const validate = {}

/*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
 /* 
 This is a function that will return an array of rules to be used when checking the incoming data. 
 Each rule focuses on a specific input from the registration form.
  */
validate.registationRules = () => {
    return [
      // firstname is required and must be string
      body("account_firstname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a first name."), // on error this message is sent.
  
      // lastname is required and must be string
      body("account_lastname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a last name."), // on error this message is sent.
  
      // valid email is required and cannot already exist in the DB
      body("account_email")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail() // refer to validator.js docs
      .withMessage("A valid email is required."),
  
      // password is required and must be strong password
      body("account_password")
        .trim()
        .notEmpty()
        .isStrongPassword({
          minLength: 12,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
        .withMessage("Password does not meet requirements."),
    ]
  }

  /* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
/*
if errors are found, then the errors, along with the initial data, 
will be returned to the registration view for correction

*/
validate.checkRegData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      const registerForm = await utilities.getRegisterForm()
      res.render("account/register", {
        errors,
        title: "Registration",
        nav,
        
        account_firstname,
        account_lastname,
        account_email,

        registerForm,
      })
      return
    }
    next()
  }
  
  module.exports = validate