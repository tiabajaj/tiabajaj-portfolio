"use client";

import { useEffect, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Starfield } from "./Starfield";
import { Satellite3D } from "./Satellite3D";
import type { IntroHandles } from "../introTypes";

function CameraGrabber({ handles }: { handles: MutableRefObject<IntroHandles> }) {
  const { camera } = useThree();
  useEffect(() => {
    handles.current.camera = camera as THREE.PerspectiveCamera;
  }, [camera, handles]);
  return null;
}

// Very subtle pointer-follow parallax once the scene has settled — a small,
// premium touch rather than a driving animation.
function PointerRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 0.12 - camera.position.x) * 0.02;
    camera.position.y += (pointer.y * 0.08 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function IntroSceneRoot({ handles }: { handles: MutableRefObject<IntroHandles> }) {
  return (
    <Canvas camera={{ position: [0, 0, 4.8], fov: 38 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.75]}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[2.5, 2.5, 3]} intensity={1.1} color="#f2ede3" />
      <directionalLight position={[-2, -1, -2]} intensity={0.35} color="#6f93ad" />
      <CameraGrabber handles={handles} />
      <PointerRig />
      <Starfield register={(o) => (handles.current.starfield = o)} />
      <Satellite3D register={(h) => (handles.current.satellite = h)} />
    </Canvas>
  );
}
