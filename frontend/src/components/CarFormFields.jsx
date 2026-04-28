import React from "react";
import { styles } from "../styles/theme";
import { CATEGORIES, STATUSES } from "../constants";

export default function CarFormFields({ form, onChange, withPlaceholders = false }) {
  return (
    <div style={styles.formGrid}>
      <div>
        <label style={styles.label}>Car Name *</label>
        <input
          style={styles.input}
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder={withPlaceholders ? "e.g. Camry 2024" : undefined}
        />
      </div>
      <div>
        <label style={styles.label}>Company / Make *</label>
        <input
          style={styles.input}
          name="company"
          value={form.company}
          onChange={onChange}
          placeholder={withPlaceholders ? "e.g. Toyota" : undefined}
        />
      </div>
      <div>
        <label style={styles.label}>Category</label>
        <select
          style={styles.select}
          name="category"
          value={form.category}
          onChange={onChange}
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label style={styles.label}>Status</label>
        <select
          style={styles.select}
          name="status"
          value={form.status}
          onChange={onChange}
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label style={styles.label}>Purchase Date</label>
        <input
          style={styles.input}
          type="date"
          name="purchaseDate"
          value={form.purchaseDate}
          onChange={onChange}
        />
      </div>
      <div>
        <label style={styles.label}>Value (SAR)</label>
        <input
          style={styles.input}
          type="number"
          name="value"
          value={form.value}
          onChange={onChange}
          placeholder={withPlaceholders ? "e.g. 30000" : undefined}
        />
      </div>
      <div>
        <label style={styles.label}>Location</label>
        <input
          style={styles.input}
          name="location"
          value={form.location}
          onChange={onChange}
          placeholder={withPlaceholders ? "e.g. Riyadh HQ" : undefined}
        />
      </div>
      <div>
        <label style={styles.label}>Description</label>
        <input
          style={styles.input}
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder={withPlaceholders ? "Short description" : undefined}
        />
      </div>
    </div>
  );
}
