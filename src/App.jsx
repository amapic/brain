import { Canvas } from "@react-three/fiber";
import { OrbitControls, PointMaterial } from "@react-three/drei";
import { data } from "./data";
var PATHS = data.economics[0].paths;
import { useEffect } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial, Html, Float } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Tubes } from "./BrainTubes";
const randomRange = (min, max) => Math.random() * (max - min) + min;
let curves = [];
import PageGauche from "./pageGauche";
import Hud2 from "./Hud";
import FullPageContent from "./FullPageContent";
// curves
for (let i = 0; i < 100; i++) {
  let points = [];
  let length = randomRange(0.1, 1);
  // points
  for (let j = 0; j < 100; j++) {
    points.push(
      new THREE.Vector3().setFromSphericalCoords(
        0.1,
        Math.PI - (j / 100) * Math.PI * length,
        (i / 100) * Math.PI * 2
      )
    );
  }
  let tempcurve = new THREE.CatmullRomCurve3(points);
  curves.push(tempcurve);
}

let brainCurves = [];

PATHS.forEach((path) => {
  let points = [];
  for (let i = 0; i < path.length - 2; i += 3) {
    points.push(new THREE.Vector3(path[i], path[i + 1], path[i + 2]));
  }
  let tempcurve = new THREE.CatmullRomCurve3(points);
  brainCurves.push(tempcurve);
});

