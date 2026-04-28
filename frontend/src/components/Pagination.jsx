import React from "react";
import { styles } from "../styles/theme";

export default function Pagination({ currentPage, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div style={styles.paginationBar}>
      <button
        style={styles.pageBtn(false)}
        onClick={() => onChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        ‹ Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          style={styles.pageBtn(n === currentPage)}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}
      <button
        style={styles.pageBtn(false)}
        onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next ›
      </button>
    </div>
  );
}
