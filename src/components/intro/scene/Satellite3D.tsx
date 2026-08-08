"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { SatelliteHandles } from "../introTypes";

const PANEL_CELL_X = [-0.28, -0.09, 0.1, 0.29];

export function Satellite3D({ register }: { register: (h: SatelliteHandles) => void }) {
  const group = useRef<THREE.Group>(null);
  const spinEnabled = useRef(false);

  const bodyGeo = useMemo(() => new THREE.BoxGeometry(0.5, 0.4, 0.5), []);
  // Panels face the camera: wide in X/Y, thin in Z.
  const panelGeo = useMemo(() => new THREE.BoxGeometry(0.85, 0.34, 0.015), []);
  const cellGeo = useMemo(() => new THREE.BoxGeometry(0.012, 0.3, 0.02), []);
  const strutGeo = useMemo(() => new THREE.BoxGeometry(0.16, 0.03, 0.03), []);
  const mastGeo = useMemo(() => new THREE.CylinderGeometry(0.012, 0.012, 0.42, 8), []);
  const dishGeo = useMemo(() => new THREE.SphereGeometry(0.05, 16, 16), []);

  const wireMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#e3ad66", wireframe: true, transparent: true, opacity: 0 }),
    []
  );
  const solidMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d8b98a",
        metalness: 0.25,
        roughness: 0.45,
        transparent: true,
        opacity: 0,
      }),
    []
  );
  const cellMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#2a2117",
        metalness: 0.1,
        roughness: 0.6,
        transparent: true,
        opacity: 0,
      }),
    []
  );

  useEffect(() => {
    if (!group.current) return;
    register({
      group: group.current,
      wireMat,
      solidMat,
      cellMat,
      setSpin: (on: boolean) => {
        spinEnabled.current = on;
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, delta) => {
    if (!group.current || !spinEnabled.current) return;
    group.current.rotation.y += delta * 0.14;
    group.current.rotation.x = -0.12 + Math.sin(performance.now() * 0.00009) * 0.05;
  });

  return (
    <group ref={group} scale={0} position={[0, -0.02, 0]} rotation={[-0.12, 0.32, 0]}>
      <mesh geometry={bodyGeo} material={wireMat} />
      <mesh geometry={bodyGeo} material={solidMat} />

      <mesh position={[-0.33, 0, 0]} geometry={strutGeo} material={wireMat} />
      <mesh position={[-0.33, 0, 0]} geometry={strutGeo} material={solidMat} />
      <mesh position={[0.33, 0, 0]} geometry={strutGeo} material={wireMat} />
      <mesh position={[0.33, 0, 0]} geometry={strutGeo} material={solidMat} />

      {[-0.78, 0.78].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh geometry={panelGeo} material={wireMat} />
          <mesh geometry={panelGeo} material={solidMat} />
          {PANEL_CELL_X.map((cx) => (
            <mesh key={cx} position={[cx, 0, 0.013]} geometry={cellGeo} material={cellMat} />
          ))}
        </group>
      ))}

      <mesh position={[0, 0.41, 0]} geometry={mastGeo} material={wireMat} />
      <mesh position={[0, 0.41, 0]} geometry={mastGeo} material={solidMat} />
      <mesh position={[0, 0.63, 0]} geometry={dishGeo} material={wireMat} />
      <mesh position={[0, 0.63, 0]} geometry={dishGeo} material={solidMat} />
    </group>
  );
}
