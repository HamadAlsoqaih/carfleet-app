# CarFleet - Company Car Asset Management System

**SE411 Project · Spring 2025-26 · Parts 1 (Frontend) + 2 (Backend)**

## Team Members
| Name | Student ID |
|---|---|
| Hamad Alsoqaih | 221211442 |
| Faisal Alojaimi | 222110815 |
| Abdulaziz Aldhamri | 221211406 |

## Description
CarFleet is a full-stack application for managing company car assets. The frontend is a React single-page app; the backend is a Java Spring Boot REST server with an H2 in-memory database. Users can add, view, edit, delete, and search for cars by ID.

## Features
- **All Cars**: Paginated table (server-side pagination, 5 per page).
- **Add Car**: Persists a new car via `POST /api/cars`.
- **Edit Car**: Updates an existing car via `PUT /api/cars/{id}`.
- **Delete Car**: Removes a car via `DELETE /api/cars/{id}`.
- **Search by ID**: Looks up a car via `GET /api/cars/{id}`.
- **About Page**: Team member names and student IDs.

## Tech Stack

**Frontend** — React 18, native `fetch`, react-scripts 5, Vitest + React Testing Library, inline-style theme.

**Backend** — Java 21, Spring Boot 3.5 (`web`, `data-jpa`, `validation`), Hibernate, H2 in-memory database, Maven (via `mvnw` wrapper).

## REST API

Base URL: `http://localhost:8080`

| Method | Path | Purpose |
|---|---|---|
| `GET`    | `/api/cars?page=0&size=5` | List (paginated) |
| `GET`    | `/api/cars/{id}`          | Get by id |
| `POST`   | `/api/cars`               | Add |
| `PUT`    | `/api/cars/{id}`          | Update |
| `DELETE` | `/api/cars/{id}`          | Delete |

## How to Run

You need **two terminals**.

### Terminal 1 — backend
```bash
cd backend
./mvnw spring-boot:run
```
Backend runs at http://localhost:8080. H2 console at http://localhost:8080/h2-console (JDBC: `jdbc:h2:mem:carfleet`, user `sa`, no password).

### Terminal 2 — frontend
```bash
cd frontend
npm install   # first time only
npm start
```
Frontend opens at http://localhost:3000.

## How to Run Tests
```bash
# Frontend (mocks fetch — no backend needed)
cd frontend && npm test

# Backend
cd backend && ./mvnw test
```
Frontend has 19 tests covering Navigation, All Cars, Add Car, Edit Car, Delete Car, Search, and About Page.

## Documentation
See [DOCUMENTATION.md](DOCUMENTATION.md) for the full architecture, REST API reference, and project structure.

`CarFleet_Documentation.docx` is the original Part 1 architecture document.

## Project Structure
```
carfleet-app/
├── frontend/                     # React single-page app
│   ├── public/                   # HTML shell
│   ├── src/
│   │   ├── App.jsx               # Root component (state + API orchestration)
│   │   ├── api.js                # fetch wrapper for the Spring API
│   │   ├── components/           # Navbar, Message, Pagination, CarFormFields
│   │   ├── pages/                # ListPage, AddPage, EditPage, SearchPage, AboutPage
│   │   ├── data/team.js          # Team members
│   │   └── styles/theme.js       # Inline-style theme
│   ├── package.json
│   └── vitest.config.js
├── backend/                      # Spring Boot REST server
│   ├── pom.xml
│   ├── mvnw, mvnw.cmd
│   └── src/main/java/com/carfleet/backend/
│       ├── BackendApplication.java
│       ├── car/                  # Car entity, repository, controller, seeder
│       └── config/WebConfig.java # CORS for the React dev server
├── DOCUMENTATION.md
├── CarFleet_Documentation.docx
└── README.md
```
