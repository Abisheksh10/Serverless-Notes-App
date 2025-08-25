

import React, { useState } from "react";

export default function NoteForm({ onAdd, disabled = false }) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const t = text.trim();
    if (!t || disabled) return;
    setSubmitting(true);
    try {
      await onAdd(t);
      setText("");
    } finally {
      setSubmitting(false);
    }
  }

  const isDisabled = disabled || submitting;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a note..."
        className="input"
        aria-label="Note text"
        disabled={isDisabled}
      />
      <button
        type="submit"
        disabled={isDisabled}
        className="btn-primary"
      >
        {submitting ? "Adding..." : "Add note"}
      </button>
    </form>
  );
}
