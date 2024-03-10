//import express so it can be used by server.js
const express = require('express');
//import 'path' node.js package: resolves path of files on the server
const path = require('path');

//use 'app' to initialize and instance of express.js
const app = express ();

//select the port on which the express.js server will run
const PORT = 3001

//middleware for static files, points to public directory
app.use(express.static('public'));

//get index.html to display the landing page
app.get('/', (request, response) => {

    response.sendFile(path.join(__dirname, 'public/index.html'));
  });
  
  //set server to listen on port 3001 specified in const PORT
  app.listen(PORT, () =>
    console.log(`Server listening at http://localhost:${PORT}`)
  );

//TO DO: Retrieve notes page when link clicked from main page
// TO DO: connect note button functionality
// TO DO: post request to write new note to data base
// TO DO: get request for saved notes and render new note button at same time
// TO DO: connect functionality for starting a new note/clicking 'new note'
//BONUS TO DO: adde delete route for requests to delete notes
  