/*
This file will hold functions that are "utility" in nature, 
meaning that we will reuse them over and over, but they don't directly 
belong to the M-V-C structure.
*/
const invModel = require("../models/inventory-model") //Import inventory-model file, so it can be used to get data from the database
const Util = {} //create an empty Util object

// format number to US dollar
const toUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

//format mileage
const toMiles = new Intl.NumberFormat("en-US", { // Make users locale dynamic
  style: 'unit',
  unit: 'mile',
  unitDisplay: 'short',
  maximumFractionDigits: 0
});

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
//Create an asynchronous function that pulls the nav menu names from the database
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  console.log(data)
  let list = '<ul class="nav-menu">'
  list += '<li class="nav-data"><a class="nav-link" href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += '<li class="nav-data">'
    list +=
      '<a class="nav-link" href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
//Build an asynchronous function that creates a grid for data returned as an array
//from the model query
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul class="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + ' details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>' 
      + toUSD.format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the Inventory Detail view HTML
* ************************************ */
//Build an asynchronous function that creates a grid for data returned as an array
//from the model query
Util.buildInventoryGrid = async function(item){
  let grid
  
  // if(data.length>1){
  //Item Display
    grid = '<div class="item-display">'

    grid += '<img src="' + item.inv_image + '" alt="'+ item.inv_make + ' ' 
    + item.inv_model + ' ' 
    + item.inv_year 
    +' on CSE Motors/>'  
    
    //Item Card
    grid += '<div class="item-card">'
  
    //Item Details Table
    grid += '<div class="item-table">'
    grid+='<div class="item-price">'
    grid+= '<h2>Price: ' + toUSD.format(item.inv_price) + '</h2>'
    grid+='</div>'
    grid += '<hr>'

    grid += '<table>'    
    grid += '<tr>'
    grid += '<th>Make</th>'
    grid += '<td>'+item.inv_make+'</td>'
    grid += '</tr>'
    grid += '<tr>'
    grid += '<th>Model </th>' 
    grid += '<td>'+item.inv_model+'</td>'
    grid += '</tr>'
    grid += '<tr>'
    grid += '<th>Color</th>'
    grid += '<td>'+item.inv_color+'</td>'
    grid += '</tr>'
    grid += '<tr>'
    grid += '<th>Year: </th>'
    grid += '<td>'+item.inv_year+'</td>'
    grid += '</tr>'
    grid += '<tr>'
    grid += '<th>Mileage </th>'
    grid += '<td>'+ toMiles.format(item.inv_miles) + '</td>'
    grid += '</tr>'
    grid += '<tr>'
    grid += '<th>Description </th>'
    grid += '<td>'+item.inv_description+'</td>'
    grid += '</tr>'
    grid += '</table>'
    grid += '<hr>'
    grid += '</div>'
    //End Item Details Table

    grid += '</div>'
    //End Item Card

    // })
    grid += '</div>'
    //End Item Display
    
  // } else { 
  //   grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  // }

  return grid 
}

/* **************************************
* Build the Login view HTML
* ************************************ */
//Build an asynchronous function that creates a login form
Util.getLoginForm = async function(req, res, next){
  let loginForm  
  
  loginForm = '<div class="login-container">'
  loginForm += '<div class="form-card">'
  loginForm += '<h2>Please enter your credentials</h2>'
  loginForm += '<hr>'

  loginForm += '<form class="login-form">'
  loginForm += '<label for="account_email">Email address</label>'
  loginForm += '<input type="text" id=account_email" name="account_email" placeholder="Enter your username" required>'

  loginForm += '<label for="account_password">Password</label>'
  loginForm += '<input type="password" id="account_password" name="account_password" placeholder="Enter your password" required>'
  loginForm += '<div class="togglePasswd"><input type="checkbox" onclick="togglePassword()"><label>Show Password</label></div>'
  loginForm += '<small>The password must contain at least 12 characters, 1 capital letter, 1 number, and 1 special character.</small>'

  loginForm += '<input class="btn" type="submit" value="Sign in">'

  loginForm += '</form>'

  loginForm += '<div class="form-link">Forgot password? <a href="/account/username">Click here to reset.</a>'
  loginForm += '<div class="form-link">Dont have an account? <a href="/account/register">Sign up now!</a>'
  loginForm += '</div>'
  loginForm += '</div>'

  return loginForm 
}

