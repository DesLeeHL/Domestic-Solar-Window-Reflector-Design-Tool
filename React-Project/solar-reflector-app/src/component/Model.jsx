import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { DoubleSide } from 'three';
import SunPosition from "../calc/SunPosition";

import sunpos from "../calc/sunpos";
import { getSunTimes, getSunPos } from '../calc/suncalc';

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

    // //SUNPOS and SunCal solar noon
    // useEffect(() => {
    //     const location = [0, -120]; // Set your desired location
    //     const refraction = false;
    //     const results = [];

    //     const startYear = 2022;
    //     const endYear = 2022;
    //     const startMonth = 10;
    //     const endMonth = 10;
    //     console.log("SUNPOS")
    //     for (let year = startYear; year <= endYear; year++) {
    //         const start = year === startYear ? startMonth : 1;
    //         const end = year === endYear ? endMonth : 12;

    //         for (let month = start; month <= end; month++) {
    //             const daysInMonth = new Date(Date.UTC(year, month, 0)).getDate();

    //             for (let day = 1; day <= daysInMonth; day++) {
    //                 const date = new Date(Date.UTC(year, month - 1, day + 1)); //idk why day+1
    //                 const [solarNoon, sunriseEndTime, sunsetStartTime] = getSunTimes(date, location[0], location[1]);

    //                 const hour = solarNoon.getUTCHours();
    //                 const minute = solarNoon.getUTCMinutes();
    //                 const second = solarNoon.getUTCSeconds();
    //                 const timezone = 0; // Since we're working with UTC, the timezone offset is always 0

    //                 const when = [year, month, day, hour, minute, second, timezone];
    //                 // const when = [year, month, day, 12, 0, 0, timezone];

    //                 // const [azimuthPre, elevationPre] = sunpos([year, month, day, hour, minute-2, second, timezone, location, refraction],location, refraction);
    //                 // NOT REALLY SOLAR NOON, NEED TO OPTIMISE
    //                 const [azimuth, elevation] = sunpos(when, location, refraction);
    //                 // const [azimuthPost, elevationPost] = sunpos([year, month, day, hour, minute+2, second, timezone, location, refraction],location, refraction);

    //                 const monthString = (month).toString().padStart(2, '0');
    //                 results.push({
    //                     date: `${year}-${monthString}-${day.toString().padStart(2, '0')}`,
    //                     azimuth,
    //                     elevation,
    //                     timezone,
    //                     solarNoon,
    //                     sunriseEndTime, sunsetStartTime,
    //                 });
    //             }
    //         }
    //     }

    //     console.log(results);
    // }, []);

    // //SUNCALC
    // useEffect(() => {
    //     const location = [0, -120]; // Set your desired location
    //     const results = [];

    //     const startYear = 2022;
    //     const endYear = 2023;
    //     const startMonth = 10;
    //     const endMonth = 3;
    //     console.log("SUNCALC")
    //     for (let year = startYear; year <= endYear; year++) {
    //         const start = year === startYear ? startMonth : 1;
    //         const end = year === endYear ? endMonth : 12;

    //         for (let month = start; month <= end; month++) {
    //             const daysInMonth = new Date(Date.UTC(year, month, 0)).getDate();

    //             for (let day = 1; day <= daysInMonth; day++) {
    //                 const date = new Date(Date.UTC(year, month - 1, day + 1));
    //                 const [solarNoon, sunriseEndTime, sunsetStartTime] = getSunTimes(date, location[0], location[1]);

    //                 const hour = solarNoon.getUTCHours();
    //                 const minute = solarNoon.getUTCMinutes();
    //                 const second = solarNoon.getUTCSeconds();
    //                 const timezone = -8; // Set the desired timezone offset

    //                 // const when = [year, month, day, hour, minute, second, timezone];
    //                 const when = new Date(year, month - 1, day, hour, minute, second);

    //                 const [azimuth, elevation] = getSunPos(when, location[0], location[1]);

    //                 const monthString = (month).toString().padStart(2, '0');
    //                 results.push({
    //                     date: `${year}-${monthString}-${day.toString().padStart(2, '0')}`,
    //                     azimuth,
    //                     elevation,
    //                     timezone,
    //                     solarNoon,
    //                     sunriseEndTime, sunsetStartTime,
    //                 });
    //             }
    //         }
    //     }

    //     console.log(results);
    // }, []);

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
    // //SUNCALC

    // useEffect(() => {
    //     const location = [0, 0]; // Set your desired location
    //     const results = [];

    //     const startYear = 2022;
    //     const endYear = 2023;
    //     const startMonth = 10;
    //     const endMonth = 3;
    //     console.log("SUNCALC (frm pkg)");

    //     for (let year = startYear; year <= endYear; year++) {
    //       const start = year === startYear ? startMonth : 1;
    //       const end = year === endYear ? endMonth : 12;

    //       for (let month = start; month <= end; month++) {
    //         const daysInMonth = new Date(year, month, 0).getDate();

    //         for (let day = 1; day <= daysInMonth; day++) {
    //           const when = new Date(year, month - 1, day, 12, 0, 0); // Every day at noon, adjust the timezone as needed
    //           const sunPos = getSunPos(when, location[0], location[1]);
    //           const [azimuth, altitude] = [sunPos[0], sunPos[1]];

    //           results.push({
    //             date: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
    //             azimuth,
    //             elevation: altitude
    //           });
    //         }
    //       }
    //     }

    //     console.log(results);
    //   }, []);

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

    return (
        <>

            <Canvas style={canvasStyle}>
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
            <div className="App">
                <SunPosition />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <label htmlFor="width-slider">Model Width:</label>
                    <input
                        id="width-slider"
                        type="range"
                        min={1}
                        max={20}
                        value={width}
                        onChange={e => setWidth(e.target.value)}
                        style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                    />
                    <span>{width}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <label htmlFor="height-slider">Model Height:</label>
                    <input
                        id="height-slider"
                        type="range"
                        min={1}
                        max={20}
                        value={height}
                        onChange={e => setHeight(e.target.value)}
                        style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                    />
                    <span>{height}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <label htmlFor="height-slider">Reflector Angle:</label>
                    <input
                        id="height-slider"
                        type="range"
                        min={0}
                        max={180}
                        value={angle}
                        onChange={e => setAngle(e.target.value)}
                        style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                    />
                    <span>{angle}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <label htmlFor="height-slider">Reflecor Length:</label>
                    <input
                        id="height-slider"
                        type="range"
                        min={0}
                        max={height}
                        value={mirrorLength}
                        onChange={e => setMirrorLength(e.target.value)}
                        style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                    />
                    <span>{mirrorLength}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <label htmlFor="height-slider">Y Distance of Light Simulation Plane:</label>
                    <input
                        id="height-slider"
                        type="range"
                        min={0}
                        max={50}
                        value={lightDistY}
                        onChange={e => setLightDistY(e.target.value)}
                        style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                    />
                    <span>{lightDistY}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <label htmlFor="height-slider">Z Distance of Light Simulation Plane:</label>
                    <input
                        id="height-slider"
                        type="range"
                        min={0}
                        max={50}
                        value={lightDistZ}
                        onChange={e => setLightDistZ(e.target.value)}
                        style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
                    />
                    <span>{lightDistZ}</span>
                </div>
                {/* <div style={{ display: "flex", alignItems: "center" }}>
                    Zoom: 
                </div> */}
            </div>
        </>
    );
}

export default Model;
