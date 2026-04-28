import React from "react";
import { styles } from "../styles/theme";
import Pagination from "../components/Pagination";

export default function ListPage({ cars, currentPage, totalPages, setCurrentPage, onEdit, onDelete }) {
  const safePage = Math.min(currentPage, totalPages);
  const paginatedCars = cars;

  return (
    <>
      <h1 style={styles.pageTitle}>All Cars</h1>
      {cars.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={{ fontSize: "18px", marginBottom: "8px" }}>
            No cars found
          </p>
          <p>Click "Add Car" to add your first vehicle.</p>
        </div>
      ) : (
        <div style={styles.card}>
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Company</th>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Value (SAR)</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Location</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCars.map((car) => (
                  <tr key={car.id}>
                    <td style={styles.td}>{car.id}</td>
                    <td style={{ ...styles.td, fontWeight: "600" }}>
                      {car.name}
                    </td>
                    <td style={styles.td}>{car.company}</td>
                    <td style={styles.td}>{car.category}</td>
                    <td style={styles.td}>{car.value.toLocaleString()}</td>
                    <td style={styles.td}>
                      <span style={styles.badge(car.status)}>{car.status}</span>
                    </td>
                    <td style={styles.td}>{car.location}</td>
                    <td style={styles.td}>
                      <button
                        style={styles.btnSecondary}
                        onClick={() => onEdit(car)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.btnDanger}
                        onClick={() => onDelete(car.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onChange={setCurrentPage}
          />
        </div>
      )}
    </>
  );
}
