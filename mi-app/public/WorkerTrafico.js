let corriendo = false;
let resolveGo;
let estado = { color: "red", direccion: null, tiempo: 4000 };

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const esperarPermiso = () =>
  new Promise((resolve) => {
    resolveGo = resolve;
  });

self.onmessage = ({ data }) => {
  if (data.type === "INIT") {
    estado = { ...estado, ...data.payload };
    if (!corriendo) {
      corriendo = true;
      ciclo();
    }
  }
  if (data.type === "GO") {
    resolveGo?.();
  }
  if (data.type === "SET_CYCLE") {
    estado.tiempo = data.payload.tiempo;
  }
};

async function ciclo() {
  while (true) {
    // espera la señal del controlador antes de cambiar
    await esperarPermiso();
    self.postMessage({ type: "STATE_CHANGE", color: "green" });
    await sleep(estado.tiempo);
    self.postMessage({ type: "STATE_CHANGE", color: "yellow" });
    await sleep(1500);
    self.postMessage({ type: "STATE_CHANGE", color: "red" });
    self.postMessage({ type: "READY" });
  }
}
