/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express") 
const expressLayouts = require("express-ejs-layouts") //we tell the application to require express-ejs-layouts, so it can be used
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static") //a route file named "static" is imported and stored into a "static" variable

const baseController = require("./controllers/baseController") //bring the base controller into scope

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs") //we declare that ejs will be the view engine for our application
app.use(expressLayouts) //we tell the application to use the express-ejs-layouts package, which has been stored into a "expressLayouts" variable
app.set("layout", "./layouts/layout") //when the express ejs layout goes looking for the basic template for a view, it will find it in a layouts folder, and the template will be named layout.

/* ***********************
 * Routes
 *************************/
app.use(static) //instead of router.use, it is now app.use, meaning that the application itself will use this resource

//Index route
/**
* The express application will watch the "get" object, within the HTTP Request, 
* namely the base route of the application 
*/
app.get("/", function(req, res){ //function takes the request and response objects as parameters.
  res.render("/", baseController.buildHome) //"res" is the response object, while "render()" is an Express function that will retrieve the specified view - "index" - to be sent back to the browser.
  //his will execute the function in the controller, build the navigation bar and pass it and the title name-value pair to the index.ejs view, which will then be sent to the client.
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
