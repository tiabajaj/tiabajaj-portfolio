import * as THREE from "three";

export type SatelliteHandles = {
  group: THREE.Group;
  wireMat: THREE.MeshBasicMaterial;
  solidMat: THREE.MeshStandardMaterial;
  cellMat: THREE.MeshStandardMaterial;
  setSpin: (on: boolean) => void;
};

export type IntroHandles = {
  camera: THREE.PerspectiveCamera | null;
  starfield: THREE.Points | null;
  satellite: SatelliteHandles | null;
};

export function createIntroHandles(): IntroHandles {
  return {
    camera: null,
    starfield: null,
    satellite: null,
  };
}
