import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, DirectionalLight } from '@react-three/drei';

const Sun = ({ positions, mode }) => {
    const sunRef = useRef();
    const [index, setIndex] = useState(0);

    useFrame((state, delta) => {
        if (sunRef.current) {
            if (mode === 'every5mins') {
                // Increment index every frame to animate the sun movement
                setIndex((prevIndex) => (prevIndex + 1) % positions.length);
            }
            const position = positions[index];
            const azimuth = position.azimuth;
            const elevation = position.elevation;

            // Update sun position based on azimuth and elevation
            const radius = 10; // Arbitrary radius for sun's orbit
            sunRef.current.position.set(
                radius * Math.cos(azimuth) * Math.cos(elevation),
                radius * Math.sin(elevation),
                radius * Math.sin(azimuth) * Math.cos(elevation)
            );
        }
    });

    return (
        <>
            <Sphere ref={sunRef} args={[0.5]}>
                <meshStandardMaterial color="yellow" emissive="yellow" />
            </Sphere>
            {/* <DirectionalLight position={[1, 1, 1]} /> */}
        </>
    );
};

const SunAnimation = ({ sunPositions }) => {
    return (
        <Canvas>
            <ambientLight />
            <Sun positions={sunPositions} />
        </Canvas>
    );
};

export default SunAnimation;