function BrainParticles({ allthecurves }) {
  let density = 50;
  let numberOfPoints = density * allthecurves.length;
  const myPoints = useRef([]);
  const brainGeo = useRef();
  let positions = useMemo(() => {
    let positions = [];
    for (let i = 0; i < numberOfPoints; i++) {
      positions.push(
        randomRange(-1, 1),
        randomRange(-1, 1),
        randomRange(-1, 1)
      );
    }
    return new Float32Array(positions);
  }, []);

  let randoms = useMemo(() => {
    let randoms = [];
    for (let i = 0; i < numberOfPoints; i++) {
      randoms.push(randomRange(0.3, 1));
    }
    return new Float32Array(randoms);
  }, []);

  useEffect(() => {
    for (let i = 0; i < allthecurves.length; i++) {
      for (let j = 0; j < density; j++) {
        myPoints.current.push({
          currentOffset: Math.random(),
          speed: 0.0005,
          curve: allthecurves[i],
          curPosition: Math.random(),
        });
      }
    }
  });

  useFrame(({ clock }) => {
    let curpositions = brainGeo.current.attributes.position.array;
    let aa = brainGeo.current.attributes.position.array;

    for (let i = 0; i < myPoints.current.length; i++) {
      myPoints.current[i].curPosition += myPoints.current[i].speed;
      myPoints.current[i].curPosition = myPoints.current[i].curPosition % 1;

      let curPoint = myPoints.current[i].curve.getPointAt(
        myPoints.current[i].curPosition
      );

      curpositions[i * 3] = curPoint.x;
      curpositions[i * 3 + 1] = curPoint.y;
      curpositions[i * 3 + 2] = curPoint.z;
    }

    brainGeo.current.attributes.position.needsUpdate = true;
  });

  const BrainParticleMaterial = shaderMaterial(
    { time: 0, positionx: 0 },
    // vertex shader
    /*glsl*/ `
      varying vec2 vUv;
      uniform float time;
      varying float vProgress;
      attribute float randoms;
      
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = randoms*2. * (1. / -mvPosition.z);
        // gl_PointSize = 10.;
      }
    `,
    // fragment shader
    /*glsl*/ `
    
      uniform float time;
      uniform float positionx;
      // float map(float value, float min1, float max1, float min2, float max2){
      //   return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
      // }
      void main() {
        // vec3 Rr=position;
        float disc = length(gl_PointCoord.xy - vec2(0.5));
        float opacity = 0.3*smoothstep(0.5,0.4,disc);
        gl_FragColor = vec4(vec3(opacity),1.);
      }
    `
  );

  // declaratively
  extend({ BrainParticleMaterial });

  return (
    <>
      <points>
        <bufferGeometry attach="geometry" ref={brainGeo}>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-randoms"
            count={randoms.length}
            array={randoms}
            itemSize={1}
          />
        </bufferGeometry>

        <brainParticleMaterial
          positionx={1}
          attach="material"
          depthTest={false}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

export default function App() {
  const [clicked, setClicked] = useState(false);
  const [position, setPosition] = useState([3, 3, 0]);
  const [clickedCount, setClickedCount] = useState(0);
  return (
    <div className="overflow-y-auto h-screen">
      <div
        className="flex w-full bg-black"
        style={{
          height: "80vh",
        }}
      >
        <PageGauche clickedCount={clickedCount} />
        <p
          className={`
          ${
            clicked && clickedCount < 1
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }
          fixed 
          max-w-40 
          top-8 
          right-8 
          text-gray-400 
          font-semibold 
          mb-2 
          z-50
          transition-all
          duration-500
          ease-in-out
          transform
        `}
        >
          Cliquer sur les réseaux du cerveau pour découvrir l'ADN de notre
          entreprise !
        </p>
        <div id="canvas-container" className="w-1/2">
          <Canvas
            draggable={false}
            onClick={() => {
              // setClicked(true);
            }}
            onPointerOver={() => {
              setClicked(true);
            }}
            camera={{
              position: [0.11, 0.045, 0.22],
              rotation: [-0.2, 0.45, 0.088],
              near: 0.001,
              far: 5,
            }}
          >
            <color attach="background" args={["black"]} />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Tubes
              setPosition={setPosition}
              allthecurve={brainCurves}
              clicked={clicked}
              clickedCount={clickedCount}
              setClickedCount={setClickedCount}
            />

            {/* <Hud2 clickedCount={clickedCount} /> */}
            {/* <BrainParticles allthecurves={brainCurves} /> */}
            <OrbitControls enablePan={false} enableRotate={true} />
            {/* <axesHelper /> */}
          </Canvas>
        </div>
      </div>
      <FullPageContent />
    </div>
  );
}

function LLine({ startPoint = [0, 0, 0], endPoint = [0.2, 0.2, -0.5] }) {
  const { viewport, scene, camera, size } = useThree();
  console.log(
    "startPoint",
    startPoint,
    new THREE.Vector3(...startPoint).project(camera)
  );
  const points = [
    new THREE.Vector3(...startPoint),
    new THREE.Vector3(...endPoint),
  ];

  // useFrame(() => {
  //   console.log("startPoint", startPoint, new THREE.Vector3(...startPoint).project(camera));
  // });
  const curve = new THREE.CatmullRomCurve3(points);

  return (
    <mesh>
      <tubeGeometry args={[curve, 20, 0.001, 8, false]} />{" "}
      {/* Le 0.02 contrôle l'épaisseur */}
      <meshBasicMaterial color="blue" />
    </mesh>
  );
}

function Ttext() {
  const meshRef = useRef();
  const htmlRef = useRef();
  const [cornerPos, setCornerPos] = useState([0, 0, 0]);

  useFrame(({ camera }) => {
    // console.log("camera", camera);
    meshRef.current.lookAt(camera.position);
    // meshRef.current.rotation.y = 0;
    if (meshRef.current && htmlRef.current) {
      const rect = htmlRef.current.getBoundingClientRect();
      const cornerPosition = new THREE.Vector3(
        -rect.width / 10,
        -rect.height / 10,
        0
      );

      const tempMatrix = new THREE.Matrix4();
      tempMatrix.copy(meshRef.current.matrixWorld);

      cornerPosition.multiplyScalar(0.1);
      cornerPosition.applyMatrix4(tempMatrix);

      setCornerPos([cornerPosition.x, cornerPosition.y, cornerPosition.z]);
    }
  });

  return (
    <>
      <Float speed={0.1}>
        <mesh ref={meshRef} scale={0.1} position={[0.2, 0.2, -0.5]}>
          <meshStandardMaterial color="white" />
          <Html
            ref={htmlRef}
            transform
            className="h-full w-full"
            style={{
              userSelect: "none",
              borderColor: "red",
              borderWidth: 1,
              borderStyle: "solid",
              height: "100%",
              width: "100%",
              color: "white",
              backgroundColor: "red",
            }}
          >
            <div style={{ padding: "10px" }}>
              AAAAA GGGG
              <br />
              gfgf
            </div>
          </Html>
        </mesh>
      </Float>

      <mesh position={cornerPos}>
        <sphereGeometry args={[0.1]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </>
  );
}
