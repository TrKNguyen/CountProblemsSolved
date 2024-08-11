"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import { TextureLoader } from "three";
import { motion } from "framer-motion-3d";
import * as THREE from "three";
import { memo } from "react";

const uniforms = {
  color1: { value: new THREE.Color("#0088ff") },
  color2: { value: new THREE.Color("#000000") },
  fresnelBias: { value: 0.1 },
  fresnelScale: { value: 1.0 },
  fresnelPower: { value: 4.0 },
};
const vs = `
uniform float fresnelBias;
uniform float fresnelScale;
uniform float fresnelPower;

varying float vReflectionFactor;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );

  vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );

  vec3 I = worldPosition.xyz - cameraPosition;

  vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), fresnelPower );

  gl_Position = projectionMatrix * mvPosition;
}
`;
const fs = `
uniform vec3 color1;
uniform vec3 color2;

varying float vReflectionFactor;

void main() {
  float f = clamp( vReflectionFactor, 0.0, 1.0 );
  gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
}
`;

function Earth() {
  const scene = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scene,
    offset: ["start end", "end start"],
  });

  const [color, specularMap, bumpMap, light, cloud, cloudAlpha] = useLoader(
    TextureLoader,
    [
      "/00_earthmap1k.jpg",
      "/02_earthspec1k.jpg",
      "/01_earthbump1k.jpg",
      "/03_earthlights1k.jpg",
      "/04_earthcloudmap.jpg",
      "/05_earthcloudmaptrans.jpg",
    ]
  );

  return (
    <Canvas ref={scene}>
      <ambientLight intensity={0.15} color={"#8ffbfa"} />
      <directionalLight
        intensity={17}
        position={[1, 1, -0.25]}
        color={"#aad7ff"}
      />
      <motion.mesh
        initial={{ rotateZ: (-23.4 * Math.PI) / 180 }}
        animate={{ rotateY: 360 }}
        transition={{ ease: "linear", duration: 3600, repeat: Infinity }}
        scale={2.8}
      >
        <icosahedronGeometry args={[1, 12]} />
        <meshPhongMaterial
          map={color}
          bumpMap={bumpMap}
          bumpScale={0.04}
          specularMap={specularMap}
        />
      </motion.mesh>
      <motion.mesh
        animate={{ rotateY: 360 }}
        transition={{ ease: "linear", duration: 3600, repeat: Infinity }}
        scale={2.804}
        initial={{ rotateZ: (-23.4 * Math.PI) / 180 }}
      >
        <icosahedronGeometry args={[1, 12]} />
        <meshBasicMaterial map={light} blending={THREE.AdditiveBlending} />
      </motion.mesh>
      <motion.mesh
        animate={{ rotateY: 360 }}
        transition={{ ease: "linear", duration: 3600, repeat: Infinity }}
        scale={2.81}
        initial={{ rotateZ: (-23.4 * Math.PI) / 180 }}
      >
        <icosahedronGeometry args={[1, 12]} />
        <meshStandardMaterial
          map={cloudAlpha}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          alphaMap={cloudAlpha}
        />
      </motion.mesh>
      <motion.mesh
        animate={{ rotateY: 360 }}
        transition={{ ease: "linear", duration: 3600, repeat: Infinity }}
        scale={2.82}
        initial={{ rotateZ: (-23.4 * Math.PI) / 180 }}
      >
        <icosahedronGeometry args={[1, 12]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vs}
          fragmentShader={fs}
          transparent
          blending={THREE.AdditiveBlending}
        />
      </motion.mesh>
    </Canvas>
  );
}

export default memo(Earth);
