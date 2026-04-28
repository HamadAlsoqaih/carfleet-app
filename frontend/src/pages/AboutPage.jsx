import React from "react";
import { styles, theme } from "../styles/theme";
import { team } from "../data/team";

export default function AboutPage() {
  return (
    <>
      <h1 style={styles.pageTitle}>About</h1>
      <div style={styles.card}>
        <p style={{ marginBottom: "4px", fontSize: "15px" }}>
          <strong>CarFleet</strong> — Company Car Asset Management System
        </p>
        <p
          style={{
            color: theme.textLight,
            fontSize: "14px",
            marginBottom: "24px",
          }}
        >
          SE411 Project · Spring 2025-26
        </p>
        <h3
          style={{
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: theme.textLight,
            marginBottom: "16px",
          }}
        >
          Team Members
        </h3>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {team.map((m) => (
            <div key={m.id} style={styles.aboutCard}>
              <div style={styles.aboutAvatar}>{m.name.charAt(0)}</div>
              <div style={{ fontWeight: "600", fontSize: "15px" }}>
                {m.name}
              </div>
              <div
                style={{
                  color: theme.textLight,
                  fontSize: "13px",
                  marginTop: "4px",
                }}
              >
                ID: {m.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
