import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Window from './Window';
import Reflector from './Reflector';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const MainScene = ({
    windowWidth,
    windowHeight,
    reflectorWidth,
    reflectorLength,
    reflectorRotationX,
    reflectorRotationY,
    reflectorRotationZ,
    reflectorPosX, reflectorPosY, reflectorPosZ,
}) => {
    const mountRef = useRef(null);
    const windowObjRef = useRef();
    const reflectorObjRef = useRef();

    useEffect(() => {
        const scene = new THREE.Scene();
        const aspect = window.innerWidth / window.innerHeight;
        const cameraWidth = 20;
        const cameraHeight = cameraWidth / aspect;

        const camera = new THREE.OrthographicCamera(
            -cameraWidth / 2,
            cameraWidth / 2,
            cameraHeight / 2,
            -cameraHeight / 2,
            0.1,
            1000
        );
        // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 10;
        controls.maxDistance = 500;
        controls.maxPolarAngle = Math.PI / 2;

        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        const windowObj = Window(
            windowWidth,
            windowHeight
        );
        windowObjRef.current = windowObj;
        scene.add(windowObj);

        const reflectorObj = Reflector(
            reflectorWidth,
            reflectorLength,
            reflectorRotationX,
            reflectorRotationY,
            reflectorRotationZ
        );
        reflectorObjRef.current = reflectorObj;
        scene.add(reflectorObj);

        // const light = new THREE.PointLight(0xffffff);
        // light.position.set(0, 0, 10);
        const light = new THREE.AmbientLight(0xffffff);
        scene.add(light);

        animate();

        return () => {
            mountRef.current.removeChild(renderer.domElement);
            scene.remove(windowObj);
            scene.remove(reflectorObj);
        };
    }, []);

    useEffect(() => {
        if (windowObjRef.current) {
            const newWindowObj = Window(windowWidth, windowHeight);
            windowObjRef.current.geometry = newWindowObj.geometry;
            windowObjRef.current.material = newWindowObj.material;
        }
    }, [windowWidth, windowHeight]);

    useEffect(() => {
        if (reflectorObjRef.current) {
            const newReflectorObj = Reflector(reflectorWidth, reflectorLength);
            reflectorObjRef.current.geometry = newReflectorObj.geometry;
            reflectorObjRef.current.material = newReflectorObj.material;

            // Update the rotation and position
            reflectorObjRef.current.rotation.set(
                reflectorRotationX * (Math.PI / 180),
                reflectorRotationY * (Math.PI / 180),
                reflectorRotationZ * (Math.PI / 180)
            );
            reflectorObjRef.current.position.set(reflectorPosX, reflectorPosZ, reflectorPosY);
        }
    }, [
        reflectorWidth,
        reflectorLength,
        reflectorRotationX,
        reflectorRotationY,
        reflectorRotationZ,
        reflectorPosX,
        reflectorPosY,
        reflectorPosZ,
    ]);

    return <div ref={mountRef} />;
};

export default MainScene;