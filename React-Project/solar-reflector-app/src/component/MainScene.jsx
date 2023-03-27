import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Window from './Window';
import Reflector from './Reflector';
import Sun from './Sun';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import CustomAxesHelper from '../utils/CustomAxesHelper';
const MainScene = ({
    windowWidth, windowHeight,
    windowOrientation,

    reflectorWidth, reflectorLength,
    reflectorRotationX, reflectorRotationY, reflectorRotationZ,
    reflectorPosX, reflectorPosY, reflectorPosZ,

    sunSize, azimuth, elevation
}) => {
    const mountRef = useRef(null);
    const windowObjRef = useRef();
    const reflectorObjRef = useRef();
    const sunObjRef = useRef();

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x87CEEB); // Sky blue color
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

        camera.position.z = 50;

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        // Add axes helper
        const axesHelper = new THREE.AxesHelper(50); // Set the size of the helper (e.g., 5 units)
        scene.add(axesHelper);

        // // Add custom AxesHelper
        // const axesLength = 5;
        // const customAxesHelper = CustomAxesHelper(axesLength);
        // scene.add(customAxesHelper);

        //Window
        const windowObj = Window(
            windowWidth,
            windowHeight,
            windowOrientation,
        );
        windowObjRef.current = windowObj;
        scene.add(windowObj);

        //Reflector
        const reflectorObj = Reflector(
            reflectorWidth,
            reflectorLength,
            reflectorRotationX,
            reflectorRotationY,
            reflectorRotationZ
        );
        reflectorObjRef.current = reflectorObj;
        scene.add(reflectorObj);

        //Sun
        const sunObj = Sun(
            sunSize,
        )
        sunObjRef.current = sunObj;
        scene.add(sunObj);

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
            windowObjRef.current.rotation.set(0, windowOrientation* (Math.PI / 180),0)
        }
    }, [windowWidth, windowHeight, windowOrientation]);

    useEffect(() => {
        if (reflectorObjRef.current) {
            const newReflectorObj = Reflector(reflectorWidth, reflectorLength);
            reflectorObjRef.current.geometry = newReflectorObj.geometry;
            reflectorObjRef.current.material = newReflectorObj.material;

            // Update the rotation and position
            reflectorObjRef.current.rotation.set(
                (reflectorRotationX) * (Math.PI / 180),
                (reflectorRotationY) * (Math.PI / 180),
                (reflectorRotationZ) * (Math.PI / 180)
            );
            reflectorObjRef.current.position.set(reflectorPosX, reflectorPosZ, reflectorPosY);
        }
    }, [
        reflectorWidth,
        reflectorLength,
        reflectorRotationX,
        reflectorRotationY,
        reflectorRotationZ,
        windowOrientation,
        reflectorPosX,
        reflectorPosY,
        reflectorPosZ,
    ]);

    useEffect(() => {
        if (sunObjRef.current) {
            const newSunObj = Sun(sunSize); // diameter of the sun
            sunObjRef.current.geometry = newSunObj.geometry;
            sunObjRef.current.material = newSunObj.material;

            // Calculate the position of the sun based on azimuth and elevation
            const theta = azimuth * (Math.PI / 180);
            const phi = (90 - elevation) * (Math.PI / 180);
            const radius = 30; // distance from origin

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.cos(phi);
            const z = radius * Math.sin(phi) * Math.sin(theta);

            // Update the position and rotation of the sun object
            sunObjRef.current.position.set(x, y, z);
            sunObjRef.current.lookAt(0, 0, 0);
        }
    }, [azimuth, elevation]);

    return <div ref={mountRef} />;
};

export default MainScene;