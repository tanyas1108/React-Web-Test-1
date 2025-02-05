import React, { useState } from 'react';
import NoteInput from './components/NoteInput';
import NoteList from './components/NoteList';

const App = () => {
  const [notes, setNotes] = useState([]);

  const addNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };


  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  
  const updateNote = (id, newContent) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, content: newContent } : note
      )
    );
  };

  return (
    <div className="app">
      <h1>Note Taking App</h1>
      <NoteInput onAddNote={addNote} />
      <NoteList
        notes={notes}
        onDeleteNote={deleteNote}
        onUpdateNote={updateNote}
      />
    </div>
  );
};

export default App;
