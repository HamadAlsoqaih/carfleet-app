import React from "react";
import { styles, theme } from "../styles/theme";

export default function SearchPage({
  searchId,
  setSearchId,
  searchResult,
  searchDone,
  resetSearch,
  onSearch,
  onEdit,
  onDelete,
}) {
  const handleDelete = () => {
    onDelete(searchResult.id);
    resetSearch();
  };

  return (
    <>
      <h1 style={styles.pageTitle}>Search Car by ID</h1>
      <div style={styles.card}>
        <div style={styles.searchBox}>
          <input
            style={{ ...styles.input, maxWidth: "200px" }}
            type="number"
            placeholder="Enter car ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
          <button style={styles.btnPrimary} onClick={onSearch}>
            Search
          </button>
        </div>

        {searchDone && searchResult && (
          <div
            style={{
              borderTop: `1px solid ${theme.border}`,
              paddingTop: "16px",
            }}
          >
            <table style={styles.table}>
              <tbody>
                {[
                  ["ID", searchResult.id],
                  ["Name", searchResult.name],
                  ["Company", searchResult.company],
                  ["Category", searchResult.category],
                  ["Purchase Date", searchResult.purchaseDate],
                  ["Value (SAR)", searchResult.value.toLocaleString()],
                  ["Status", searchResult.status],
                  ["Location", searchResult.location],
                  ["Description", searchResult.description],
                ].map(([label, val]) => (
                  <tr key={label}>
                    <td
                      style={{
                        ...styles.td,
                        fontWeight: "600",
                        width: "160px",
                      }}
                    >
                      {label}
                    </td>
                    <td style={styles.td}>
                      {label === "Status" ? (
                        <span style={styles.badge(val)}>{val}</span>
                      ) : (
                        val
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: "16px" }}>
              <button
                style={styles.btnSecondary}
                onClick={() => onEdit(searchResult)}
              >
                Edit
              </button>
              <button style={styles.btnDanger} onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        )}

        {searchDone && !searchResult && (
          <div style={styles.emptyState}>No car found with that ID.</div>
        )}
      </div>
    </>
  );
}
