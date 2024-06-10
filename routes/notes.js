const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');


// GET Route for retrieveing all the notes
notes.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(400).json({ error: 'Failed to read the notes' });
    } else {
      // Convert to string into JSON object 
      const parseNote = JSON.parse(data);
      res.status(201).json(parseNote);
    };
  }
)});

// GET Route for a specific tip
notes.get('/:id', (req, res) => {
  const noteId = req.params.id;
  console.log(noteId);
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(400).json({ error: "Can't read file" });
    } else {
      // Convert to String into JSON object
      let note = JSON.parse(data);
      // find the note by it's id
      note = note.find((note) => note.id === noteId);
      
      if (!note) {
        return res.status(400).json({ error: 'Note not found' });
      } else {
        res.status(201).json(note);
      }  
    }});
});

// DELETE Route for a specific note
notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(400).json({ error: 'Failed to read the notes' });
    } else {
      // Convert to string into JSON objects
      let notes = JSON.parse(data);
      // Creates new notes without the selected note to delete
      notes = notes.filter((note) => note.id !== noteId);
      // Update notes
      fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2), (writeErr) => {
        if (writeErr){
          console.log(writeErr)
        } else {
          console.info('Successfully updated notes')
          res.status(200).json(notes)
        }
    
        });
    };
})});

// POST route for a new note
notes.post('/', (req, res) =>{
  // Destructuring the note in req.body
  const { title, text } = req.body;
  // If all the required properties are present
  if (title && text) {
    const newNote = {
      title, 
      text,
      id: uuidv4()
    };
    
    // Read the file  to get the notes
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf-8', (err, data) => {
      if (err) {
        console.error(err)
      } else {
        const notes = JSON.parse(data);
        // Push the new note in the notes
        notes.push(newNote);
        //Update notes
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2), (writeErr) => {
          writeErr
            ? console.log(writeErr)
            : console.info('Successfully updated notes')
        });
      }
    }
  )
    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});


module.exports = notes;