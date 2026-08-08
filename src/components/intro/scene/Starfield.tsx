"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function makeStars(count: number, spread: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread - spread * 0.2;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return geo;
}

// A single calm, sparse layer — ambient backdrop only, not a "flying through
// space" journey. Kept deliberately quiet so the satellite stays the focus.
export function Starfield({ register }: { register: (o: THREE.Points) => void }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => makeStars(180, 30), []);

  useEffect(() => {
    if (ref.current) register(ref.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#e8e2d6" size={0.035} transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  );
}
