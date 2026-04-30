const API_BASE_URL = "http://localhost:3000";

export async function helloWorld() {
  const res = await fetch(`${API_BASE_URL}/`);

  if (!res.ok) {
    throw new Error("Hello world failure");
  }

  return res.json();
}
