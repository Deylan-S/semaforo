import { useState, useEffect, useRef } from "react";

export function useSistemaTrafico(tiempo = 6000) {
  const workers = useRef({}); // donde se van a guardar los web workers
  const [luces, setLuces] = useState({
    norte: "rojo",
    sur: "rojo",
    este: "rojo",
    oeste: "rojo",
  });

  const terminaronTurno = useRef({ ns: 0, eo: 0 });
  const grupoActivo = useRef("ns"); // par que tiene el turno

  useEffect(() => {
    // se crean 4 web workers en paralelo
    const direcciones = ["norte", "sur", "este", "oeste"];
    direcciones.forEach((dir) => {
      const w = new Worker("/WorkerTrafico.js");
      workers.current[dir] = w; // guarda el worker dentro de workers

      w.onmessage = ({ data }) => {
        if (data.type === "STATE_CHANGE") {
          // actuzaliza el estado
          setLuces((anterior) => ({ ...anterior, [dir]: data.color }));
        }
        if (data.type === "READY") {
          // cuenta cuántos del grupo están listos
          const grupo = ["norte", "sur"].includes(dir) ? "ns" : "eo";
          terminaronTurno.current[grupo]++;

          if (terminaronTurno.current[grupo] === 2) {
            // los dos terminaron entonces reincia el contador y cambia de turno
            terminaronTurno.current[grupo] = 0;
            grupoActivo.current = grupo === "ns" ? "eo" : "ns";
            direccionGrupo(grupoActivo.current);
          }
        }
      };

      w.postMessage({ type: "INIT", info: { direccion: dir, tiempo: tiempo } });
    });

    // arranca como el primer grupo
    direccionGrupo("ns");

    // elimina los workers
    return () => direcciones.forEach((d) => workers.current[d].terminate());
  }, []);

  // función para activar un grupo
  function direccionGrupo(group) {
    const par = group === "ns" ? ["norte", "sur"] : ["este", "oeste"];
    par.forEach((dir) => workers.current[dir]?.postMessage({ type: "GO" }));
  }

  return { lights: luces };
}
