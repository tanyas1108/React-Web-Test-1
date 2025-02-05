import React, { useState } from 'react';

const NoteList = ({ notes, onDeleteNote, onUpdateNote }) => {
  const [isEditing, setIsEditing] = useState(null); 
  const [editContent, setEditContent] = useState('');

  const handleEdit = (note) => {
    setIsEditing(note.id);
    setEditContent(note.content); 
  };

  const handleSaveEdit = (noteId) => {
    if (editContent.trim() !== '') {
      onUpdateNote(noteId, editContent); 
      setIsEditing(null);
      setEditContent(''); 
    }
  };

  return (
    <div className="note-list">
      <h2>All Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {isEditing === note.id ? (
              <div>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(note.id)}>Save</button>
              </div>
            ) : (
              <div>
                <p>{note.content}</p>
                <button onClick={() => onDeleteNote(note.id)}>Delete</button>
                <button onClick={() => handleEdit(note)}>Rewrite</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
