import React from "react";
import { styles } from "../styles/theme";

const NAV_ITEMS = [
  ["list", "All Cars"],
  ["add", "Add Car"],
  ["search", "Search"],
  ["about", "About"],
];

export default function Navbar({ page, onNavigate }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <span role="img" aria-label="car">🚗</span>
        <span>
          CAR<span style={styles.logoAccent}>FLEET</span>
        </span>
      </div>
      <div style={styles.navLinks}>
        {NAV_ITEMS.map(([key, label]) => (
          <button
            key={key}
            style={styles.navLink(
              page === key || (page === "edit" && key === "list")
            )}
            onClick={() => onNavigate(key)}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
