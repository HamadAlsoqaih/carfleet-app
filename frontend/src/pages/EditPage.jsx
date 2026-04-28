import React from "react";
import { styles } from "../styles/theme";
import CarFormFields from "../components/CarFormFields";

export default function EditPage({ editingId, form, onChange, onUpdate, onCancel }) {
  return (
    <>
      <h1 style={styles.pageTitle}>Edit Car (ID: {editingId})</h1>
      <div style={styles.card}>
        <CarFormFields form={form} onChange={onChange} />
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button style={styles.btnPrimary} onClick={onUpdate}>
            Save Changes
          </button>
          <button style={styles.btnSecondary} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
