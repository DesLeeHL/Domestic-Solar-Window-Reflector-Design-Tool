import React from 'react';
import RangeSlider from '../utils/RangeSlider';
import GetSunPositionsData from '../calc/GetSunPositionsData';
import GetSunPositionsDataControls from "./GetSunPositionsDataControls";
import ErrorBoundary from "../utils/ErrorBoundary"

const ControlPanel = ({
    windowWidth, setWindowWidth,
    windowHeight, setWindowHeight,
    windowOrientation, setWindowOrientation,
    reflectorWidth, setReflectorWidth,
    reflectorLength, setReflectorLength,
    reflectorRotationX, setReflectorRotationX,
    reflectorRotationY, setReflectorRotationY,
    reflectorRotationZ, setReflectorRotationZ,
    reflectorPosX, setReflectorPosX,
    reflectorPosY, setReflectorPosY,
    reflectorPosZ, setReflectorPosZ,

    sunSize, setSunSize,
    azimuth, setAzimuth,
    elevation, setElevation,

    latitude, setLatitude,
    longitude, setLongitude,
    timezone, setTimezone,
    mode, setMode,

    startYear, setStartYear,
    startMonth, setStartMonth,
    startDay, setStartDay,
    endYear, setEndYear,
    endMonth, setEndMonth,
    endDay, setEndDay,
    sunPositions, setSunPositions,
    // date, time, solarNoon, sunrise, sunset,
    // runSunMovementSimulation,
    renderInterval, setRenderInterval,
    updateSunPosition
}) => {
    // All controls and related state management code
    // ...
    return (
        <div className='Controls'>
            {/* All controls components */}
            {/* ... */}
            <label htmlFor="latitude">Latitude: </label>
            <input
                type="number"
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(parseFloat(e.target.value))}
            />
            <br />
            <label htmlFor="longitude">Longitude: </label>
            <input
                type="number"
                id="longitude"
                value={longitude}
                onChange={(e) => setLongitude(parseFloat(e.target.value))}
            />
            <ErrorBoundary>
                {/* <SunPosition
                setSunPositions={setSunPositions}
                latitude={latitude}
                setLatitude={setLatitude}
                longitude={longitude}
                setLongitude={setLongitude}
                timezone={timezone}
                setTimezone={setTimezone}
              /> */}
                <GetSunPositionsDataControls
                    mode={mode}
                    setMode={setMode}
                    startYear={startYear}
                    setStartYear={setStartYear}
                    startMonth={startMonth}
                    setStartMonth={setStartMonth}
                    startDay={startDay}
                    setStartDay={setStartDay}
                    endYear={endYear}
                    setEndYear={setEndYear}
                    endMonth={endMonth}
                    setEndMonth={setEndMonth}
                    endDay={endDay}
                    setEndDay={setEndDay}
                    setSunPositions={setSunPositions}
                />
                <GetSunPositionsData
                    setSunPositions={setSunPositions}
                    latitude={latitude}
                    setLatitude={setLatitude}
                    longitude={longitude}
                    setLongitude={setLongitude}
                    timezone={timezone}
                    setTimezone={setTimezone}
                    mode={mode}
                    startYear={startYear}
                    endYear={endYear}
                    startMonth={startMonth}
                    endMonth={endMonth}
                    startDay={startDay}
                    endDay={endDay}
                />
            </ErrorBoundary>

            {/* <button onClick={() => window.updateSunPositionDataOnClick()}>
                Run Sun Movement Simulation
            </button>
             */}

            <button onClick={updateSunPosition}>Run Simulation</button>

            <label htmlFor="timezone">Time Zone: </label>
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
    );
};

export default ControlPanel;
