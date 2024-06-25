import { View } from "react-native";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState, Suspense, useLayoutEffect } from "react";
import useControls from "r3f-native-orbitcontrols";
import { PerspectiveCamera } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { TextureLoader } from "expo-three";
// function Torus(props) {
//   const [active, setActive] = useState(false);
//   const mesh = useRef();
//   useFrame((state, delta) => {
//     if (active) {
//       mesh.current.rotation.x += delta;
//       mesh.current.rotation.y += delta;
//     }
//   });

//   return (
//     <mesh {...props} ref={mesh} onClick={(event) => setActive(!active)}>
//       <torusGeometry args={[1, 0.4, 16, 100]} />
//       <meshStandardMaterial
//         color={active ? "orange" : "green"}
//         metalness={0.7}
//         roughness={0.2}
//       />
//     </mesh>
//   );
// }

function Ball() {
  const [base, normal, rough] = useLoader(TextureLoader, [
    require("./assets/ball/basket/ball_ball_BaseColor.png"),
    require("./assets/ball/basket/ball_ball_Normal.png"),
    require("./assets/ball/basket/ball_ball_Roughness.png"),
  ]);

  const material = useLoader(MTLLoader, require("./assets/ball/basket.mtl"));

  const obj = useLoader(
    OBJLoader,
    require("./assets/ball/basket.obj"),
    (loader) => {
      material.preload();
      loader.setMaterials(material);
    }
  );

  const mesh = useRef();

  useLayoutEffect(() => {
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.map = base;
        child.material.normalMap = normal;
        child.material.roughnessMap = rough;
      }
    });
  }, [obj]);

  return (
    <mesh ref={mesh} rotation={[0, 0, 0]}>
      <primitive object={obj} scale={10} />
    </mesh>
  );
}

export default function App() {
  const [OrbitControls, events] = useControls();
  const camera = new PerspectiveCamera();

  return (
    <View style={{ flex: 1 }} {...events}>
      <Canvas camera={camera}>
        <OrbitControls minZoom={1} maxZoom={15} enablePan={false} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* <Torus /> */}
        <Suspense fallback={null}>
          <Ball />
        </Suspense>
      </Canvas>
    </View>
  );
}
