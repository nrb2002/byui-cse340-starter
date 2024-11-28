## Getting Started

This document is intended to get you started quickly in building a backend driven Node.js application complete with pages and content, backend logic and a PostgreSQL database for data storage.
## Prerequisites

The only prerequisite software required to have installed at this point is Git for version control and a code editor - we will use VS Code (VSC).

## Package Management

The foundation of the project development software is Node. While functional, Node depends on "packages" to add functionality to accomplish common tasks. This requires a package manager. Three common managers are NPM (Node Package Manager), YARN, and PNPM. While all do the same thing, they do it slightly differently. We will use PNPM for two reasons: 1) All packages are stored on your computer only once and then symlinks (system links) are created from the package to the project as needed, 2) performance is increased meaning that when the project builds, it does so faster.
You will need to either install or activate PNPM before using it. See https://pnpm.io/

## Install the Project Dependencies

1. Open the downloaded project folder (where this file is located) in VS Code (VSC).
2. Open the VSC terminal: Terminal > New Window.
3. Run the following command in the terminal:

    pnpm install

4. The first time it may take a few minutes, depending on the speed of your computer and the speed of your Internet connection. This command will instruct PNPM to read the package.json file and download and install the dependencies (packages) needed for the project. It will build a "node_modules" folder storing each dependency and its dependencies. It should also create a pnpm-lock.yaml file. This file should NEVER be altered by you. It is an internal file (think of it as an inventory) that PNPM uses to keep track of everything in the project.

## Start the Express Server

With the packages installed you're ready to run the initial test.
1. If the VSC terminal is still open use it. If it is closed, open it again using the same command as before.
2. Type the following command, then press Enter:

    pnpm run dev

3. If the command works, you should see the message "app listening on localhost:5500" in the console.
4. Open the package.json file.
5. Note the "Scripts" area? There is a line with the name of "dev", which tells the nodemon package to run the server.js file.
6. This is the command you just ran.
7. Open the server.js file.
8. Near the bottom you'll see two variables "Port" and "Host". The values for the variables are stored in the .env file.
9. These variables are used when the server starts on your local machine.

## Move the demo file

When you installed Git and cloned the remote repository in week 1, you should have created a simple web page.
1. Find and move that simple web page to the public folder. Be sure to note its name.
## Test in a browser

1. Go to http://localhost:5500 in a browser tab. Nothing should be visible as the server has not been setup to repond to that route.
2. Add "/filename.html" to the end of the URL (replacing filename with the name of the file you moved to the public folder).
3. You should see that page in the browser.

# The flow of the M-V-C for our application runs something like this, so far:

A client types or clicks a link containing the index route of our application.

That triggers a request to our server.js page.
The route is found in the page, which calls the function in the baseController file.
The controller calls the getNav function and awaits the result to be returned.
When the finished string is returned, it is stored in the nav variable.

The controller, then tells Express and EJS to send the index.ejs file back to the client, and send the nav string and title name-value pair along with it. These items will be used in the head.ejs and navigation.ejs partials.

The server builds the finished home page and sends it to the browser.

# How to create the relational database in pgAdmin and establish the connection to the render.com remote server.

# On render.com side

1. Open your render.com dashboard.
2. Click on the existing PostgreSQL project.
3. Click on the "+" sign and select "Create new service".
4. Select "New PostgreSQL".
5. Fill out the form accordingly.
6. Click on "Create Database".

# On pgAdmin side

7. Right-click on "Database > Create > Database".
8. In the "General" tab, copy and paste the database name from render.com, and then save.
9. Turn SSL option to "require".
10. Execute SQL queries to create and populate tables. 