

import React, { useEffect, useState } from "react";
import NoteForm from "../components/notes/NoteForm";
import NoteList from "../components/notes/NoteList";
import { getNotes, createNote, deleteNote } from "../services/notesApi";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    setLoading(true);
    try {
      const items = await getNotes();
      items.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
      setNotes(items);
    } catch (e) {
      setError(e.message || "Failed to load notes");
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function addNote(text) {
    setBusy(true);
    setError("");
    try {
      await createNote(text);
      await load();
    } catch (e) {
      setError(e.message || "Failed to add note");
    } finally {
      setBusy(false);
    }
  }

  async function removeNote(id) {
    setBusy(true);
    setError("");
    try {
      await deleteNote(id);
      setNotes(prev => prev.filter(n => n.id !== id));
    } catch (e) {
      setError(e.message || "Failed to delete note");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="space-y-4 sm:space-y-6">
      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700">
          {error}
        </div>
      ) : null}

      <div className="card card-hover p-4 sm:p-5">
        <h2 className="card-title mb-3">Add a note</h2>
        <NoteForm onAdd={addNote} disabled={busy} />
      </div>

      <NoteList notes={notes} loading={loading} onDelete={removeNote} />
    </section>
  );
}