/* **************************************
* Build the Register view HTML
* ************************************ */
//Build an asynchronous function that creates a registration form
Util.getRegisterForm = async function(req, res, next){
  let registerForm  
 
  registerForm = '<div class="login-container">'
  registerForm += '<div class="form-card">'
  registerForm += '<h2>Please fill out this form to register</h2>'
  registerForm += '<hr>'

  registerForm += '<form class="login-form" id="registerForm" action="/account/register" method="post">'

  registerForm += '<p><small>All fields are required.</small></p><br><br>'

  registerForm += '<label for="account_firstname">Firstname</label>'
  registerForm += '<input type="text" id="account_firstname" name="account_firstname" placeholder="Enter your Firstname" required>'
  
  registerForm += '<label for="account_lastname">Lastname</label>'
  registerForm += '<input type="text" id="account_lastname" name="account_lastname" placeholder="Enter your Lastname" required>'
  
  registerForm += '<label for="account_email">Email</label>'
  registerForm += '<input type="text" id=account_email" name="account_email" placeholder="Enter your email address" required>'

  registerForm += '<label for="account_password">Password</label>'
  registerForm += '<input type="password" id="account_password" name="account_password" placeholder="Enter your password" required>'
  registerForm += '<small>The password must contain at least 12 characters, 1 capital letter, 1 number, and 1 special character.</small>'

  registerForm += '<label for="account_confirm_password">Confirm Password</label>'
  registerForm += '<input type="password" id="account_confirm_password" name="account_confirm_password" placeholder="Confirm your password" required>'
  registerForm += '<label class="togglePasswd"><input type="checkbox" onclick="togglePassword()">Show password</label>'

  registerForm += '<label for="account_type">Account Type</label>'
  registerForm += '<select name="account_type" id="account_type">'
  registerForm += '<option value="">-- Select a type</option>'
  registerForm += '<option value="Client">Client</option>'
  registerForm += '<option value="Admin">Admin</option>'
  registerForm += '</select>'

  registerForm += '<input class="btn" type="submit" value="Sign up">'
  registerForm += '</form>'

  registerForm += '<div class="form-link">Already have an account? <a href="/account/login" >Sign in here.</a></div>'
  
  registerForm += '</div>'
  registerForm += '</div>'

  return registerForm 
}

/* **************************************
* Build the username view HTML
* ************************************ */
//Build an asynchronous function that creates a login form
Util.getUsernameForm = async function(req, res, next){
  let usernameForm  
  
  usernameForm = '<div class="login-container">'
  usernameForm += '<div class="form-card">'
  // usernameForm += '<h2>Please enter your username</h2>'
  // usernameForm += '<hr>'

  usernameForm += '<form class="login-form">'
  
  usernameForm += '<label for="account_email">Username</label>'
  usernameForm += '<input type="text" id=account_email" name="account_email" placeholder="Enter your username">'
  usernameForm += '<input class="btn" type="submit" value="Verify">'
  usernameForm += '<div class="form-link"><a href="/account/login" >Back to login page.</a></div>'
  usernameForm += '</form>'

  usernameForm += '</div>'
  usernameForm += '</div>'

  return usernameForm 
}

/* **************************************
* Build the Reinitialize view HTML
* ************************************ */
//Build an asynchronous function that creates a registration form
Util.getResetForm = async function(req, res, next){
  let resetForm  
 
  resetForm = '<div class="login-container">'
  resetForm += '<div class="form-card">'
  resetForm += '<h2>Please fill out this form to register</h2><hr>'
  resetForm += '<form class="login-form">'
  resetForm += '<legend><small>All fields are required.</small></legend><br><br>'

  resetForm += '<label for="account_password">New Password</label>'
  resetForm += '<input type="password" id="account_password" name="account_password" placeholder="Enter your new password" required>'
  resetForm += '<div class="togglePasswd"><input type="checkbox" onclick="togglePassword()"><label>Show Password</label></div>'
  resetForm += '<small>The password must contain at least 12 characters, 1 capital letter, 1 number, and 1 special character.</small>'

  resetForm += '<label for="account_confirm_password">Confirm Password</label>'
  resetForm += '<input type="password" id="account_confirm_password" name="account_confirm_password" placeholder="Re-enter your new password" required>'

  resetForm += '<input class="btn" type="submit" value="Save">'
  resetForm += '</form>'

  resetForm += '<div class="form-link">Already have an account? <a href="/account/login" >Sign in here.</a></div>'
  resetForm += '</div>'
  resetForm += '</div>'

  return resetForm 
}

/* **************************************
* Build the 404 error background
* ************************************ */
//Build an asynchronous function that creates a grid for data returned as an array
//from the model query
Util.buildErrorContent = async function (){
  let errorContent = '<div class="errorContent">'
  errorContent += '<img src="/images/site/cse-404-1.jpg">'
  errorContent += '</div>'

  return errorContent
}



/* ************************************************************************************************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 ************************************************************************************************************************ */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
//Util.handleErrors = - declares the property which is appended to the "Util" object.
// fn => (req, res, next) => an arrow function named "fn" which accepts request, response, and next as parameters along with another arrow function.
// Promise.resolve(fn(req, res, next)) a "wrapper" that accepts a function as a parameter of the "Promise.resolve" function. In other words, 
// the wrapped function is called and attempts to fulfill its normal process, but now does so within a JavaScript promise. 
// If it succeeds, then the promise is resolved and everything continues normally.
// .catch(next) - if there is an error, then the Promise "fails", the error that caused the failure is "caught" and forwarded to the next process in the application chain.
// Because it is an "error" that is being passed via the "next" function, the Express Error Handler will catch the error and then build and deliver the error view to the client.


module.exports = Util