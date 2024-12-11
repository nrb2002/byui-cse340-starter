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
  })
}

module.exports = { buildLogin }

