import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Window from './Window';
import Reflector from './Reflector';
import Sun from './Sun';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import CustomAxesHelper from '../utils/CustomAxesHelper';

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
    const sunlightLinesObjRef = useRef();
    const sunlightLinesGroupRef = useRef();

    // // let scene; // Declare the 'scene' variable here
    const sceneRef = useRef();


    //SUN LINES (WORKING)
    const updateSunlightLines = (scene, reflectorObj, sunlightLinesGroupRef, azimuth, elevation) => {
        if (!reflectorObj) {
            return;
        }

        if (sunlightLinesGroupRef.current) {
            // Remove any existing sunlightLines group from the scene
            scene.remove(sunlightLinesGroupRef.current);
        }

        const theta = azimuth * (Math.PI / 180);
        const phi = (90 - elevation) * (Math.PI / 180);
        const sunDirection = new THREE.Vector3(
            Math.sin(phi) * Math.cos(theta),
            Math.cos(phi),
            Math.sin(phi) * Math.sin(theta)
        );

        const group = new THREE.Group();

        const lineSunlightMaterial = new THREE.LineBasicMaterial({ color: 0xFF9800 });
        const lineReflectedMaterial = new THREE.LineBasicMaterial({ color: 0xffeb3b})

        // Calculate the corners of the reflector
        const reflectorCorners = [new THREE.Vector3(-reflectorWidth / 2, reflectorLength / 2, 0), new THREE.Vector3(reflectorWidth / 2, reflectorLength / 2, 0), new THREE.Vector3(-reflectorWidth / 2, -reflectorLength / 2, 0), new THREE.Vector3(reflectorWidth / 2, -reflectorLength / 2, 0),];

        // Apply reflector's rotation and position to the corners
        reflectorCorners.forEach(corner => {
            corner.applyQuaternion(reflectorObj.quaternion);
            corner.add(reflectorObj.position);
        });

        // Calculate the normal of the reflector
        const normal = new THREE.Vector3(0, 1, 0);
        normal.applyQuaternion(reflectorObj.quaternion);

        // Create sunlight lines and reflected light lines for each corner of the reflector
        reflectorCorners.forEach(corner => {
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                corner,
                corner.clone().add(sunDirection.clone().multiplyScalar(50)),
            ]);
            const line = new THREE.Line(lineGeometry, lineSunlightMaterial);
            group.add(line);

            // Calculate the reflected light direction
            const reflectedLightDirection = sunDirection.clone().reflect(normal);

            // Create the reflected light line
            const reflectedLineGeometry = new THREE.BufferGeometry().setFromPoints([
                corner,
                corner.clone().add(reflectedLightDirection.clone().multiplyScalar(30)),
            ]);
            const reflectedLine = new THREE.Line(reflectedLineGeometry, lineReflectedMaterial);
            group.add(reflectedLine);
        });

        sunlightLinesGroupRef.current = group;
        scene.add(group);
    };

    // //SUN LINES TEST



    //Init scene
    useEffect(() => {
        // scene = new THREE.Scene(); // Initialize the 'scene' variable
        sceneRef.current = new THREE.Scene();
        sceneRef.current.background = new THREE.Color(0x87CEEB); // Sky blue color
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

        camera.position.x = 2000;
        camera.position.y = 2000;
        camera.position.z = 2000;

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(sceneRef.current, camera);
        };

        // Add axes helper
        const axesHelper = new THREE.AxesHelper(50); // Set the size of the helper (e.g., 5 units)
        sceneRef.current.add(axesHelper);

        // Window
        const windowObj = Window(
            windowWidth,
            windowHeight,
            windowOrientation,
        );
        windowObjRef.current = windowObj;
        sceneRef.current.add(windowObj);

        // Reflector
        const reflectorObj = Reflector(
            reflectorWidth,
            reflectorLength,
            reflectorRotationX,
            reflectorRotationY,
            reflectorRotationZ
        );
        reflectorObjRef.current = reflectorObj;
        sceneRef.current.add(reflectorObj);

        // Sun
        const sunObj = Sun(
            sunSize,
        )
        sunObjRef.current = sunObj;
        sceneRef.current.add(sunObj);

        if (sceneRef.current) {
            updateSunlightLines(sceneRef.current);
        }

        const light = new THREE.AmbientLight(0xffffff);
        sceneRef.current.add(light);

        animate();

        return () => {
            mountRef.current.removeChild(renderer.domElement);
            sceneRef.current.remove(windowObj);
            sceneRef.current.remove(reflectorObj);
        };
    }, []);

    //Render Window
    useEffect(() => {
        if (windowObjRef.current) {
            const newWindowObj = Window(windowWidth, windowHeight);
            windowObjRef.current.geometry = newWindowObj.geometry;
            windowObjRef.current.material = newWindowObj.material;
            windowObjRef.current.rotation.set(0, windowOrientation * (Math.PI / 180), 0)
        }
    }, [windowWidth, windowHeight, windowOrientation]);

    //Render Reflector
    useEffect(() => {
        if (reflectorObjRef.current) {
            // Remove the existing reflector object from the scene
            sceneRef.current.remove(reflectorObjRef.current);

            // Create a new reflector object with the updated parameters
            const newReflectorObj = Reflector(
                reflectorWidth,
                reflectorLength,
                reflectorRotationX,
                reflectorRotationY,
                reflectorRotationZ
            );

            // Update the position
            newReflectorObj.position.set(reflectorPosX, reflectorPosZ, reflectorPosY);

            // Apply the rotations to the new reflector object
            newReflectorObj.rotation.set(
                (reflectorRotationX) * (Math.PI / 180),
                reflectorRotationY * (Math.PI / 180),
                reflectorRotationZ * (Math.PI / 180)
            );

            // Add the new reflector object to the scene
            sceneRef.current.add(newReflectorObj);

            // Update the reflectorObjRef to reference the new reflector object
            reflectorObjRef.current = newReflectorObj;
        }

        // Update the sunlightLines
        updateSunlightLines(sceneRef.current, reflectorObjRef.current, sunlightLinesGroupRef, azimuth, elevation);
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
        azimuth, elevation
    ]);

    //render Sun
    useEffect(() => {
        if (sunObjRef.current) {
            const newSunObj = Sun(sunSize); // diameter of the sun
            sunObjRef.current.geometry = newSunObj.geometry;
            sunObjRef.current.material = newSunObj.material;

            // Calculate the position of the sun based on azimuth and elevation
            const theta = azimuth * (Math.PI / 180);
            const phi = (90 - elevation) * (Math.PI / 180);
            const radius = 20; // distance from origin

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.cos(phi);
            const z = radius * Math.sin(phi) * Math.sin(theta);
            // Update the position and rotation of the sun object
            sunObjRef.current.position.set(x, y, z);
            sunObjRef.current.lookAt(0, 0, 0);

            // Update the position of the sunlightLines object
            if (sunlightLinesObjRef.current) {
                sunlightLinesObjRef.current.position.set(x, y, z);
            }
        }
    }, [azimuth, elevation]);

    return <div ref={mountRef} />;

};

export default MainScene;