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

module.exports = Util

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
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}