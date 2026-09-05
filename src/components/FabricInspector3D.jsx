"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Rotate3D, Sparkles, Layers, Activity } from "lucide-react";

export default function FabricInspector3D({ fabricType = "silk", productName = "Apparel" }) {
  const mountRef = useRef(null);
  const [viewMode, setViewMode] = useState("sheen"); // 'sheen', 'weave', 'stretch'
  const modeRef = useRef("sheen");
  modeRef.current = viewMode;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // Create 3D Fabric Swatch Object (a curved, realistic fabric drape swatch)
    const geometry = new THREE.CylinderGeometry(1.2, 1.4, 2.2, 48, 32, true);
    
    // Add subtle organic ripples to cylinder
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getY(i);
      const angle = Math.atan2(pos.getZ(i), pos.getX(i));
      const ripple = Math.sin(angle * 6 + u * 2.5) * 0.08;
      pos.setX(i, pos.getX(i) + Math.cos(angle) * ripple);
      pos.setZ(i, pos.getZ(i) + Math.sin(angle) * ripple);
    }
    geometry.computeVertexNormals();

    // Fabric Material definition based on fabricType
    const getMaterialConfig = () => {
      if (fabricType === "silk") {
        return {
          color: new THREE.Color("#efc3e6"),
          roughness: 0.18,
          metalness: 0.5,
          clearcoat: 0.9,
          clearcoatRoughness: 0.15,
          wireframe: false
        };
      } else if (fabricType === "sculpt") {
        return {
          color: new THREE.Color("#9c89b8"),
          roughness: 0.45,
          metalness: 0.15,
          clearcoat: 0.3,
          clearcoatRoughness: 0.4,
          wireframe: false
        };
      } else {
        // Micro-modal
        return {
          color: new THREE.Color("#b8bedd"),
          roughness: 0.55,
          metalness: 0.1,
          clearcoat: 0.1,
          clearcoatRoughness: 0.5,
          wireframe: false
        };
      }
    };

    const material = new THREE.MeshPhysicalMaterial({
      ...getMaterialConfig(),
      side: THREE.DoubleSide
    });

    const fabricMesh = new THREE.Mesh(geometry, material);
    scene.add(fabricMesh);

    // Inner core light
    const pointLight = new THREE.PointLight(0xffffff, 2.6, 8);
    pointLight.position.set(0, 0, 1.5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xded4ea, 2.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xfff4fa, 2.2);
    directionalLight.position.set(3, 4, 3);
    scene.add(directionalLight);

    // Drag to rotate controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0.006; // continuous gentle spin

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      rotationVelocityY = deltaX * 0.008;
      rotationVelocityX = deltaY * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Update material based on viewMode
      if (modeRef.current === "weave") {
        material.wireframe = true;
      } else {
        material.wireframe = false;
      }

      // Stretch animation mode
      if (modeRef.current === "stretch") {
        const pulse = 1 + Math.sin(elapsedTime * 4) * 0.08;
        fabricMesh.scale.set(pulse, 1 / pulse, pulse);
      } else {
        fabricMesh.scale.set(1, 1, 1);
      }

      // Smooth inertia rotation
      fabricMesh.rotation.y += rotationVelocityY;
      fabricMesh.rotation.x += rotationVelocityX;

      if (!isDragging) {
        rotationVelocityX *= 0.95;
        // Maintain a subtle idle spin
        rotationVelocityY = rotationVelocityY * 0.95 + 0.003 * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [fabricType]);

  return (
    <div className="fabric-inspector-container" style={{ cursor: "grab" }}>
      <div className="inspector-badge">
        <Rotate3D size={14} />
        <span>3D Material Inspector • Drag to Rotate 360°</span>
      </div>

      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

      <div className="inspector-controls">
        <button
          className={`control-chip ${viewMode === "sheen" ? "active" : ""}`}
          onClick={() => setViewMode("sheen")}
        >
          <Sparkles size={12} style={{ display: "inline", marginRight: "4px" }} />
          Satin Sheen
        </button>
        <button
          className={`control-chip ${viewMode === "weave" ? "active" : ""}`}
          onClick={() => setViewMode("weave")}
        >
          <Layers size={12} style={{ display: "inline", marginRight: "4px" }} />
          Fiber Weave
        </button>
        <button
          className={`control-chip ${viewMode === "stretch" ? "active" : ""}`}
          onClick={() => setViewMode("stretch")}
        >
          <Activity size={12} style={{ display: "inline", marginRight: "4px" }} />
          Stretch Tension
        </button>
      </div>
    </div>
  );
}
