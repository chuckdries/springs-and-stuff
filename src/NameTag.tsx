import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Text3D, Center, PerspectiveCamera } from "@react-three/drei";

import fredokaone from "./assets/Fredoka One_Regular.json?url";
import januaryshine from "./assets/January Shine_Regular.json?url";

interface NameTagProps {
  name: string;
}

export function NameTag(props: NameTagProps) {
  return (
    <Canvas style={{ height: 360, width: 600 }}>
      <PerspectiveCamera makeDefault fov={25} position={[0, 0, 5]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <NameTag3D {...props} />
    </Canvas>
  );
}

function NameTag3D({ name }: NameTagProps) {
  const mesh = useRef(null);
  return (
    <group>
      {/* TAG */}
      <mesh ref={mesh}>
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
    </group>
  );
}
