import React from "react";

export default function NoteItem({ note, onDelete }) {
  return (
    <li className="group card card-hover flex items-center justify-between p-3">
      <div className="flex items-start gap-3">
        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500" />
        <div>
          <p className="text-slate-800">{note.text}</p>
          {note.createdAt ? (
            <p className="mt-1 text-xs text-slate-500">
              {new Date(note.createdAt).toLocaleString()}
            </p>
          ) : null}
        </div>
      </div>
      <button
        onClick={() => onDelete(note.id)}
        className="btn-danger opacity-90 group-hover:opacity-100"
        aria-label={`Delete note: ${note.text}`}
        title="Delete"
      >
        Delete
      </button>
    </li>
  );
}
