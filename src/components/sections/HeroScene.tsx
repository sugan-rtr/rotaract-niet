"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Signature hero visual: a wheel of light-points assembled into a gear —
 * a quiet nod to Rotary's own "wheel of service" — surrounded by a
 * drifting field of particles. Built in vanilla Three.js per spec
 * (Three.js is scoped to the Hero only).
 */
export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ---- Build the gear-of-service point cloud ----
    const teeth = 12;
    const innerR = 2.1;
    const outerR = 2.7;
    const gearPoints: number[] = [];
    const gearSegments = 900;

    for (let i = 0; i < gearSegments; i++) {
      const theta = (i / gearSegments) * Math.PI * 2;
      const toothWave = Math.pow(Math.sin(theta * teeth * 0.5), 2) > 0.5 ? 1 : 0;
      const r = innerR + (outerR - innerR) * toothWave;
      const jitter = (Math.random() - 0.5) * 0.05;
      const x = Math.cos(theta) * (r + jitter);
      const y = Math.sin(theta) * (r + jitter);
      const z = (Math.random() - 0.5) * 0.35;
      gearPoints.push(x, y, z);
    }
    // spokes + hub for structure
    for (let s = 0; s < 6; s++) {
      const angle = (s / 6) * Math.PI * 2;
      for (let i = 0; i < 60; i++) {
        const t = i / 60;
        const r = t * innerR;
        gearPoints.push(Math.cos(angle) * r, Math.sin(angle) * r, (Math.random() - 0.5) * 0.15);
      }
    }
    for (let i = 0; i < 200; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.65;
      gearPoints.push(Math.cos(theta) * r, Math.sin(theta) * r, (Math.random() - 0.5) * 0.2);
    }

    const gearGeometry = new THREE.BufferGeometry();
    gearGeometry.setAttribute("position", new THREE.Float32BufferAttribute(gearPoints, 3));
    const gearMaterial = new THREE.PointsMaterial({
      color: new THREE.Color("#ffd700"),
      size: 0.028,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    const gear = new THREE.Points(gearGeometry, gearMaterial);
    scene.add(gear);

    // ---- Ambient drifting particle field ----
    const fieldCount = 500;
    const fieldPoints = new Float32Array(fieldCount * 3);
    for (let i = 0; i < fieldCount; i++) {
      fieldPoints[i * 3] = (Math.random() - 0.5) * 16;
      fieldPoints[i * 3 + 1] = (Math.random() - 0.5) * 10;
      fieldPoints[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    const fieldGeometry = new THREE.BufferGeometry();
    fieldGeometry.setAttribute("position", new THREE.Float32BufferAttribute(fieldPoints, 3));
    const fieldMaterial = new THREE.PointsMaterial({
      color: new THREE.Color("#aeb8d0"),
      size: 0.014,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    const field = new THREE.Points(fieldGeometry, fieldMaterial);
    scene.add(field);

    // Soft navy glow sphere behind everything
    const glowGeo = new THREE.SphereGeometry(3.4, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({ color: new THREE.Color("#000080"), transparent: true, opacity: 0.12 });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.z = -1.5;
    scene.add(glow);

    let mouseX = 0;
    let mouseY = 0;
    function handlePointerMove(e: PointerEvent) {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("pointermove", handlePointerMove);

    let frameId: number;
    const clock = new THREE.Clock();

    function animate() {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        gear.rotation.z = elapsed * 0.08;
        field.rotation.y = elapsed * 0.02;
        camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);
        glow.scale.setScalar(1 + Math.sin(elapsed * 0.6) * 0.03);
      }

      renderer.render(scene, camera);
    }
    animate();

    function handleResize() {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      gearGeometry.dispose();
      gearMaterial.dispose();
      fieldGeometry.dispose();
      fieldMaterial.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
