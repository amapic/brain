import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { data } from "./data";
// const PATHS = data.economics[0].paths;
// console.log(data.economics[0].paths);
import { useThree } from "@react-three/fiber";

import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { gsap } from 'gsap';

function Tube({
  index,
  setPosition,
  curve,
  clicked,
  clickedCount,
  setClickedCount,
}) {
  const brainMat = useRef();
  const meshRef = useRef();
  const [clickedLocal, setClickedLocal] = useState(false);
  const [clickedPosition, setClickedPosition] = useState(0);

  const { viewport, scene, camera } = useThree();
  // console.log("curve", curve);
  const handleClick = (event) => {
    event.stopPropagation();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // const raycaster = new THREE.Raycaster();
    // raycaster.setFromCamera(mouse, camera);
    setClickedLocal(!clickedLocal);
    setClickedCount(clickedCount + 1);
    setClickedPosition(clickedCount + 1);
    // const intersects = raycaster.intersectObjects(scene.children);

    // let vec2 = mouse;
    // vec2=vec2.project(camera);
    // console.log("vec2", mouse);
    const curveLength = curve.points.length;
    setPosition(curve.points[Math.floor(curveLength / 2)]);

    // if (intersects.length > 0) {
    // const intersection = intersects[0].point;
    // vec2=intersection.project(camera);
    // let vec2 = intersection.project(camera);
    // vec2 = vec2.multiplyScalar(4);
    // const x = ((vec2.x + 1) / 2) * window.innerWidth;
    // const y = (-(vec2.y - 1) / 2) * window.innerHeight;
    // console.log("Intersection point:", vec2);
    // setPosition([vec2.x, vec2.y, 0]);
    // }
  };
  useFrame(({ clock, mouse }) => {
    brainMat.current.uniforms.time.value = clock.getElapsedTime();

    brainMat.current.uniforms.mouse.value = new THREE.Vector3(
      (mouse.x * viewport.width) / 2,
      (mouse.y * viewport.height) / 2,
      0
    );

    brainMat.current.uniforms.clicked.value = clicked;
    brainMat.current.uniforms.clickedLocal.value = clickedLocal;
    brainMat.current.uniforms.clickedCount.value = clickedCount;
    brainMat.current.uniforms.clickedPosition.value = clickedPosition;
    if (clicked && brainMat.current.uniforms.radius.value < 2) {
      brainMat.current.uniforms.radius.value += 0.002;
    }

    if (
      clicked &&
      brainMat.current.uniforms.radius.value < 20 &&
      brainMat.current.uniforms.radius.value > 2
    ) {
      brainMat.current.uniforms.radius.value = 100;
    }
  });

  const BrainMaterial = shaderMaterial(
    {
      time: 0,
      color: new THREE.Color(0.1, 0.3, 0.6),
      mouse: new THREE.Vector3(0, 0, 0),
      clicked: false,
      radius: 0.0,
      clickedLocal: false,
      clickedCount: 0,
      clickedPosition: 0,
    },
    // vertex shader
    /*glsl*/ `
        varying vec2 vUv;
        uniform float time;
        uniform vec3 mouse;
        varying float vProgress;
        varying float ddist;
        uniform float radius;
        void main() {
          vUv = uv;
          vProgress = smoothstep(-1.,1.,sin(vUv.x*8. + time*3.));
          ddist=0.;
          vec3 p = position;
          float maxDist = 0.05+radius;
          float dist = length(mouse - p);
          if(dist < maxDist){
            vec3 dir = normalize(mouse - p);
            dir*= (1.-dist/maxDist);
            p -= dir*0.03;
            ddist=dist;
          }
          
          // gl_Position = projectionMatrix * modelViewMatrix * position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
    // fragment shader
    /*glsl*/ `
        uniform float time;
        uniform vec3 color;
        uniform bool clicked;
        varying vec2 vUv;
        varying float vProgress;
        uniform vec3 mouse;
        varying float ddist;
        uniform float radius;
        uniform bool clickedLocal;
        uniform float clickedCount;
        uniform float clickedPosition;
        void main() {
          vec3 finalColor = mix(color, color*0.25, vProgress);
          float finalColorred = mix(0., 1., vProgress);

          // float hideCorners = smoothstep(0.,0.5,vUv.x) ;
          float hideCorners = smoothstep(1.,0.9,vUv.x) ;
          float hideCorners1 = smoothstep(0.,0.1,vUv.x) ;

          if (clickedLocal){
            finalColor=vec3(1.,0.,0.);
            if (clickedPosition==1.){
            finalColor=vec3(1.,0.,0.);
            }
            if (clickedPosition==2.){
              finalColor=vec3(0.,1.,0.);
            }
            if (clickedPosition==3.){
              finalColor=vec3(0.,0.,1.);
            }
            if (clickedPosition==4.){
              finalColor=vec3(1.,0.5,0.);
            }
            gl_FragColor.rgba = vec4(ddist*10.*finalColor,1.);
          }
          else{
            // finalColor=vec3(1.,1.,0.);
            gl_FragColor.rgba = vec4(ddist*10.*finalColor,1.);
          }
          // gl_FragColor.rgba = vec4(finalColor,hideCorners*hideCorners1);
        }
      `
  );

  // declaratively
  extend({ BrainMaterial });

  return (
    <>
      <mesh
        ref={meshRef}
        name={`tube${index}`}
        onClick={() => {
          handleClick(event);
         
        }}
        onPointerOver={(e) => {
          console.log("over");
          gsap.to(e.object.scale, {
            x: 1.05,
            y: 1.05,
            z: 1.05,
            duration: 1,
            ease: "power2.out"
          });
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          gsap.to(e.object.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 1 ,
            ease: "power2.inOut"
          });
          document.body.style.cursor = 'default';
        }}
      >
        <tubeGeometry args={[curve, 64, 0.001, 2, false]} />
        <brainMaterial
          ref={brainMat}
          side={THREE.DoubleSide}
          transparent={true}
          depthTest={false}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}

export function Tubes({
  setPosition,
  allthecurve,
  clicked,
  clickedCount,
  setClickedCount,
}) {
  // const allthecurvesShort=allthecurve.slice(0,10)
  return (
    <>
      {allthecurve.map((curve, index) => (
        <Tube
          index={index}
          setPosition={setPosition}
          curve={curve}
          key={index}
          clicked={clicked}
          clickedCount={clickedCount}
          setClickedCount={setClickedCount}
        />
      ))}
    </>
  );
}
