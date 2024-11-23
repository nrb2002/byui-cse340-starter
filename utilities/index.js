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
//Create an asynchronous function
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  console.log(data)
  let list = '<ul class="nav-menu">'
  list += '<li class="nav-item"><a class="nav-link href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
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