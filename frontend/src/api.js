const API_BASE = "http://localhost:8080/api";

async function handle(res) {
  if (res.status === 404) return null;
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const carsApi = {
  list: (page = 0, size = 5) =>
    fetch(`${API_BASE}/cars?page=${page}&size=${size}`).then(handle),

  getById: (id) =>
    fetch(`${API_BASE}/cars/${id}`).then(handle),

  create: (car) =>
    fetch(`${API_BASE}/cars`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    }).then(handle),

  update: (id, car) =>
    fetch(`${API_BASE}/cars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car),
    }).then(handle),

  remove: (id) =>
    fetch(`${API_BASE}/cars/${id}`, { method: "DELETE" }).then(handle),
};
