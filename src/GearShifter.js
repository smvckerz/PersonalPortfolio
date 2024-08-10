import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

function GearShifter() {
    const mountRef = useRef(null);
    const gearShifterRef = useRef(null);
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
        gearShifterRef.current = gearShifter;

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

        // Function to handle gear shift on click/tap
        const handleShift = () => {
            const nextGear = (currentGear + 1) % 3; // Cycles through 0, 1, 2 (Neutral, 1st, 2nd)
            setCurrentGear(nextGear);
            shiftToGear(nextGear);
        };

        // Add event listeners
        renderer.domElement.addEventListener('mousedown', handleShift);
        renderer.domElement.addEventListener('touchstart', handleShift);

        // Cleanup on unmount
        return () => {
            renderer.domElement.removeEventListener('mousedown', handleShift);
            renderer.domElement.removeEventListener('touchstart', handleShift);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, [currentGear]);

    return <div ref={mountRef} />;
}

export default GearShifter;