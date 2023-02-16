/*
initially generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef, useState } from "react";
import {
  CameraControls,
  Center,
  GizmoViewport,
  PerspectiveCamera,
  Text3D,
  useGLTF,
} from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";

import trophyModel from "./assets/low_poly_trophy_m.glb?url";
import fredokaone from "./assets/Fredoka One_Regular.json?url";
import { useGesture } from "@use-gesture/react";

interface TrophyProps {
  name: string;
}

export function Trophy() {
  const [name, setName] = useState("Chuck");
  return (
    <div className="flex flex-col items-center">
      <label>
        <span className="mr-2">name:</span>
        <input
          maxLength={8}
          className="p-2 rounded text-black"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <Canvas style={{ height: 380, width: 600 }}>
        <PerspectiveCamera makeDefault fov={35} position={[0, 0, 15]} />
        {/* <GizmoViewport position={[1, 0, 1]} scale={1} />
        <CameraControls /> */}
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Trophy3D name={name} />
      </Canvas>
    </div>
  );
}

type GLTFResult = GLTF & {
  nodes: {
    trophy_M: THREE.Mesh;
    trophy_M001: THREE.Mesh;
  };
  materials: {};
};

function Trophy3D({ name }: TrophyProps) {
  const group = useRef<THREE.Group>(null);
  const { nodes } = useGLTF(trophyModel) as GLTFResult;

  const viewport = useThree(({ viewport }) => viewport);
  const size = useThree(({ size }) => size);
  const aspect = size.width / viewport.getCurrentViewport().width;

  const [rotateSpring, rotateSpringApi] = useSpring(() => ({
    rotation: 0,
  }));

  const bind = useGesture({
    onDrag: ({ down, movement: [mx] }) => {
      if (down) {
        rotateSpringApi.set({
          rotation: (mx / 2) / aspect
        })
      } else {
        rotateSpringApi.start({
          rotation: 0
        })
      }
    }
  })

  return (
    <animated.group
      {...bind()}
      // @ts-ignore
      rotation={rotateSpring.rotation.to((val) => [0, val, 0])}
      ref={group}
      scale={1.2}
      position={[0, -3.5, 0]}
      dispose={null}
    >
      {/* trophy */}
      <mesh geometry={nodes.trophy_M.geometry}>
        <meshStandardMaterial color="orange" />
      </mesh>
      {/* base */}
      <mesh geometry={nodes.trophy_M001.geometry}>
        <meshStandardMaterial color="#734014" />
      </mesh>
      <Center position={[0, 0.75, 1.55]}>
        <Text3D rotation={[-0.1, 0, 0]} scale={0.4} font={fredokaone}>
          {name} <meshStandardMaterial color="white" />
        </Text3D>
      </Center>
    </animated.group>
  );
}

useGLTF.preload(trophyModel);
