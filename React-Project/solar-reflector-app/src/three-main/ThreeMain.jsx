import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
// import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { DoubleSide } from 'three';
import Slider from "../components/Slider"


import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

function ThreeObjects() {
    // // This reference gives us direct access to the THREE.Mesh object
    // const ref = useRef();
    // Hold state for hovered and clicked events
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(15);
    const [angle, setAngle] = useState(45);
    const [mirrorLength, setMirrorLength] = useState(15)
    const [lightDistY, setLightDistY] = useState(20)
    const [lightDistZ, setLightDistZ] = useState(20)
    const canvasStyle = {
        width: "100vw",
        height: "100vh",
        position: "relative",
        top: 0,
        left: 0,
    };
    const windowGeometry = new THREE.BoxGeometry(width, height, 0.5);
    const windowMaterial = new THREE.MeshStandardMaterial({ wireframe: true, color: "orange" });
    const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);


    const reflectorMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(width, mirrorLength, 2),
        new THREE.MeshStandardMaterial({ side: THREE.DoubleSide })
    );
    reflectorMesh.position.set(0, mirrorLength / 2, 0);

    const symmetryPlaneMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(height, width, 2),
        new THREE.MeshStandardMaterial({
            color: "white",
            opacity: 0.2,
            transparent: true,
            side: THREE.DoubleSide,
        })
    );
    symmetryPlaneMesh.position.set(0, mirrorLength / 2, 0);
    symmetryPlaneMesh.rotation.set(Math.PI / 2, 0, 0);

    const parallelPlaneMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(width, mirrorLength, 2),
        new THREE.MeshStandardMaterial({
            color: "white",
            opacity: 1,
            transparent: true,
            side: THREE.DoubleSide,
        })
    );
    parallelPlaneMesh.position.set(0, lightDistY, lightDistZ);

    const reflectorGroup = new THREE.Group();
    reflectorGroup.add(reflectorMesh, symmetryPlaneMesh, parallelPlaneMesh);

    const reflector = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ wireframe: true, color: "orange" })
    );
    reflectorGroup.position.setY(-height / 2);
    reflectorGroup.rotation.setX(-angle * (Math.PI / 180));
    return { windowMesh, reflectorGroup }
}

const { windowMesh, reflectorGroup } = ThreeObjects();
function easeOutCirc(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 4));
}

const TheScene = () => {
    const refContainer = useRef();
    const [loading, setLoading] = useState(true);
    const [renderer, setRenderer] = useState();

    useEffect(() => {
        const { current: container } = refContainer;
        if (container && !renderer) {
            const scW = container.clientWidth;
            const scH = container.clientHeight;
            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(scW, scH);
            renderer.outputEncoding = THREE.sRGBEncoding;
            container.appendChild(renderer.domElement);
            setRenderer(renderer);

            const scene = new THREE.Scene();
            const scale = 5.6;
            const camera = new THREE.OrthographicCamera(
                -scale,
                scale,
                scale,
                -scale,
                0.01,
                50000
            );
            const target = new THREE.Vector3(-0.5, 1.2, 0);
            const initialCameraPosition = new THREE.Vector3(
                20 * Math.sin(0.2 * Math.PI),
                10,
                20 * Math.cos(0.2 * Math.PI)
            );
            const ambientLight = new THREE.AmbientLight(0xcccccc, 1);
            scene.add(ambientLight);
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.autoRotate = true;
            controls.target = target;

            scene.add(reflectorGroup).then(() => {
                animate();
                setLoading(false);
            });

            let req = null;
            let frame = 0;
            const animate = () => {
                req = requestAnimationFrame(animate);
                frame = frame <= 100 ? frame + 1 : frame;

                if (frame <= 100) {
                    const p = initialCameraPosition;
                    const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20;

                    camera.position.y = 10;
                    camera.position.x =
                        p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
                    camera.position.z =
                        p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed);
                    camera.lookAt(target);
                } else {
                    controls.update();
                }

                renderer.render(scene, camera);
            };

            return () => {
                cancelAnimationFrame(req);
                renderer.dispose();
            };
        }
    }, []);

    return (
        <div
            style={{ height: "540px", width: "540px", position: "relative" }}
            ref={refContainer}
        >
            {loading && (
                <span style={{ position: "absolute", left: "50%", top: "50%" }}>
                    Loading...
                </span>
            )}
        </div>
    );
}
// const reflectorRotator=new THREE.Mesh({position:[0, -height / 2, 0], rotation:[-angle * (Math.PI / 180), 0, 0]})

// const reflectorMaterial = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide });
// const reflectorGeometry = new THREE.PlaneGeometry(width, mirrorLength, 2);
// const reflector = new THREE.Mesh(reflectorGeometry, reflectorMaterial);
// reflector.position.set(0, mirrorLength / 2, 0);
// reflector.name = 'reflector';

// const sunlightMaterial = new THREE.MeshStandardMaterial({ color: 'white', opacity: 1, transparent: true, side: THREE.DoubleSide });
// const sunlightGeometry = new THREE.PlaneGeometry(width, mirrorLength, 2);
// const sunlight = new THREE.Mesh(sunlightGeometry, sunlightMaterial);
// sunlight.position.set(0, lightDistY, lightDistZ);
// sunlight.name = 'sunlight';


export default function ThreeMain() {
    return (
        <div>
            <p>Click and hold to move around</p>
            <p>
                Lorem ipsum.
            </p>
            <TheScene />
        </div>
    )
}
