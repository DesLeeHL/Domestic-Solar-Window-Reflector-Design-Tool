import "./App.css";
import React, { useState } from 'react';
import RangeSlider from './utils/RangeSlider';
import MainScene from './component/MainScene';
import SunPosition from "./calc/SunPosition";
import ErrorBoundary from "./utils/ErrorBoundary"
function App() {
  const [windowWidth, setWindowWidth] = useState(10);
  const [windowHeight, setWindowHeight] = useState(10);
  const [windowOrientation, setWindowOrientation] = useState(0);

  const [reflectorWidth, setReflectorWidth] = useState(20);
  const [reflectorLength, setReflectorLength] = useState(5);
  const [reflectorRotationX, setReflectorRotationX] = useState(90);
  const [reflectorRotationY, setReflectorRotationY] = useState(0);
  const [reflectorRotationZ, setReflectorRotationZ] = useState(0);
  const [reflectorPosX, setReflectorPosX] = useState(0);
  const [reflectorPosY, setReflectorPosY] = useState(0);
  const [reflectorPosZ, setReflectorPosZ] = useState(-windowHeight / 2);

  const [sunSize, setSunSize] = useState(10);
  const [azimuth, setAzimuth] = useState(90);
  const [elevation, setElevation] = useState(80);

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
            label="Window Width:"
            id="windowWidth-slider"
            min={1} max={20}
            value={windowWidth}
            onChange={(e) => setWindowWidth(e.target.value)}
          />
          <RangeSlider
            label="WIndow Height:"
            id="windowHeight-slider"
            min={1} max={20}
            value={windowHeight}
            onChange={(e) => setWindowHeight(e.target.value)}
          />
          <RangeSlider
            label="Window Orientation"
            id="window-orientation-slider"
            min={0}
            max={360}
            value={windowOrientation}
            onChange={(e) => setWindowOrientation(e.target.value)}
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
          <RangeSlider
            label="Sun Size"
            id="sun-size-slider"
            min={0} max={100}
            value={sunSize}
            onChange={(e) => setSunSize(e.target.value)}
          />

          <RangeSlider
            label="Azimuth"
            id="azimuth-slider"
            min={0} max={360}
            value={azimuth}
            onChange={(e) => setAzimuth(e.target.value)}
          />

          <RangeSlider
            label="Elevation"
            id="elevation-slider"
            min={-90} max={90}
            value={elevation}
            onChange={(e) => setElevation(e.target.value)}
          />
          {/* <div className="MainScene"> */}
          <MainScene
            windowWidth={windowWidth} windowHeight={windowHeight}
            windowOrientation={windowOrientation}

            reflectorWidth={reflectorWidth} reflectorLength={reflectorLength}
            reflectorRotationX={reflectorRotationX} reflectorRotationY={reflectorRotationY} reflectorRotationZ={reflectorRotationZ}
            reflectorPosX={reflectorPosX} reflectorPosY={reflectorPosY} reflectorPosZ={reflectorPosZ}
            
            sunSize={sunSize} azimuth={azimuth} elevation={elevation}
          />
          {/* </div> */}
        </div>
      </section>
    </>
  );
}

export default App;