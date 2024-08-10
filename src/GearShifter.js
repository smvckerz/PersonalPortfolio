import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

function GearShifter() {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        // Create a simple gear shifter
        const geometry = new THREE.BoxGeometry(1, 4, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0x555555 });
        const gearShifter = new THREE.Mesh(geometry, material);
        scene.add(gearShifter);

        camera.position.z = 10;

        // Animate function
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // GSAP animations for shifting gears
        const shiftToGear = (rotationAngle) => {
            gsap.to(gearShifter.rotation, { duration: 1, x: rotationAngle });
        };

        // Event listeners for gear shifting
        const handleKeyDown = (event) => {
            if (event.key === '1') shiftToGear(Math.PI / 4);   // 1st gear
            if (event.key === '2') shiftToGear(0);             // Neutral
            if (event.key === '3') shiftToGear(-Math.PI / 4);  // 2nd gear
        };
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} />;
}

export default GearShifter;
