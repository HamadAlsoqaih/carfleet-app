import React from "react";
import { styles } from "../styles/theme";
import CarFormFields from "../components/CarFormFields";

export default function AddPage({ form, onChange, onAdd }) {
  return (
    <>
      <h1 style={styles.pageTitle}>Add New Car</h1>
      <div style={styles.card}>
        <CarFormFields form={form} onChange={onChange} withPlaceholders />
        <div style={{ marginTop: "20px" }}>
          <button style={styles.btnPrimary} onClick={onAdd}>
            + Add Car
          </button>
        </div>
      </div>
    </>
  );
}
