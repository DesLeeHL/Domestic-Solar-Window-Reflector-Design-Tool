import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import Cylinder3d from "./component/Cylinder3d";
import Model from "./component/Model";
import React, { useState } from 'react';
import RangeSlider from './utils/RangeSlider';
import MainScene from './component/MainScene';
import SunPosition from "./calc/SunPosition";
import ErrorBoundary from "./utils/ErrorBoundary"
function App() {
  const [windowWidth, setWindowWidth] = useState(10);
  const [windowHeight, setWindowHeight] = useState(10);
  const [reflectorWidth, setReflectorWidth] = useState(20);
  const [reflectorLength, setReflectorLength] = useState(5);
  const [reflectorRotationX, setReflectorRotationX] = useState(90);
  const [reflectorRotationY, setReflectorRotationY] = useState(0);
  const [reflectorRotationZ, setReflectorRotationZ] = useState(0);
  const [reflectorPosX, setReflectorPosX] = useState(0);
  const [reflectorPosY, setReflectorPosY] = useState(0);
  const [reflectorPosZ, setReflectorPosZ] = useState(-windowHeight / 2);

  return (
    <>
      <section className='App-header'>
        Domestic Solar Window Reflector Design Tool
      </section>
      <section className='App-body'>
        {/* <Model/> */}
        <div>
          <ErrorBoundary><SunPosition /></ErrorBoundary>


          <RangeSlider
            label="Model Width:"
            id="windowWidth-slider"
            min={1} max={20}
            value={windowWidth}
            onChange={(e) => setWindowWidth(e.target.value)}
          />
          <RangeSlider
            label="Model Height:"
            id="windowHeight-slider"
            min={1} max={20}
            value={windowHeight}
            onChange={(e) => setWindowHeight(e.target.value)}
          />
          <RangeSlider
            label="Reflector Rotation X:"
            id="reflectorRotationX-slider"
            min={0}
            max={360}
            value={reflectorRotationX}
            onChange={(e) => setReflectorRotationX(e.target.value)}
          />

          <RangeSlider
            label="Reflector Rotation Y:"
            id="reflectorRotationY-slider"
            min={-180}
            max={180}
            value={reflectorRotationY}
            onChange={(e) => setReflectorRotationY(e.target.value)}
          />

          <RangeSlider
            label="Reflector Rotation Z:"
            id="reflectorRotationZ-slider"
            min={-180}
            max={180}
            value={reflectorRotationZ}
            onChange={(e) => setReflectorRotationZ(e.target.value)}
          />


          <RangeSlider
            label="Reflector Width"
            id="reflector-width-slider"
            min={0} max={20}
            value={reflectorWidth}
            onChange={(e) => setReflectorWidth(e.target.value)}
          />
          <RangeSlider
            label="Reflector Length:"
            id="reflector-length-slider"
            min={0} max={20}
            value={reflectorLength}
            onChange={(e) => setReflectorLength(e.target.value)}
          />
          <RangeSlider
            label="Reflector Position X:"
            id="reflectorPosX-slider"
            min={-20}
            max={20}
            value={reflectorPosX}
            onChange={(e) => setReflectorPosX(e.target.value)}
          />

          <RangeSlider
            label="Reflector Position Y:"
            id="reflectorPosY-slider"
            min={-20}
            max={20}
            value={reflectorPosY}
            onChange={(e) => setReflectorPosY(e.target.value)}
          />

          <RangeSlider
            label="Reflector Position Z:"
            id="reflectorPosZ-slider"
            min={-20}
            max={20}
            value={reflectorPosZ}
            onChange={(e) => setReflectorPosZ(e.target.value)}
          />
          <MainScene
            windowWidth={windowWidth}
            windowHeight={windowHeight}
            reflectorWidth={reflectorWidth}
            reflectorLength={reflectorLength}
            reflectorRotationX={reflectorRotationX}
            reflectorRotationY={reflectorRotationY}
            reflectorRotationZ={reflectorRotationZ}
            reflectorPosX={reflectorPosX}
            reflectorPosY={reflectorPosY}
            reflectorPosZ={reflectorPosZ}
          />
        </div>
      </section>
    </>
  );
}

export default App;