import React from "react";

const styles = {
  container: {
    fontFamily: "sans-serif",
    padding: "16px",
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: "12px",
    maxWidth: "300px",
    margin: "20px auto",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    position: "fixed",
    top: "120px",
    left: "50px",
    width: "300px",
  },
  label: {
    fontSize: "0.9rem",
    color: "#aaa",
    textAlign: "center",
  },
  valueDisplay: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: "10px",
  },
};

export function Ciclo({ tiempo }) {
  return (
    <div style={styles.container}>
      <label style={styles.label}>Duración del ciclo:</label>

      <div style={styles.valueDisplay}>{tiempo / 1000} segundos</div>
    </div>
  );
}
