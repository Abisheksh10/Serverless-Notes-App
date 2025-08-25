import { apiGet, apiPost, apiDelete } from "./apiClient";

export async function getNotes() {
  // Expected backend response: { items: [{ noteId, text, createdAt }]}
  const data = await apiGet("/notes");
  return (data.items || []).map(n => ({
    id: n.noteId,
    text: n.text,
    createdAt: n.createdAt,
  }));
}

export async function createNote(text) {
  return apiPost("/notes", { text });
}

export async function deleteNote(id) {
  return apiDelete(`/notes/${id}`);
}
