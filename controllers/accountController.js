/* ****************************************
*  Deliver register view
* *************************************** */

//Import utilities
const utilities = require("../utilities") 

//Import Account Model
const accountModel = require("../models/account-model") 


/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  const loginForm = await utilities.getLoginForm()
  res.render("account/login", {
    title: "Login",
    nav,
    loginForm,
    errors: null,
  })
}

/* ****************************************
*  Deliver register view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  const registerForm = await utilities.getRegisterForm()
  res.render("account/register", {
    title: "Register",
    nav,
    registerForm,
    errors: null,
  })
}

/* ****************************************
*  Deliver username view
* *************************************** */
async function buildUsername(req, res, next) {
  let nav = await utilities.getNav()
  const usernameForm = await utilities.getUsernameForm()
  res.render("account/username", {
    title: "Verify Username",
    nav,
    usernameForm,
    errors: null,
  })
}

/* ****************************************
*  Deliver reinitialize view
* *************************************** */
async function buildReset(req, res, next) {
  let nav = await utilities.getNav()
  const resetForm = await utilities.getResetForm()
  res.render("account/reset", {
    title: "Reset Password",
    nav,
    resetForm,
    errors: null,
  })
}

/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const loginForm = await utilities.getLoginForm()
  const registerForm = await utilities.getRegisterForm()
  //Get the data from the form
  const { 
    account_firstname, 
    account_lastname, 
    account_email, 
    account_password  
  } = req.body

  //Pass the data from the form to the model to be inserted into the database
  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_password
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
      loginForm,
      errors: null,
    })
  } else {
    //If failed flash error message
    req.flash("notice-error", "Sorry, the registration failed! Please try again. ")
    res.status(501).render("account/register", {
      title: "Register",
      nav,
      registerForm,
      errors: null,
    })
  }
}







module.exports = { buildLogin, buildRegister, buildUsername, buildReset, registerAccount }

