//import express so it can be used by server.js
const express = require('express');

//require/import database
const noteDatabase = require('./db/db.json');

//import file system package for node.js
const fs = require('fs');
//import 'path' node.js package: resolves path of files on the server
const path = require('path');
const { stringify } = require('querystring');

//use 'app' to initialize and instance of express.js
const app = express ();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//select the port on which the express.js server will run
const PORT = 3001

//middleware for static files, points to public directory
app.use(express.static('public'));

//get index.html to display the landing page
app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  //TO DO: Retrieve notes page when link clicked from main page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
 
});

 //Retrieve/read notes in db.json following 'get' request, log error if error reading file
app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err){
        console.err('Error reading file', err);
        res.status(500).send('Error reading file');
        return;
      } 
      else{
        const notes =JSON.parse(data);
        res.json(notes);
      } 
    })
});

// TO DO: post request to write new note to database
app.post('/api/notes', (req, res) =>{
console.info(`${req.method} request received to save new note`);
//assign items in req.body using destructuring: got error from this?- commented out
//const {title, text} = req.body;
fs.readFile('./db/db.json', 'utf8', (err, data) => {
  if (err) {
    console.err('Error reading file', err);
        res.status(500).send('Error reading file');
        return;
  } else {
    
    //parse current note data into JS object
    const notesData =JSON.parse(data);
    
    //turn data into an array
    //const dataArray = notesData
   const request = req.body;
   console.log(request);
    //push/add object from post request's body to the array
    //does req.body pushed to array need to be in its own variable first?
    notesData.push(req.body);
  
    
    //stringify updatedNoteArray so that it can get written to the JSON file database
    let stringNotes = JSON.stringify(notesData);
    console.log(stringNotes);
    fs.writeFile('./db/db.json', stringNotes, 'utf8', err =>{
      if (err) {
        console.error(err);
      } else {
        console.info(`file written successfully`);
      }
    }); 
  }
});
});


// TO DO: get request for specific saved notes
// GET route for specific title
app.get('/api/notes/:title', (req, res) => {
  // make title lowercase
  const retrievedTitle = req.params.title.toLowerCase();

  // Iterate through the titles in database to check if title 'i' matches `req.params.title`
  for (let i = 0; i < noteDatabase.length; i++) {
    if (retrievedTitle === noteDatabase[i].title.toLowerCase()) {
      return res.json(noteDatabase[i]);
    }
  }

  // Return a message string is the title isn't found in the database
  return res.json('No matching title found');
});

// TO DO: connect functionality for starting a new note/clicking 'new note'
//BONUS TO DO: add delete route for requests to delete notes
  
  //set server to listen on port 3001 specified in const PORT, need to add "or" statement to use heroku port when deployed?
  app.listen(PORT, () =>
    console.log(`Server listening at http://localhost:${PORT}`)
  );



  