import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

function GearShifter() {
    const mountRef = useRef(null);
    const [currentGear, setCurrentGear] = useState(0); // Neutral

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
        const shiftToGear = (gear) => {
            let rotationAngle;
            switch (gear) {
                case 0: // Neutral
                    rotationAngle = 0;
                    break;
                case 1: // 1st gear
                    rotationAngle = Math.PI / 4;
                    break;
                case 2: // 2nd gear
                    rotationAngle = -Math.PI / 4;
                    break;
                default:
                    rotationAngle = 0;
            }
            gsap.to(gearShifter.rotation, { duration: 0.5, x: rotationAngle });
        };

        // Handle keyboard input
        const handleKeyDown = (event) => {
            if (event.key === '1') {
                setCurrentGear(1);
                shiftToGear(1); // Shift to 1st gear
            } else if (event.key === '2') {
                setCurrentGear(2);
                shiftToGear(2); // Shift to 2nd gear
            } else if (event.key === '0') {
                setCurrentGear(0);
                shiftToGear(0); // Shift to Neutral
            }
        };

        // Add event listener for keyboard input
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