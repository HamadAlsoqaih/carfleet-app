import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';

const seedCars = () => [
  { id: 1, name: 'Camry 2023',  category: 'Sedan',  company: 'Toyota',  purchaseDate: '2023-03-15', value: 28000, status: 'Active',            location: 'Riyadh HQ',     description: 'Company sedan for executive transport' },
  { id: 2, name: 'Hilux 2022',  category: 'Pickup', company: 'Toyota',  purchaseDate: '2022-07-20', value: 35000, status: 'Active',            location: 'Jeddah Branch', description: 'Utility pickup for fieldwork' },
  { id: 3, name: 'Patrol 2024', category: 'SUV',    company: 'Nissan',  purchaseDate: '2024-01-10', value: 62000, status: 'Active',            location: 'Riyadh HQ',     description: 'VIP transport vehicle' },
  { id: 4, name: 'Accent 2021', category: 'Sedan',  company: 'Hyundai', purchaseDate: '2021-11-05', value: 15000, status: 'Under Maintenance', location: 'Dammam Branch', description: 'Staff commuting vehicle' },
];

let store;
let nextId;

const json = (body, status = 200) =>
  Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    statusText: '',
    json: () => Promise.resolve(body),
    text: () => Promise.resolve(JSON.stringify(body)),
  });

const noBody = (status = 204) =>
  Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    statusText: '',
    json: () => Promise.resolve(null),
    text: () => Promise.resolve(''),
  });

const fetchMock = (url, opts = {}) => {
  const u = new URL(url);
  const path = u.pathname;
  const method = (opts.method || 'GET').toUpperCase();

  if (path === '/api/cars' && method === 'GET') {
    const page = parseInt(u.searchParams.get('page') || '0', 10);
    const size = parseInt(u.searchParams.get('size') || '5', 10);
    const start = page * size;
    const content = store.slice(start, start + size);
    return json({
      content,
      totalElements: store.length,
      totalPages: Math.max(1, Math.ceil(store.length / size)),
      number: page,
      size,
    });
  }

  if (path === '/api/cars' && method === 'POST') {
    const body = JSON.parse(opts.body);
    const created = { ...body, id: nextId++ };
    store.push(created);
    return json(created, 201);
  }

  const idMatch = path.match(/^\/api\/cars\/(\d+)$/);
  if (idMatch) {
    const id = parseInt(idMatch[1], 10);
    const idx = store.findIndex((c) => c.id === id);
    if (method === 'GET') {
      if (idx === -1) return json(null, 404);
      return json(store[idx]);
    }
    if (method === 'PUT') {
      if (idx === -1) return json(null, 404);
      const body = JSON.parse(opts.body);
      store[idx] = { ...body, id };
      return json(store[idx]);
    }
    if (method === 'DELETE') {
      if (idx === -1) return noBody(404);
      store.splice(idx, 1);
      return noBody(204);
    }
  }

  return json({ error: 'unhandled in mock', path, method }, 500);
};

beforeEach(() => {
  store = seedCars();
  nextId = store.length + 1;
  vi.stubGlobal('fetch', vi.fn(fetchMock));
});
