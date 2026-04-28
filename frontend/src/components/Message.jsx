import React from "react";
import { styles } from "../styles/theme";

export default function Message({ message }) {
  if (!message) return null;
  return <div style={styles.message(message.type)}>{message.text}</div>;
}
