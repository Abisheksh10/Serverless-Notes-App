


import React from "react";
import NoteItem from "./NoteItem";

export default function NoteList({ notes, loading, onDelete }) {
  if (loading) {
    return (
      <div className="card p-4 text-slate-700">Loading notes...</div>
    );
  }

  if (!notes.length) {
    return (
      <div className="empty-state">
        <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-rose-500 opacity-90" />
        <p className="text-sm">
          No notes yet. Add your first note above!
        </p>
      </div>
    );
  }

  return (
    <ul className="grid gap-2">
      {notes.map((n) => (
        <NoteItem key={n.id} note={n} onDelete={onDelete} />
      ))}
    </ul>
  );
}

