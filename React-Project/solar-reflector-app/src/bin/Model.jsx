import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { DoubleSide } from 'three';
import SunPosition from "../calc/SunPosition";

import sunpos from "../calc/sunpos";
import { getSunTimes, getSunPos } from '../calc/suncalc';
import SunAnimation from './SunAnimation'
import ErrorBoundary from "../utils/ErrorBoundary"
import RangeSlider from '../utils/RangeSlider';
function Model(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef();
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

    useEffect(() => {
        const date = new Date(2022, 10, 1); // Test for October 1, 2022
        const latitude = 0;
        const longitude = 0;

        const [solarNoon, sunriseEnd, sunsetStart] = getSunTimes(
            date,
            latitude,
            longitude
        );

        console.log("Test getSunTimes:");
        console.log("Solar Noon:", solarNoon);
        console.log("Sunrise End:", sunriseEnd);
        console.log("Sunset Start:", sunsetStart);
    }, []);
 
    const [sunPositions, setSunPositions] = useState([]);

    return (
        <>

            <Canvas style={canvasStyle}>
                {/* <ErrorBoundary>
                    <SunPosition setSunPositions={setSunPositions} />
                    <SunAnimation sunPositions={sunPositions} />
                </ErrorBoundary> */}
                {/* <OrthographicCamera /> */}
                <pointLight position={[10, 10, 10]} />
                <ambientLight />
                <mesh
                    {...props}
                    ref={ref}
                >
                    {/* WINDOW */}
                    <boxGeometry args={[width, height, 0.5]} />
                    <meshStandardMaterial
                        wireframe={true}
                        color={"orange"}
                    />
                    {/**Up Down indicator */}
                    <mesh position={[0, 1, 0]}>
                        <coneGeometry args={[0.2, 5, 3]} />
                        <meshStandardMaterial />
                    </mesh>

                    {/* TODO: Perpendicular cone to indicate inside and outside
                    <mesh position={[0, 0, 1]}>
                        <coneGeometry args={[0.2, 5, 3]} />
                        <meshStandardMaterial />
                    </mesh> */}
                    {/* REFLECTOR */}
                    <mesh position={[0, -height / 2, 0]} rotation={[-angle * (Math.PI / 180), 0, 0]}>
                        {/* REFLECTOR */}
                        <mesh position={[0, mirrorLength / 2, 0]}>
                            <planeGeometry args={[width, mirrorLength, 2]} />
                            <meshStandardMaterial side={DoubleSide} />
                        </mesh>
                        {/* SYMMETRY PLANE */}
                        <mesh position={[0, mirrorLength / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
                            <planeGeometry args={[height, width, 2]} />
                            <meshStandardMaterial color={"white"} opacity={0.2} transparent={true} side={DoubleSide} />
                        </mesh>
                        {/* PARALLEL PLANE FOR SUNLIGHT */}
                        <mesh position={[0, lightDistY, lightDistZ]}>
                            <planeGeometry args={[width, mirrorLength, 2]} />
                            <meshStandardMaterial color={'white'} opacity={1} transparent={true} side={DoubleSide} />
                        </mesh>

                    </mesh>

                </mesh>
                <OrbitControls />

                <OrthographicCamera
                    makeDefault
                    zoom={10}
                    top={500}
                    bottom={-500}
                    left={500}
                    right={-500}
                    near={1}
                    far={800}
                    position={[10, 10, 100]}
                />

            </Canvas>



            <div style={{ display: "flex", flexDirection: "column" }}>

                <RangeSlider
                    label='Model Width:'
                    id='width-slider'
                    min={1}
                    max={20}
                    value={width}
                    onChange={e => setWidth(e.target.value)}
                    unit=''
                />
                <RangeSlider
                    label='Model Height:'
                    id='height-slider'
                    min={1}
                    max={20}
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    unit=''
                />
                <RangeSlider
                    label='Reflector Angle:'
                    id='angle-slider'
                    min={0}
                    max={180}
                    value={angle}
                    onChange={e => setAngle(e.target.value)}
                    unit='°'
                />
                <RangeSlider
                    label='Reflector Length:'
                    id='mirror-length-slider'
                    min={0}
                    max={height}
                    value={mirrorLength}
                    onChange={e => setMirrorLength(e.target.value)}
                    unit=''
                />
                <RangeSlider
                    label='Y Distance of Light Simulation Plane:'
                    id='light-dist-y-slider'
                    min={0}
                    max={50}
                    value={lightDistY}
                    onChange={e => setLightDistY(e.target.value)}
                    unit=''
                />
                <RangeSlider
                    label='Z Distance of Light Simulation Plane:'
                    id='light-dist-z-slider'
                    min={0}
                    max={50}
                    value={lightDistZ}
                    onChange={e => setLightDistZ(e.target.value)}
                    unit=''
                />
            </div>
            {/* <div style={{ display: "flex", alignItems: "center" }}>
                    Zoom: 
                </div> */}
        </>
    );
}

export default Model;
