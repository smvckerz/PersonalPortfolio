import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

function CarPOV() {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        // Create the steering wheel
        const steeringWheelGeometry = new THREE.TorusGeometry(1, 0.2, 16, 100);
        const steeringWheelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
        const steeringWheel = new THREE.Mesh(steeringWheelGeometry, steeringWheelMaterial);
        steeringWheel.position.set(0, 1, -5);
        scene.add(steeringWheel);

        // Create the gear shifter
        const shifterGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
        const knobGeometry = new THREE.SphereGeometry(0.2, 32, 32);
        const shifterMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
        const knobMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
        const shifter = new THREE.Mesh(shifterGeometry, shifterMaterial);
        const knob = new THREE.Mesh(knobGeometry, knobMaterial);
        shifter.position.set(1, -1, -6);
        knob.position.set(1, -0.5, -6);
        scene.add(shifter);
        scene.add(knob);

        // Create the dashboard
        const dashboardGeometry = new THREE.BoxGeometry(5, 1, 0.5);
        const dashboardMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
        const dashboard = new THREE.Mesh(dashboardGeometry, dashboardMaterial);
        dashboard.position.set(0, 0.5, -7);
        scene.add(dashboard);

        // Speedometer and Tachometer
        const createDial = (x, y, z) => {
            const dialGeometry = new THREE.CircleGeometry(0.5, 32);
            const dialMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
            const dial = new THREE.Mesh(dialGeometry, dialMaterial);
            dial.position.set(x, y, z);
            scene.add(dial);
        };
        createDial(-1, 0.75, -6.75); // Speedometer
        createDial(1, 0.75, -6.75);  // Tachometer

        // Buttons on the dashboard
        const createButton = (x, y, z) => {
            const buttonGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32);
            const buttonMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
            const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
            button.rotation.x = Math.PI / 2;
            button.position.set(x, y, z);
            scene.add(button);
        };
        createButton(-1.5, 0.25, -6.75);
        createButton(-1.0, 0.25, -6.75);
        createButton(-0.5, 0.25, -6.75);

        // Basic Seats
        const createSeat = (x, y, z) => {
            const seatGeometry = new THREE.BoxGeometry(1.5, 2, 0.5);
            const seatMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
            const seat = new THREE.Mesh(seatGeometry, seatMaterial);
            seat.position.set(x, y, z);
            scene.add(seat);
        };
        createSeat(-2, -1.5, -8); // Driver's seat
        createSeat(2, -1.5, -8);  // Passenger's seat

        // Adjust camera position for POV
        camera.position.set(0, 1, 0); // Position the camera inside the car

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // GSAP animations for interactions
        const rotateSteeringWheel = (direction) => {
            gsap.to(steeringWheel.rotation, { duration: 1, z: direction === 'left' ? Math.PI / 4 : -Math.PI / 4 });
        };

        const shiftGear = (gear) => {
            let positionZ;
            switch (gear) {
                case 1:
                    positionZ = -6.2; // Position for 1st gear
                    break;
                case 2:
                    positionZ = -5.8; // Position for 2nd gear
                    break;
                default:
                    positionZ = -6; // Neutral position
            }
            gsap.to(knob.position, { duration: 0.5, z: positionZ });
        };

        // Handle keyboard inputs
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                rotateSteeringWheel('left');
            } else if (event.key === 'ArrowRight') {
                rotateSteeringWheel('right');
            } else if (event.key === '1') {
                shiftGear(1);
            } else if (event.key === '2') {
                shiftGear(2);
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

export default CarPOV;