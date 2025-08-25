import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth";
import { API_URL } from "../lib/env";

function buildUrl(path) {
  const base = (API_URL || "").replace(/\/+$/, "");
  return `${base}${path}`;
}

export async function authHeaders() {
  await getCurrentUser(); // ensure session
  const { tokens } = await fetchAuthSession();
  const idToken = tokens?.idToken?.toString() || "";

  return {
    "Content-Type": "application/json",
    // ✅ Bearer prefix required for JWT authorizer
    "Authorization": `Bearer ${idToken}`,
  };
}

async function handle(res) {
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!res.ok) {
    const msg = data?.error || res.statusText || "Request failed";
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export async function apiGet(path) {
  const res = await fetch(buildUrl(path), { headers: await authHeaders() });
  return handle(res);
}
export async function apiPost(path, body) {
  const res = await fetch(buildUrl(path), {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify(body || {}),
  });
  return handle(res);
}
export async function apiDelete(path) {
  const res = await fetch(buildUrl(path), {
    method: "DELETE",
    headers: await authHeaders(),
  });
  return handle(res);
}
