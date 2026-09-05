"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SilkHeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3D Procedural Silk Cloth Geometry
    const width = 22;
    const height = 14;
    const segmentsX = 64;
    const segmentsY = 44;
    const geometry = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);

    // Store base vertices for wave calculation
    const positionAttribute = geometry.attributes.position;
    const basePositions = positionAttribute.array.slice();

    // Luxurious Satin / Silk Material
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1B1A24"),
      emissive: new THREE.Color("#0C0B12"),
      roughness: 0.22,
      metalness: 0.45,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      reflectivity: 0.9,
      wireframe: false,
      side: THREE.DoubleSide
    });

    const silkMesh = new THREE.Mesh(geometry, material);
    silkMesh.rotation.x = -0.35;
    silkMesh.position.y = -0.6;
    scene.add(silkMesh);

    // Floating Cashmere / Silk Gold Particles
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      particleSpeeds[i] = 0.005 + Math.random() * 0.01;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0xE6D5C3,
      size: 0.045,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x282635, 1.8);
    scene.add(ambientLight);

    // Key Champagne Light
    const keyLight = new THREE.DirectionalLight(0xE6D5C3, 2.8);
    keyLight.position.set(5, 6, 8);
    scene.add(keyLight);

    // Rose Gold Rim Light
    const rimLight = new THREE.DirectionalLight(0xC59B88, 2.2);
    rimLight.position.set(-6, -4, 4);
    scene.add(rimLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      targetMouseX = (x - 0.5) * 2;
      targetMouseY = (y - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime() * 0.85;

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Silk Wave Physics
      const pos = positionAttribute.array;
      for (let i = 0; i < pos.length; i += 3) {
        const x = basePositions[i];
        const y = basePositions[i + 1];

        // Harmonic fluid wave simulation
        const wave1 = Math.sin(x * 0.45 + time * 0.9) * Math.cos(y * 0.4 + time * 0.7);
        const wave2 = Math.sin((x + y) * 0.3 + time * 1.2) * 0.4;
        const waveMouse = Math.sin(Math.sqrt(Math.pow(x - mouseX * 6, 2) + Math.pow(y + mouseY * 4, 2)) * 0.7 - time * 2) * 0.35;

        pos[i + 2] = (wave1 + wave2 + waveMouse) * 1.15;
      }
      positionAttribute.needsUpdate = true;
      geometry.computeVertexNormals();

      // Subtle Mesh Rotation
      silkMesh.rotation.y = mouseX * 0.12;
      silkMesh.rotation.x = -0.35 + mouseY * 0.08;

      // Dynamic light movement
      keyLight.position.x = 5 + mouseX * 4;
      keyLight.position.y = 6 - mouseY * 3;

      // Animate Gold Cashmere Particles
      const pPositions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pPositions[i * 3 + 1] += particleSpeeds[i];
        if (pPositions[i * 3 + 1] > 6) {
          pPositions[i * 3 + 1] = -6;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;
      particles.rotation.y = time * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="canvas-container"
      aria-hidden="true"
    />
  );
}
