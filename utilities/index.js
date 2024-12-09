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
* Build the Inventory Detail view HTML
* ************************************ */
//Build an asynchronous function that creates a grid for data returned as an array
//from the model query
Util.buildLogin = async function(){
  let login  
  
  login = '<div class="item-display">'

  login += '<div class="login-container">'
  login += '<div class="login-card">'
  login += '<h2>Login Form</h2>'
  login += '<form class="login-form">'
  login += '<label for="username">Username</label>'
  login += '<input type="text" id="username" placeholder="Enter your username">'

  login += '<label for="password">Password</label>'
  login += '<input type="password" id="password" placeholder="Enter your password">'

  login += '<button type="submit">Login</button>'
  login += '</form>'
  login += '<div class="switch">Don\'t have an account? <a href="#" onclick="switchCard()">Register here</a></div>'
  login += '</div>'

  login += '<div class="login-card" style="display: none;">'
  login += '<h2>Register Form</h2>'
  login += '<form>'
  login += '<label for="fullname">Full Name</label>'
  login += '<input type="text" id="fullname" placeholder="Enter your full name">'

  login += '<label for="email">Email</label>'
  login += '<input type="email" id="email" placeholder="Enter your email">'

  login += '<label for="new-password">New Password</label>'
  login += '<input type="password" id="new-password" placeholder="Enter your new password">'

  login += '<button type="submit">Register</button>'
  login += '</form>'
  login += '<div class="switch">Already have an account? <a href="#" onclick="switchCard()">Login here</a></div>'
  login += '</div>'
  login += '</div>'

    
    

  return login 
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