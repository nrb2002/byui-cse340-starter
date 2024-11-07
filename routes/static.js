const express = require('express'); //The express package is brought into the scope of the file and assigned to a local variable.
const router = express.Router(); //The Express "router" functionality is invoked and stored into a local variable for use.

// Static Routes
// Set up "public" folder / subfolders for static files
router.use(express.static("public")); //Express router will "use" the "express.static" function, meaning this is where static resources will be found, with the public folder.
router.use("/css", express.static(__dirname + "public/css")); // Any route that contains /css is to refer to the public/css folder
router.use("/js", express.static(__dirname + "public/js")); //any route that contains /js is to refer to the public/js folder
router.use("/images", express.static(__dirname + "public/images")); //any route that contains /images is to refer to the public/images folder
//Export the router object with all of the use statements in other areas of the application
module.exports = router;



