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

//Import routes
const static = require("./routes/static") //a route file named "static" is imported and stored into a "static" variable
const inventoryRoute = require("./routes/inventoryRoute") //Import the inventoryRoute from the routes folder
const accountRoute = require("./routes/accountRoute") //Import the login route

//Import controllers
const baseController = require("./controllers/baseController") //bring the base controller into scope

//Import utilities
const utilities = require("./utilities/") 

//Import session package
const session = require("express-session") 

//Import database connection
const pool = require("./database/") 

//Import body-parser
const bodyParser = require("body-parser")



/* ***********************
 * Middleware - Section
 * ************************/
//Connect-pg-simple middleware
app.use(session({ //app.use() applies whatever is being invoked throughout the entire application
  //creating a new session table in our PostgreSQL database 
  // using the "connect-pg-simple" package 
  // and our pool connection for the database connection
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  //Create name - value pair that will be used to protect the session
  // the value of the session secret should be created in the .env file
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId', 
}))

// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

//Enable body-parser
app.use(bodyParser.json()) //tells the express application to use the body parser to work with JSON data 
app.use(bodyParser.urlencoded({ extended: true })) // tells the express application to read and work with data sent via a URL as well as from a form



/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs") //we declare that ejs will be the view engine for our application
app.use(expressLayouts) //we tell the application to use the express-ejs-layouts package, which has been stored into a "expressLayouts" variable
app.set("layout", "./layouts/layout") //when the express ejs layout goes looking for the basic template for a view, it will find it in a layouts folder, and the template will be named layout.

/* *********************************************************************
 * Routes
 ***********************************************************************/
app.use(static) //instead of router.use, it is now app.use, meaning that the application itself will use this resource

//Index route
app.get("/", utilities.handleErrors(baseController.buildHome)) 
/**
* The express application will watch the "get" object, within the HTTP Request, 
* namely the base route of the application 
*/
//Use the imported baseController to call buildHome method
//will execute the function in the controller, build the navigation bar and 
//pass it and the title name-value pair to the index.ejs view, 
//which will then be sent to the client

//Enable Inventory routes
app.use("/inv", inventoryRoute) //Any route that start with "/inv" will be redirected to the inventoryRoute.js file
//app.get("/inv/error500", utilities.handleErrors(invController.buildByClassificationId)) 


//Enable Account route
app.use("/account", accountRoute) //Any route that starts with "/account", will be redirected to accountRoute.js file

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Please check the url or try again later.'})
})


/* *********************************************************************
* Express Error Handler
* Place after all other middleware
***********************************************************************/
// app.use is an Express function, which accepts the default Express arrow function to be used with errors.
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav() //build the navigation bar for the error view
  console.error(`Error at: "${req.originalUrl}": ${err.message}`) //a console statement to show the route and error that occurred; helpful to show what the client was doing when the error occurred.
  let errorContent = await utilities.buildErrorContent() //Import the error content image from utilities
  
  /*
  checks to see if the status code is 404. 
  If so, the default error message - "File Not Found" - is assigned to the "message" property. 
  If it is anything else, a generic message is used.
  */
  if(err.status == 404){
    //call the "error.ejs" view (you will build that next) in an "errors" folder.
    res.render("errors/error", {
      title: err.status + ' | Page not found!' || 'Server Error', //sets the value of the "title" for the view
      message: err.message, //sets the message to be displayed in the error view
      nav, //sets the navigation bar for use in the error view
      errorContent //sets the error content image
    })
  } else {
    err.status = 500
    message = 'Query aborted. Please contact your system administrator.'
    //call the "error.ejs" view (you will build that next) in an "errors" folder.
    res.render("errors/error", {
      title: err.status + ' | Internal server error!' || 'Server Error', //sets the value of the "title" for the view
      //message: message, //sets the message to be displayed in the error view
      nav, //sets the navigation bar for use in the error view
      errorContent //sets the error content image
    })
  }
  
  // //call the "error.ejs" view (you will build that next) in an "errors" folder.
  // res.render("errors/error", {
  //   title: err.status + ' | Page not found!' || 'Server Error', //sets the value of the "title" for the view
  //   //message: err.message, //sets the message to be displayed in the error view
  //   nav, //sets the navigation bar for use in the error view
  //   errorContent //sets the error content image
  // })
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
