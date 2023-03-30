import "./App.css";
import React, { useState, useEffect } from 'react';
import RangeSlider from './utils/RangeSlider';
import MainScene from './component/MainScene';
import SunPosition from "./calc/SunPosition";
import ErrorBoundary from "./utils/ErrorBoundary"
function App() {
  const [windowWidth, setWindowWidth] = useState(20);
  const [windowHeight, setWindowHeight] = useState(10);
  const [windowOrientation, setWindowOrientation] = useState(0);

  const [reflectorWidth, setReflectorWidth] = useState(20);
  const [reflectorLength, setReflectorLength] = useState(10);
  const [reflectorRotationX, setReflectorRotationX] = useState(90);
  const [reflectorRotationY, setReflectorRotationY] = useState(0);
  const [reflectorRotationZ, setReflectorRotationZ] = useState(0);
  const [reflectorPosX, setReflectorPosX] = useState(0);
  const [reflectorPosY, setReflectorPosY] = useState(5);
  const [reflectorPosZ, setReflectorPosZ] = useState(-windowHeight / 2);

  const [sunSize, setSunSize] = useState(10);
  const [azimuth, setAzimuth] = useState(90);
  const [elevation, setElevation] = useState(80);

  const [sunPositions, setSunPositions] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [timezone, setTimezone] = useState(0);
  const [solarNoon, setSolarNoon] = useState();
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [renderInterval, setRenderInterval] = useState(10);

  function DateTimeInfo({ date, time, solarNoon, sunrise, sunset }) {
    return (
      <div>
        <p>Current Date: {date ? date : "N/A"}</p>
        <p>Current Time: {time ? time + timezone : "N/A"}</p>
        <p>Solar Noon: {solarNoon ? `${solarNoon.getHours() + timezone}:${solarNoon.getMinutes()} UTC${timezone > 0 ? "+" + timezone : "-" + timezone}` : "N/A"}</p>
        <p>Sunrise: {sunrise ? `${sunrise.getHours() + timezone}:${sunrise.getMinutes()} UTC${timezone >= 0 ? "+" + timezone : "-" + timezone}` : "N/A"}</p>
        <p>Sunset: {sunset ? `${sunset.getHours() + timezone}:${sunset.getMinutes()} UTC${timezone >= 0 ? "+" + timezone : "-" + timezone}` : "N/A"}</p>

      </div>
    );
  }

  useEffect(() => {
    // update azimuth and elevation based on sunPositions
    const updateSunPositionData = () => {
      sunPositions.forEach((position, index) => {
        setTimeout(() => {
          setAzimuth(position.azimuth);
          setElevation(position.elevation);
          setDate(position.date);
          setTime(position.time);
          setSolarNoon(position.solarNoon);
          setSunrise(position.sunriseStartTime);
          setSunset(position.sunsetEndTime);
        }, renderInterval * index);
      });
    };
    // run the function on button click
    const updateSunPositionDataOnClick = () => {
      if (sunPositions.length > 0) {
        updateSunPositionData();
      } else {
        alert("No sun position data available");
      }
    };
    // register the function to window object
    window.updateSunPositionDataOnClick = updateSunPositionDataOnClick;
    // clean up function to remove the function from window object
    return () => {
      delete window.updateSunPositionDataOnClick;
    }
  }, [sunPositions]);

  return (
    <>
      <section className='App-header'>
        Domestic Solar Window Reflector Design Tool
      </section>
      <section className='App-body'>

        <div>
          <div className='Controls'>
            <ErrorBoundary>
              <SunPosition setSunPositions={setSunPositions} />
            </ErrorBoundary>
            <button onClick={() => window.updateSunPositionDataOnClick()}>
              Run Sun Movement Simulation
            </button>
            <label htmlFor="latitude">Time Zone: </label>
            <input
              type="number"
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(parseFloat(e.target.value))}
            />
            <label htmlFor="interval">Render Interval (ms): </label>
            <input
              type="number"
              id="interval"
              value={renderInterval}
              onChange={(e) => setRenderInterval(parseFloat(e.target.value))}
            />
            <DateTimeInfo
              date={date}
              time={time}
              solarNoon={solarNoon}
              sunrise={sunrise}
              sunset={sunset}
            />
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
          </div>
          <div className="MainScene">
            <MainScene
              windowWidth={windowWidth} windowHeight={windowHeight}
              windowOrientation={windowOrientation}

              reflectorWidth={reflectorWidth} reflectorLength={reflectorLength}
              reflectorRotationX={reflectorRotationX} reflectorRotationY={reflectorRotationY} reflectorRotationZ={reflectorRotationZ}
              reflectorPosX={reflectorPosX} reflectorPosY={reflectorPosY} reflectorPosZ={reflectorPosZ}

              sunSize={sunSize} azimuth={azimuth} elevation={elevation}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;