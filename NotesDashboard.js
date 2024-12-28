
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Subjects from "./Subjects";


const NotesDashboard = () => {
  const [notes, setNotes] = useState([]); // Store notes
  const [noteText, setNoteText] = useState(""); // Store new note text
  const [editingNoteId, setEditingNoteId] = useState(null); // Note being edited
  const [editText, setEditText] = useState(""); // Store edited text

  

  // Add a new note
  const handleAddNote = () => {
    if (noteText.trim() === "") return;

    const newNote = {
      id: Date.now(), // Unique ID
      text: noteText.trim(),
    };

    setNotes([...notes, newNote]);
    setNoteText(""); // Clear input
  };

  // Edit a note
  const handleEditNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setEditingNoteId(id);
    setEditText(noteToEdit.text);
  };

  // Save edited note
  const handleSaveEdit = () => {
    const updatedNotes = notes.map((note) =>
      note.id === editingNoteId ? { ...note, text: editText } : note
    );

    setNotes(updatedNotes);
    setEditingNoteId(null);
    setEditText("");
  };

  // Delete a note
  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="dashboard-container">
      <h1>User Notes Dashboard</h1>

      {/* Input area */}
      <div className="note-input-container">
        <input
          type="text"
          placeholder="Write your note here..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className="note-input"
        />
        <button onClick={handleAddNote} className="add-note-btn">
          Add Note
        </button>
        {/* <button><Link to={Subjects}>Subjects</Link></button> */}
      </div>

      {/* Notes list */}
      <div className="notes-list">
        {notes.length === 0 ? (
          <p>No notes yet. Start adding some!</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-item">
              {editingNoteId === note.id ? (
                <div className="edit-container">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={handleSaveEdit} className="save-btn">
                    Save
                  </button>

                </div>
              ) : (
                <>
                  <p>{note.text}</p>
                  <div className="action-buttons">
                    <button
                      onClick={() => handleEditNote(note.id)}
                      className="edit-note-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="delete-note-btn"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>





  );
};

export default NotesDashboard;

