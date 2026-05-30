import React from "react";

const LUCES = ["red", "yellow", "green"];

const styles = {
  container: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "sans-serif",
    margin: "12px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "8px",
    textTransform: "capitalize",
  },
  cajaSemaforo: {
    backgroundColor: "#1a1a1a",
    padding: "10px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "fit-content",
  },
};

export function SemaforoIndividual({ direccion, color }) {
  const colorActivo = color?.toLowerCase();

  return (
    <div style={styles.container}>
      <span style={styles.label}>{direccion}</span>

      <div
        style={styles.cajaSemaforo}
        role="img"
        aria-label={`Semáforo para dirección ${direccion}. Luz actual: ${color}`}
      >
        {LUCES.map((luz) => {
          const estaEncendida = colorActivo === luz;

          return (
            <div
              key={luz}
              style={{
                width: 50,
                height: 50,
                borderRadius: "60%",
                backgroundColor: estaEncendida ? luz : "#333",
                opacity: estaEncendida ? 1 : 0.3,
                boxShadow: estaEncendida
                  ? `0 0 30px ${luz}`
                  : "inset 0 0 10px #000",
                transition: "all 0.3s ease",
              }}
              aria-hidden="true"
            />
          );
        })}
      </div>
    </div>
  );
}
