import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

function GearShifter() {
    const mountRef = useRef(null);
    const gearShifterRef = useRef(null);
    const startYRef = useRef(0);
    const currentRotationRef = useRef(0);

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
        const shiftToGear = (rotationAngle) => {
            currentRotationRef.current = rotationAngle;
            gsap.to(gearShifter.rotation, { duration: 1, x: rotationAngle });
        };

        // Touch start event
        const handleTouchStart = (event) => {
            startYRef.current = event.touches[0].clientY;
        };

        // Touch move event
        const handleTouchMove = (event) => {
            const deltaY = event.touches[0].clientY - startYRef.current;

            // Example thresholds for shifting gears
            if (deltaY > 50) {
                shiftToGear(-Math.PI / 4); // Shift to 2nd gear
            } else if (deltaY < -50) {
                shiftToGear(Math.PI / 4); // Shift to 1st gear
            } else {
                shiftToGear(0); // Neutral
            }
        };

        // Add event listeners for touch events
        renderer.domElement.addEventListener('touchstart', handleTouchStart);
        renderer.domElement.addEventListener('touchmove', handleTouchMove);

        // Cleanup on unmount
        return () => {
            renderer.domElement.removeEventListener('touchstart', handleTouchStart);
            renderer.domElement.removeEventListener('touchmove', handleTouchMove);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} />;
}

export default GearShifter;