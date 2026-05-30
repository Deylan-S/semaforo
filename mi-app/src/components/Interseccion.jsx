import { SemaforoIndividual } from "./SemaforoIndividual";

const posiciones = {
  norte: { left: 725, top: "20%" },
  sur: { left: 725, top: "100%" },
  este: { left: 950, top: "60%" },
  oeste: { left: 500, top: "60%" },
};

export function Interseccion({ luces }) {
  return (
    <div style={{ position: "relative", width: 400, height: 400 }}>
      {Object.entries(luces).map(([direccion, color]) => (
        <div
          key={direccion}
          style={{ position: "absolute", ...posiciones[direccion] }}
        >
          <SemaforoIndividual direccion={direccion} color={color} />
        </div>
      ))}
    </div>
  );
}
