import "./App.css";
import React, { useState, useEffect } from 'react';
import MainScene from './component/MainScene';

// import ErrorBoundary from "./utils/ErrorBoundary"

import ControlPanel from "./controls/ControlPanel";
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

  const [currentDate, setCurrentDate] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [timezone, setTimezone] = useState(0);
  const [solarNoon, setSolarNoon] = useState();
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [renderInterval, setRenderInterval] = useState(100);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [mode, setMode] = useState("daily");
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [startMonth, setStartMonth] = useState(new Date().getMonth() + 1);
  const [startDay, setStartDay] = useState(new Date().getDate());
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [endMonth, setEndMonth] = useState(new Date().getMonth() + 2);
  const [endDay, setEndDay] = useState(new Date().getDate());

  function DateTimeInfo({ date, time, solarNoon, sunrise, sunset }) {
    return (
      <div>
        <p>Current Date: {date ? date : "N/A"}</p>
        <p>Current Time: {time ? time + timezone : "N/A"}</p>
        <p>Solar Noon: {solarNoon ? `${solarNoon.getHours() + timezone}:${solarNoon.getMinutes()} UTC${timezone >= 0 ? "+" + timezone : "-" + timezone}` : "N/A"}</p>
        <p>Sunrise: {sunrise ? `${sunrise.getHours() + timezone}:${sunrise.getMinutes()} UTC${timezone >= 0 ? "+" + timezone : "-" + timezone}` : "N/A"}</p>
        <p>Sunset: {sunset ? `${sunset.getHours() + timezone}:${sunset.getMinutes()} UTC${timezone >= 0 ? "+" + timezone : "-" + timezone}` : "N/A"}</p>

      </div>
    );
  }

  function LocationInfo({ latitude, longitude, timezone }) {
    return (
      <div>
        <p>Latitude: {latitude ? latitude.toFixed(6) : "N/A"}</p>
        <p>Longitude: {longitude ? longitude.toFixed(6) : "N/A"}</p>
        <p>Timezone: {timezone !== undefined ? `UTC${timezone >= 0 ? "+" + timezone : "-" + timezone}` : "N/A"}</p>
      </div>
    );
  }

  const updateSunPosition = (sunPositions, renderInterval) => {
    let updateInterval;

    const updateAtIndex = (index) => {
      if (index < sunPositions.length) {
        const position = sunPositions[index];
        setAzimuth(position.azimuth);
        setElevation(position.elevation);
        setCurrentDate(position.date);
        setCurrentTime(position.time);
        setSolarNoon(position.solarNoon);
        setSunrise(position.sunriseStartTime);
        setSunset(position.sunsetEndTime);
        setLatitude(position.latitude);
        setLongitude(position.longitude);

        updateInterval = setTimeout(() => updateAtIndex(index + 1), renderInterval);
      }
    };

    if (sunPositions.length > 0) {
      clearTimeout(updateInterval);
      updateAtIndex(0);
    }

    return () => {
      clearTimeout(updateInterval);
    };
  };



  function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }

  useEffect(() => {
    getCurrentLocation()
      .then((location) => {
        setLatitude(location.latitude);
        setLongitude(location.longitude);
      })
    return () => {
    }
  }, [])

  // useEffect(() => {


  //   // update azimuth and elevation based on sunPositions
  //   const updateSunPositionData = () => {
  //     sunPositions.forEach((position, index) => {
  //       setTimeout(() => {
  //         setAzimuth(position.azimuth);
  //         setElevation(position.elevation);
  //         setCurrentDate(position.date);
  //         setCurrentTime(position.time);
  //         setSolarNoon(position.solarNoon);
  //         setSunrise(position.sunriseStartTime);
  //         setSunset(position.sunsetEndTime);
  //         setLatitude(position.latitude);
  //         setLongitude(position.longitude);
  //       }, renderInterval);
  //     });
  //   };
  //   // run the function on button click
  //   const updateSunPositionDataOnClick = () => {
  //     if (sunPositions.length > 0) {
  //       updateSunPositionData();
  //       console.log("Render rate: " + renderInterval)
  //     } else {
  //       alert("No sun position data available");
  //     }
  //   };
  //   // register the function to window object
  //   window.updateSunPositionDataOnClick = updateSunPositionDataOnClick;
  //   // clean up function to remove the function from window object
  //   return () => {
  //     delete window.updateSunPositionDataOnClick;
  //   }
  // }, [sunPositions,renderInterval]);

  return (
    <>
      <div className="App">
        <div className="App-container">
          <section className='App-header'>
            Domestic Solar Window Reflector Design Tool
          </section>
          <section className='App-body'>
            <div className='Controls'>
              <ControlPanel
                windowWidth={windowWidth} setWindowWidth={setWindowWidth}
                windowHeight={windowHeight} setWindowHeight={setWindowHeight}
                windowOrientation={windowOrientation} setWindowOrientation={setWindowOrientation}
                reflectorWidth={reflectorWidth} setReflectorWidth={setReflectorWidth}
                reflectorLength={reflectorLength} setReflectorLength={setReflectorLength}
                reflectorRotationX={reflectorRotationX} setReflectorRotationX={setReflectorRotationX}
                reflectorRotationY={reflectorRotationY} setReflectorRotationY={setReflectorRotationY}
                reflectorRotationZ={reflectorRotationZ} setReflectorRotationZ={setReflectorRotationZ}
                reflectorPosX={reflectorPosX} setReflectorPosX={setReflectorPosX}
                reflectorPosY={reflectorPosY} setReflectorPosY={setReflectorPosY}
                reflectorPosZ={reflectorPosZ} setReflectorPosZ={setReflectorPosZ}

                sunSize={sunSize} setSunSize={setSunSize}
                azimuth={azimuth} setAzimuth={setAzimuth}
                elevation={elevation} setElevation={setElevation}

                latitude={latitude} setLatitude={setLatitude}
                longitude={longitude} setLongitude={setLongitude}
                timezone={timezone} setTimezone={setTimezone}
                mode={mode} setMode={setMode}

                startYear={startYear} setStartYear={setStartYear}
                startMonth={startMonth} setStartMonth={setStartMonth}
                startDay={startDay} setStartDay={setStartDay}
                endYear={endYear} setEndYear={setEndYear}
                endMonth={endMonth} setEndMonth={setEndMonth}
                endDay={endDay} setEndDay={setEndDay}
                sunPositions={sunPositions} setSunPositions={setSunPositions}
                // date={date} time={time} solarNoon={solarNoon} sunrise={sunrise} sunset={sunset}
                // getCurrentLocation={getCurrentLocation}
                renderInterval={renderInterval} setRenderInterval={setRenderInterval}
                updateSunPosition={() => updateSunPosition(sunPositions, renderInterval)}
              />
              <DateTimeInfo
                date={currentDate}
                time={currentTime}
                solarNoon={solarNoon}
                sunrise={sunrise}
                sunset={sunset}
                timezone={timezone}
              />
              <LocationInfo
                latitude={latitude}
                longitude={longitude}
                timezone={timezone}
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
          </section>
        </div>
      </div>

    </>
  );
}

export default App;