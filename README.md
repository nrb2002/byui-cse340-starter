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

# Create the App Server on render.com

In a browser go to Render.com and sign-in using your GitHub credentials.
In the dashboard, click the "New" button in the top-right corner.
From the option list, select "Web Service".
On the next screen, select your GitHub repository for the class, by clicking the "Connect" button on the same line as the repository name.
In the next screen add a unique name for the service - this is a label that will help you to distinguish this service from others. Keep it short and simple, but descriptive.
Select the region closest to you. This is where the service will be created. IMPORTANT! Make sure this region matches the region you selected when creating the database service, otherwise your site may fail to connect to your database.
The branch should be "main". Leave it.
Leave the "Root Directory" text box empty.
Change the "Environment" to "Node".
Change the "Build Command" to "pnpm install".
Change the "Start Command" as "pnpm start".
Leave the "Instance Type" as "Free".
Click the "Advanced" button to display additional settings.
Change the "Auto-Deploy" setting to "No". If left at "Yes", everytime you sync your local code to GitHub, the application will rebuild, which we don't want to do.
Scroll to the bottom of the page and click the "Create Web Service" button.
Here is an illustration of the settings discussed:
Screenshot of the render.com creating a new app server settings
The screen will change and will show that the service is being built. This can take a few minutes - watch for the "active" message.
Click the "Events" item on the left.
You should see a list of processes. The first one should read "First deploy started..." and have the date and time listed.
When the service is active you will see a new event listed at the top of the event list (the newest events are listed first), which should say "Deploy live for ..." and the date and time. If it says "Live", it means that the creation worked and your repository code is deployed to render.com.
Connect the Database Service
With the application created, the database server needs to be connected to it. Let's get this done next, if it is not already done.

Right-click the render "Dashboard" item at the top of the screen. Select "Open in New Tab".
In the new tab, click to open the Database server.
Scroll down to the "Connections" information.
Click the Internal Database URL "Copy to clipboard" button.
Switch back to the application server tab.
Click the "Environment" item on the left side of the screen.
Click the "Add Environment Variable" button.
Screenshot of creating a new environment variable setting
Click in the "Value" text box and paste the copied URL.
Click in the "Key" text box and type "DATABASE_URL". This name should be the same as exists in the .env file within VSC. But, the URL will be different, as the application server will use the internal address, not an external address.
Click the "Save Changes" button.
Add an Environment Variable
As long as you're here, let's add an environment variable that will help our application to distinguish between our computer, where we develop, and the server, which is our production environment.

Click the "Add Environment Variable" button.
In the "Key" input, type NODE_ENV.
In the "Value" input, type production.
Click the "Save Changes" button.
Add a Second Environment Variable
The render.com web service developed a glitch in the Fall of 2023, which defaulted to an old version of Node for some reason. To fix the glitch we can indicate what version we want our service to run, by adding it as an environment variable. That is what you will do now.

Check your version of Node
Launch VS Code on your computer
Open the built-in terminal
Type "node --version", press Enter
A line will appear showing your version number (e.g. v18.18.0)
Copy just the numeric portion (e.g. 18.18.0)
Add an Environment Variable
Login to your render.com dashboard.
Open your web service (Not the database service).
Click on the "Environment" option link on the left.
Click the "Add Environment Variable" button.
In the "Key" input, type NODE_VERSION.
In the "Value" input, type or paste the version number you copied as illustrated below:
Screenshot of creating a new environment variable setting
Click the "Save Changes" button.
Check it out
With the service created, your code deployed, and the database connected, it is time to see if everything is working.

In the Render.com Dashboard, at the top of the "Events" window, you should see the name you gave to your service. Beneath the name is a link to your application.
Screenshot of link to the deployed application in the render dashboard.
Click the link. A new tab should open. If everything is working, you should see the application home page.
If everything worked, fist bump the nearest person you can find! Well done.

If things did not work, then consult your learning team, the TA or the professor. But get help to make sure things work!

Tracking Use
As is, the application server is "active" and connected to the database server. The actual usage is very small. However, it is very important to keep track of your use. To do this is pretty easy and is the same for both services.

If you are at the Dashboard, click one of the services.
Once within one of the services, click the "Metrics" option, on the left.
Review the use totals. Make sure they are within the stated limits.
If, for whatever reason, you exceed the limits the service will stop, and you will be notified that you have exceeded the limit. The option is to take steps to remove materials if you have exceeded a storage limit, reduce use if an access or bandwidth limit, or move to a paid plan.

# How to recreate the relational database in pgAdmin and reconnect to the render.com remote server.

## On render.com side

1. Open your render.com dashboard.
2. Click on the existing PostgreSQL project.
3. Click on the "+" sign and select "Create new service".
4. Select "New PostgreSQL".
5. Fill out the form accordingly.
6. Click on "Create Database".
7. Go to the existing Web service and update the Database internal URL in the Environment section. This link can be found in database service - see "Connect" button and pick internal. 

## On pgAdmin side

8. Right-click on "Database > Create > Database".
9. In the "General" tab, copy and paste the database name from render.com, and then save.
10. Turn SSL option to "require".
11. Execute SQL queries to create and populate relevant tables. 