/* ****************************************
*  Require Statements
* *************************************** */

//Import utilities
const utilities = require("../utilities") 

//Import Account Model
const accountModel = require("../models/account-model") 

//Import the password hash lib
const bcrypt = require("bcryptjs")


/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
    errors: null,
  })
}

/**************************************************************** */
/**ANYTHING ABOUT ACCOUNT REGISTRATION */
/**************************************************************** */

/* ****************************************
*  Deliver register view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  
  //Get the data from the form
  const { 
    account_firstname, 
    account_lastname, 
    account_email, 
    account_password  
  } = req.body

  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }

  //Pass the data from the form to the model to be inserted into the database
  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    //If successful insertion of data, flash confirmation message
    req.flash(
      "notice-success",
      `Congratulations, <strong>${account_firstname}</strong>! You've registered successfully! Feel free to sign in to your account.`
    )
    //If successful insertion of data, go to login page
    res.status(201).render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  } else {
    //If failed flash error message
    req.flash("notice-error", "Sorry, the registration failed! Please try again. ")
    res.status(501).render("account/register", {
      title: "Register",
      nav,
      errors: null,
    })
  }
}

/* ****************************************
*  Deliver username view
* *************************************** */
async function buildUsername(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/username", {
    title: "Verify Username",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Deliver reset view
* *************************************** */
async function buildReset(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/reset", {
    title: "Reset Password",
    nav,
    errors: null,
  })
}



/* ****************************************
*  Process Reset
* *************************************** */
async function resetAccount(req, res) {
  let nav = await utilities.getNav()
  
  //Get the data from the form
  const { 
    account_email, 
    account_password  
  } = req.body

  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/reset", {
      title: "Reset Password",
      nav,
      errors: null,
    })
  }

  //Pass the data from the form to the model to be inserted into the database
  const resetResult = await accountModel.resetAccount(
    account_email,
    hashedPassword
  )

  if (resetResult) {
    //If successful insertion of data, flash confirmation message
    req.flash(
      "notice-success",
      `Password updated successfully! Sign in now.`
    )
    //If successful insertion of data, go to login page
    res.status(201).render("account/login", {
      title: "Login",
      nav,
      errors: null,
    })
  } else {
    //If failed flash error message
    req.flash("notice-error", "Sorry, the password reset failed! Please try again. ")
    res.status(501).render("account/reset", {
      title: "Reset Password",
      nav,
      errors: null,
    })
  }
}







module.exports = { buildLogin, buildRegister, buildUsername, buildReset, registerAccount, resetAccount }

