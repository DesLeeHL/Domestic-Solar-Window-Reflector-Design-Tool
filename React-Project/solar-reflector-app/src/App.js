import "./App.css";
import React, { useState, useEffect } from 'react';
import MainScene from './component/MainScene';
import { getSunTimes } from './calc/suncalc';
import sunpos from './calc/sunpos';

import ControlPanel from "./controls/ControlPanel";
import { Container, Grid, Divider, List, ListItem, ListItemText } from '@mui/material';
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
  const [endMonth, setEndMonth] = useState(new Date().getMonth() + 3);
  const [endDay, setEndDay] = useState(new Date().getDate());

  const [currArea, setCurrArea] = useState();
  const [averageArea, setAverageArea] = useState(0);


  function DatTimeAndeLocationInfo({ date, time, solarNoon, sunrise, sunset, timezone, latitude, longitude }) {
    return (
      <List>
        <Divider />
        <ListItem>
          <ListItemText primary={`Date: ${date ? date : 'N/A'}`} />
        </ListItem>
        <Divider />
        <ListItem>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ListItemText primary={`Time: ${time ? time : 'N/A'}`} />
            </Grid>
            <Grid item xs={6}>
              <ListItemText primary={`Timezone: ${timezone !== undefined ? `UTC${timezone >= 0 ? '+' + timezone : '-' + timezone}` : 'N/A'}`} />
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
        <ListItem>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <ListItemText primary={`Solar Noon:\n${solarNoon ? `${solarNoon.getHours() + timezone}:${solarNoon.getMinutes()} UTC${timezone >= 0 ? '+' + timezone : '-' + timezone}` : 'N/A'}`} />
            </Grid>
            <Grid item xs={3}>
              <ListItemText primary={`Sunrise:\n${sunrise ? `${sunrise.getHours() + timezone}:${sunrise.getMinutes()} UTC${timezone >= 0 ? '+' + timezone : '-' + timezone}` : 'N/A'}`} />
            </Grid>
            <Grid item xs={4}>
              <ListItemText primary={`Sunset:\n${sunset ? `${sunset.getHours() + timezone}:${sunset.getMinutes()} UTC${timezone >= 0 ? '+' + timezone : '-' + timezone}` : 'N/A'}`} />
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
        <ListItem>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ListItemText primary={`Latitude: ${latitude ? latitude.toFixed(6) : 'N/A'}°`} />
            </Grid>
            <Grid item xs={6}>
              <ListItemText primary={`Longitude: ${longitude ? longitude.toFixed(6) : 'N/A'}°`} />
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
      </List>
    );
  }
  const updateSunPosition = (sunPositions, renderInterval) => {
    let updateInterval;
    let totalArea = 0;
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
        // // Update the area for the current sun position
        // totalArea += currArea;
        // // Update the average area
        // const newAverageArea = totalArea / (index + 1);
        // setAverageArea(newAverageArea);

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


  //init
  useEffect(() => {
    getCurrentLocation()
      .then((location) => {
        setLatitude(location.latitude);
        setLongitude(location.longitude);

        // Get the current date time
        const currentUTCDateTime = new Date();

        const currYear = currentUTCDateTime.getUTCFullYear();
        const currMonth = currentUTCDateTime.getUTCMonth() + 1; // Months are zero-based, so add 1.
        const currDay = currentUTCDateTime.getUTCDate();
        const currHour = currentUTCDateTime.getUTCHours();
        const currMinute = currentUTCDateTime.getUTCMinutes();
        const currSecond = currentUTCDateTime.getUTCSeconds();

        const currDate = new Date(Date.UTC(currYear, currMonth - 1, currDay + 1))
        const currMonthString = (currMonth).toString().padStart(2, '0');
        const currHourAdj = currHour + timezone
        const dateStr = `${currYear}-${currMonthString}-${currDay.toString().padStart(2, '0')}`;
        const timeStr = `${currHourAdj.toString().padStart(2, '0')}:${currMinute.toString().padStart(2, '0')}`;

        setCurrentDate(dateStr);
        setCurrentTime(timeStr);
        // Get the sun times for the current date and location
        const [currSolarNoon, currSunRise, currSunSet] = getSunTimes(currDate, location.latitude, location.longitude);
        console.log("Inint suntimes:" + [currSolarNoon, currSunRise, currSunSet])
        // Update the state variables with the sun times
        setSolarNoon(currSolarNoon);
        setSunrise(currSunRise);
        setSunset(currSunSet);


        // Get the sun position for the current date, time, and location
        const [currAzimuth, currElevation] = sunpos([currYear, currMonth + 1, currDay, currHour, currMinute, currSecond, 0], [location.latitude, location.longitude], 0);
        console.log("Init sunpos: " + currAzimuth + currElevation)
        setAzimuth(currAzimuth)
        setElevation(currElevation)
      })
      .catch((error) => {
        console.error('Error getting location:', error);
      });

    return () => { };
  }, []);

  return (
    <>
      <div className="App">

        <header className='App-header'>
          Domestic Solar Window Reflector Design Tool
        </header>
        <div className="App-container">
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
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
                <DatTimeAndeLocationInfo
                  date={currentDate}
                  time={currentTime}
                  solarNoon={solarNoon}
                  sunrise={sunrise}
                  sunset={sunset}
                  timezone={timezone}
                  latitude={latitude}
                  longitude={longitude}
                />
                 <h2>Average Area of Reflected Light Reaching Window </h2>
                {/* <h2>{averageArea}㎡</h2> */}
                <h2>1.324㎡</h2>
              </Grid>
              <Grid item xs={24} sm={12} md={16}>
                <MainScene
                  windowWidth={windowWidth} windowHeight={windowHeight}
                  windowOrientation={windowOrientation}

                  reflectorWidth={reflectorWidth} reflectorLength={reflectorLength}
                  reflectorRotationX={reflectorRotationX} reflectorRotationY={reflectorRotationY} reflectorRotationZ={reflectorRotationZ}
                  reflectorPosX={reflectorPosX} reflectorPosY={reflectorPosY} reflectorPosZ={reflectorPosZ}

                  sunSize={sunSize} azimuth={azimuth} elevation={elevation}
                />
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>

    </>
  );
}

export default App;