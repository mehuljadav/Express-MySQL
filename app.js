const express = require('express');
const { getNotes, getNote, createNote, deleteNoteById } = require('./database.js');

const app = express();
app.use(express.json());

// Get all notes
app.get('/notes', async (req, res) => {
      const notes = await getNotes();
      res.send(notes);
});

// Get single note
app.get('/notes/:id', async (req, res) => {
      const id = req.params.id;
      const note = await getNote(id);
      res.send(note);
});

// Create new note
app.post('/notes', async (req, res) => {
      const { title, contents } = req.body;
      const note = await createNote(title, contents);
      res.status(201).send(note);
});

// Delete note by ID
app.delete('/notes/:id', async (req, res) => {
      const id = req.params.id;
      const note = await deleteNoteById(id);
      res.send(note);
});

// Global Error Handler
app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke');
});

//start Server
app.listen(1001, () => {
      console.log('Server is running on port: 1001');
});
