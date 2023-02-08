import { Canvas, useThree } from "@react-three/fiber";
import {
  Text3D,
  Center,
  PerspectiveCamera,
  CameraControls,
  GizmoViewport,
} from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { useGesture } from "@use-gesture/react";

import fredokaone from "./assets/Fredoka One_Regular.json?url";
import januaryshine from "./assets/January Shine_Regular.json?url";

interface NameTagProps {
  name: string;
}

export function NameTag(props: NameTagProps) {
  return (
    <Canvas style={{ height: 360, width: 600 }}>
      {/* <CameraControls /> */}
      <PerspectiveCamera makeDefault fov={25} position={[0, 0, 5]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <NameTag3D {...props} />
    </Canvas>
  );
}

function NameTag3D({ name }: NameTagProps) {
  const viewport = useThree(({ viewport }) => viewport);
  const size = useThree(({ size }) => size);
  const aspect = size.width / viewport.getCurrentViewport().width;

  const [rotateSpring, rotateSpringApi] = useSpring(() => ({
    rotation: [0, 0],
    config: {
      mass: 1,
      tension: 200,
      friction: 20,
    },
  }));

  const bind = useGesture({
    onDrag: ({ down, movement: [mx, my] }) => {
      if (down) {
        rotateSpringApi.set({
          rotation: [(my * 1.5) / aspect, (mx * 1.5) / aspect],
        });
      } else {
        rotateSpringApi.start({
          rotation: [0, 0],
        });
      }
    },
  });

  return (
    <animated.group
      // @ts-ignore
      rotation={rotateSpring.rotation.to((x, y) => [x, y, 0])}
    >
      {/* <GizmoViewport position={[0,0,.3]} scale={0.2} /> */}
      {/* TAG */}
      {/* @ts-expect-error shrug */}
      <mesh {...bind()}>
        <boxBufferGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh position={[0, 0, -0.1]}>
        <boxBufferGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* WHITE STRIPE */}
      <mesh position={[0, -0.45, 0]}>
        <boxBufferGeometry args={[2.999, 0.9, 0.14]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* HELLO MY NAME IS TEXT */}
      <group position={[0, 0.65, 0]}>
        <Center>
          <Text3D font={fredokaone} size={0.5}>
            HELLO
            <meshStandardMaterial color="white" />
          </Text3D>
        </Center>
        <Center position={[0, -0.45, 0]}>
          <Text3D font={fredokaone} size={0.2} position={[0, -0.3, 0]}>
            MY NAME IS
            <meshStandardMaterial color="white" />
          </Text3D>
        </Center>
      </group>
      {/* NAME */}
      <group position={[0, -0.45, 0]}>
        <Center>
          <Text3D font={januaryshine} size={0.7} position={[0, 0, 0]}>
            {name}
            <meshStandardMaterial color="black" />
          </Text3D>
        </Center>
      </group>
    </animated.group>
  );
}
