import { useState, useEffect, useRef } from "react";

const DIRECCIONES = ["norte", "sur", "este", "oeste"];

export function useSistemaTrafico(tiempo = 4000) {
  const workers = useRef({}); // donde se van a guardar los web workers
  const turno = useRef(0); // índice del semáforo que tiene permitido ponerse en verde en este momento

  // se inicializan todos en rojo
  const [luces, setLuces] = useState({
    norte: "red",
    sur: "red",
    este: "red",
    oeste: "red",
  });

  // crea la infraestructura de los workers
  useEffect(() => {
    DIRECCIONES.forEach((dir) => {
      const w = new Worker(`${import.meta.env.BASE_URL}WorkerTrafico.js`);
      workers.current[dir] = w;

      w.onmessage = ({ data }) => {
        if (data.type === "STATE_CHANGE") {
          setLuces((anterior) => ({ ...anterior, [dir]: data.color }));
        }
        if (data.type === "READY") {
          turno.current = (turno.current + 1) % 4;
          const siguiente = DIRECCIONES[turno.current];
          workers.current[siguiente]?.postMessage({ type: "GO" });
        }
      };

      w.postMessage({ type: "INIT", payload: { direccion: dir, tiempo } });
    });

    workers.current["norte"]?.postMessage({ type: "GO" });

    return () => DIRECCIONES.forEach((d) => workers.current[d].terminate());
  }, []);

  return { luces };
}
