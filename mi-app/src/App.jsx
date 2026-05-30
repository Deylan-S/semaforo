import { useState } from "react";
import { useSistemaTrafico } from "./hooks/useSistemaTrafico";
import { Interseccion } from "./components/Interseccion";
import { Ciclo } from "./components/Ciclo";

const styles = {
  title: {
    position: "absolute",
    top: "40px",
    left: "50px",
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#fff",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: "10px 20px",
    borderRadius: "10px",
    margin: 0,
    fontFamily: "'Segoe UI', 'Roboto', sans-serif",
  },
};

export default function App() {
  const [tiempo, setTiempo] = useState(4000);
  const { luces } = useSistemaTrafico(tiempo);

  return (
    <div>
      <h1 style={styles.title}>Sistema de semáforos</h1>
      <Interseccion luces={luces} />
      <Ciclo tiempo={tiempo} setTiempo={setTiempo} />
    </div>
  );
}
