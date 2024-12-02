/*
This file will hold functions that are "utility" in nature, 
meaning that we will reuse them over and over, but they don't directly 
belong to the M-V-C structure.
*/
const invModel = require("../models/inventory-model") //Import inventory-model file, so it can be used to get data from the database
const Util = {} //create an empty Util object

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
//Create an asynchronous function that pulls the nav menu names from the database
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  console.log(data)
  let list = '<ul class="nav-menu">'
  list += '<li class="nav-item"><a class="nav-link" href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += '<li class="nav-item">'
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
    grid = '<ul id="inv-display" >'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ data.rows[0].inv_id 
      + '" title="View ' + data.rows[0].inv_make + ' '+ data.rows[0].inv_model 
      + ' details"><img src="' + data.rows[0].inv_thumbnail 
      +'" alt="Image of '+ data.rows[0].inv_make + ' ' + data.rows[0].inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + data.rows[0].inv_id +'" title="View ' 
      + data.rows[0].inv_make + ' ' + data.rows[0].inv_model + ' details">' 
      + data.rows[0].inv_make + ' ' + data.rows[0].inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(data.rows[0].inv_price) + '</span>'
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
* Build the item detail view HTML
* ************************************ */
//Build an asynchronous function that creates a grid for data returned as an array
//from the model query
Util.buildItemDetailGrid = async function(data){
  let item
  if(data.length > 0){
    item = '<ul id="inv-display" >'
    
      item += '<li>'
      item +=  '<a href="../../inv/detail/'+ data.rows[0].inv_id 
      + '" title="View ' + data.rows[0].inv_make + ' '+ data.rows[0].inv_model 
      + ' details"><img src="' + data.rows[0].inv_thumbnail 
      +'" alt="Image of '+ data.rows[0].inv_make + ' ' + data.rows[0].inv_model 
      +' on CSE Motors" /></a>'
      item += '<div class="namePrice">'
      item += '<hr />'
      item += '<h2>'
      item += '<a href="../../inv/detail/' + data.rows[0].inv_id +'" title="View ' 
      + data.rows[0].inv_make + ' ' + data.rows[0].inv_model + ' details">' 
      + data.rows[0].inv_make + ' ' + data.rows[0].inv_model + '</a>'
      item += '</h2>'
      item += '<span>$' 
      + new Intl.NumberFormat('en-US').format(data.rows[0].inv_price) + '</span>'
      item += '</div>'
      item += '</li>'
    item = data.rows[0].inv_make
    
    item += '</ul>'
  } else { 
    item += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return item
}

/* **************************************
* Build the classification view HTML
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
// Promise.resolve(fn(req, res, next)) a "wrapper" that accepts a function as a parameter of the "Promise.resolve" function. In other words, the wrapped function is called and attempts to fulfill its normal process, but now does so within a JavaScript promise. If it succeeds, then the promise is resolved and everything continues normally.
// .catch(next) - if there is an error, then the Promise "fails", the error that caused the failure is "caught" and forwarded to the next process in the application chain.
// Because it is an "error" that is being passed via the "next" function, the Express Error Handler will catch the error and then build and deliver the error view to the client.


module.exports = Util