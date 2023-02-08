import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { DoubleSide } from 'three';

function Model(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef();
    // Hold state for hovered and clicked events
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(15);
    const [angle, setAngle] = useState(45);
    const [mirrorLength, setMirrorLength] = useState(15)
    const canvasStyle = {
        width: "100vw",
        height: "100vh",
        position: "relative",
        top: 0,
        left: 0,
    };
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
                    <mesh position={[0, -height / 2,0]} rotation={[-angle*(Math.PI / 180), 0, 0]}>
                        <mesh position={[0,mirrorLength/2,0]}>
                            <planeGeometry args={[width, mirrorLength, 2]} />
                            <meshStandardMaterial side={DoubleSide}/>
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
                {/* <div style={{ display: "flex", alignItems: "center" }}>
                    Zoom: 
                </div> */}
            </div>
        </>
    );
}

export default Model;
