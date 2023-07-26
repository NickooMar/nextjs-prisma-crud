import React, { useEffect } from "react";

async function loadNotes() {
  const baseURL = "http://localhost:3000/api/notes";
  const res = await fetch(`${baseURL}`);
  const notes = await res.json();
  return notes;
}

async function HomePage() {
  const notes = await loadNotes();

  return (
    <div>
      {notes.map((note) => (
        <div key={note.id}>
          <h1>{note.title}</h1>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
