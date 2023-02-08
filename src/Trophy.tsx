/*
initially generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import {
  CameraControls,
  Center,
  GizmoViewport,
  PerspectiveCamera,
  Text3D,
  useGLTF,
} from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Canvas, useFrame } from "@react-three/fiber";

import trophyModel from "./assets/low_poly_trophy_m.glb?url";
import fredokaone from "./assets/Fredoka One_Regular.json?url";

interface TrophyProps {
  name: string;
}

export function Trophy(props: TrophyProps) {
  return (
    <Canvas style={{ height: 380, width: 600 }}>
      <PerspectiveCamera makeDefault fov={35} position={[0, 0, 15]} />
      {/* <GizmoViewport position={[1, 0, 1]} scale={1} />
      <CameraControls /> */}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Trophy3D {...props} />
    </Canvas>
  );
}

type GLTFResult = GLTF & {
  nodes: {
    trophy_M: THREE.Mesh;
    trophy_M001: THREE.Mesh;
  };
  materials: {};
};

function Trophy3D({name}: TrophyProps) {
  const group = useRef<THREE.Group>(null);
  const { nodes } = useGLTF(trophyModel) as GLTFResult;

  return (
    <group ref={group} scale={1.2} position={[0, -3.5, 0]} dispose={null}>
      {/* trophy */}
      <mesh
        geometry={nodes.trophy_M.geometry}
      >
        <meshStandardMaterial color="orange" />
      </mesh>
      {/* base */}
      <mesh
        geometry={nodes.trophy_M001.geometry}
      >
        <meshStandardMaterial color="#734014" />
      </mesh>
      <Center position={[0,.75,1.55]}>

      <Text3D rotation={[-0.1, 0, 0]} scale={0.4} font={fredokaone}>{name} <meshStandardMaterial color="white" /></Text3D>
      </Center>
    </group>
  );
}

useGLTF.preload(trophyModel);
