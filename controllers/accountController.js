const utilities = require("../utilities") //Import utilities


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

module.exports = { buildLogin, buildRegister, buildUsername, buildReset }

