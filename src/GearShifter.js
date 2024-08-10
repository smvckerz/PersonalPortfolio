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

        // Load the texture
        const textureLoader = new THREE.TextureLoader();
        const knobTexture = textureLoader.load('/path-to-your-image.jpg'); // Ensure the path is correct

        // Create a round gear knob (sphere) with the texture
        const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
        const sphereMaterial = new THREE.MeshStandardMaterial({ map: knobTexture });
        const gearKnob = new THREE.Mesh(sphereGeometry, sphereMaterial);
        gearKnob.position.y = 2;
        scene.add(gearKnob);

        // Create the stick for the gear knob
        const stickGeometry = new THREE.CylinderGeometry(0.2, 0.2, 4, 32);
        const stickMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
        const gearStick = new THREE.Mesh(stickGeometry, stickMaterial);
        gearStick.position.y = 0;
        scene.add(gearStick);

        camera.position.z = 10;

        // Set background color to white
        renderer.setClearColor(0xffffff, 1);

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
                    rotationAngle = Math.PI / 6; // Adjust this value for the desired rotation
                    break;
                case 2: // 2nd gear
                    rotationAngle = -Math.PI / 6; // Adjust this value for the desired rotation
                    break;
                default:
                    rotationAngle = 0;
            }
            gsap.to(gearKnob.rotation, { duration: 0.5, x: rotationAngle });
        };

        // Handle keyboard input
        const handleKeyDown = (event) => {
            if (event.key === '1') {
                shiftToGear(1); // Shift to 1st gear
            } else if (event.key === '2') {
                shiftToGear(2); // Shift to 2nd gear
            } else if (event.key === '0') {
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