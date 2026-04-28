import React, { useState, useEffect, useCallback } from "react";
import { styles } from "./styles/theme";
import { emptyForm, ITEMS_PER_PAGE } from "./constants";
import { carsApi } from "./api";
import Navbar from "./components/Navbar";
import Message from "./components/Message";
import ListPage from "./pages/ListPage";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage";

function App() {
  const [cars, setCars] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState("list");
  const [form, setForm] = useState({ ...emptyForm });
  const [editingId, setEditingId] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchDone, setSearchDone] = useState(false);
  const [msg, setMsg] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const flash = (text, type = "success") => {
    setMsg({ text, type });
    setTimeout(() => setMsg(null), 3000);
  };

  const loadPage = useCallback(async (uiPage = currentPage) => {
    try {
      const data = await carsApi.list(uiPage - 1, ITEMS_PER_PAGE);
      const tp = Math.max(1, data.totalPages || 1);
      setTotalPages(tp);
      if (uiPage > tp) {
        setCurrentPage(tp);
        return;
      }
      setCars(data.content || []);
    } catch (err) {
      flash("Could not reach the server. Is the backend running on :8080?", "error");
    }
  }, [currentPage]);

  useEffect(() => { loadPage(currentPage); }, [currentPage, loadPage]);

  const resetSearch = () => {
    setSearchId("");
    setSearchResult(null);
    setSearchDone(false);
  };

  const navigate = (p) => {
    setPage(p);
    setMsg(null);
    setEditingId(null);
    setForm({ ...emptyForm });
    resetSearch();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const buildCarPayload = () => ({
    name: form.name,
    category: form.category,
    company: form.company,
    purchaseDate: form.purchaseDate || null,
    value: Number(form.value) || 0,
    status: form.status,
    location: form.location,
    description: form.description,
  });

  const handleAdd = async () => {
    if (!form.name || !form.company) {
      flash("Name and Company are required.", "error");
      return;
    }
    try {
      await carsApi.create(buildCarPayload());
      setForm({ ...emptyForm });
      flash("Car added successfully!");
      await loadPage(currentPage);
    } catch (err) {
      flash("Failed to add car.", "error");
    }
  };

  const startEdit = (car) => {
    setEditingId(car.id);
    setForm({ ...car, value: String(car.value ?? "") });
    setPage("edit");
    setMsg(null);
  };

  const handleUpdate = async () => {
    if (!form.name || !form.company) {
      flash("Name and Company are required.", "error");
      return;
    }
    try {
      await carsApi.update(editingId, buildCarPayload());
      setEditingId(null);
      setForm({ ...emptyForm });
      flash("Car updated successfully!");
      setPage("list");
      await loadPage(currentPage);
    } catch (err) {
      flash("Failed to update car.", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await carsApi.remove(id);
      flash("Car deleted.");
      if (searchResult && searchResult.id === id) {
        setSearchResult(null);
        setSearchDone(false);
      }
      await loadPage(currentPage);
    } catch (err) {
      flash("Failed to delete car.", "error");
    }
  };

  const handleSearch = async () => {
    const id = parseInt(searchId, 10);
    if (isNaN(id)) {
      flash("Please enter a valid numeric ID.", "error");
      return;
    }
    try {
      const found = await carsApi.getById(id);
      setSearchResult(found);
      setSearchDone(true);
      if (!found) flash("No car found with ID " + id, "error");
    } catch (err) {
      flash("Search failed.", "error");
    }
  };

  return (
    <div style={styles.app}>
      <Navbar page={page} onNavigate={navigate} />

      <div style={styles.container}>
        <Message message={msg} />

        {page === "list" && (
          <ListPage
            cars={cars}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            onEdit={startEdit}
            onDelete={handleDelete}
          />
        )}

        {page === "add" && (
          <AddPage form={form} onChange={handleChange} onAdd={handleAdd} />
        )}

        {page === "edit" && editingId && (
          <EditPage
            editingId={editingId}
            form={form}
            onChange={handleChange}
            onUpdate={handleUpdate}
            onCancel={() => navigate("list")}
          />
        )}

        {page === "search" && (
          <SearchPage
            searchId={searchId}
            setSearchId={(v) => {
              setSearchId(v);
              setSearchDone(false);
            }}
            searchResult={searchResult}
            searchDone={searchDone}
            resetSearch={resetSearch}
            onSearch={handleSearch}
            onEdit={startEdit}
            onDelete={handleDelete}
          />
        )}

        {page === "about" && <AboutPage />}
      </div>
    </div>
  );
}

export default App;
