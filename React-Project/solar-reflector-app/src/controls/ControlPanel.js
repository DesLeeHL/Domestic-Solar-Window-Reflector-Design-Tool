import React from 'react';
import RangeSlider from '../utils/RangeSlider';
import GetSunPositionsData from '../calc/GetSunPositionsData';
import GetSunPositionsDataControls from "./GetSunPositionsDataControls";
import ErrorBoundary from "../utils/ErrorBoundary"

import Container from '@mui/material/Container';

import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import Button from '@mui/material/Button';
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
            <Container maxWidth="xs">

                <h1>Control Panel</h1>

                <FormControl sx={{ m: 1, width: '15ch' }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-latitude"
                        endAdornment={<InputAdornment position="end">°</InputAdornment>}
                        aria-describedby="outlined-latitude-helper-text"
                        inputProps={{
                            'aria-label': 'latitude',
                        }}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                    <FormHelperText id="outlined-helper-text">Latitude{windowWidth > 0 ? "" : "must be greater than 0!"}</FormHelperText>
                </FormControl>

                <FormControl sx={{ m: 1, width: '15ch' }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-longitude"
                        endAdornment={<InputAdornment position="end">°</InputAdornment>}
                        aria-describedby="outlined-longitude-helper-text"
                        inputProps={{
                            'aria-label': 'longitude',
                        }}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                    <FormHelperText id="outlined-helper-text">Longitude{windowHeight > 0 ? "" : "must be greater than 0!"}</FormHelperText>
                </FormControl>
                {/* <ErrorBoundary> */}
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
                {/* </ErrorBoundary> */}

                <FormControl sx={{ m: 1, width: '10ch' }} size="small">
                    <InputLabel id="demo-select-small-label">Timezone</InputLabel>
                    <Select
                        labelId="timezone"
                        id="timezone"
                        value={timezone}
                        label="timezone"
                        onChange={(e) => setTimezone(parseFloat(e.target.value))}
                    >
                        {Array.from({ length: 25 }, (_, index) => index - 12).map((value) => (
                            <MenuItem key={value} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <h2>Window Configuration</h2>
                <FormControl sx={{ m: 1, width: '15ch' }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-window-width"
                        endAdornment={<InputAdornment position="end">m</InputAdornment>}
                        aria-describedby="outlined-window-width-helper-text"
                        inputProps={{
                            'aria-label': 'window-width',
                        }}
                        onChange={(e) => setWindowWidth(e.target.value)}
                        error={windowWidth <= 0}
                    />
                    <FormHelperText id="outlined-helper-text">Window Width {windowWidth > 0 ? "" : "must be greater than 0!"}</FormHelperText>
                </FormControl>

                <FormControl sx={{ m: 1, width: '15ch' }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-window-height"
                        endAdornment={<InputAdornment position="end">m</InputAdornment>}
                        aria-describedby="outlined-window-height-helper-text"
                        inputProps={{
                            'aria-label': 'window-height',
                        }}
                        onChange={(e) => setWindowHeight(e.target.value)}
                        error={windowHeight <= 0}
                    />
                    <FormHelperText id="outlined-helper-text">Window Height {windowHeight > 0 ? "" : "must be greater than 0!"}</FormHelperText>
                </FormControl>

                <RangeSlider
                    label="Window Orientation"
                    id="window-orientation-slider"
                    min={0}
                    max={360}
                    value={windowOrientation}
                    unit="°"
                    onChange={(e) => setWindowOrientation(e.target.value)}
                />

                <h2>Reflector Configuration</h2>

                <FormControl sx={{ m: 1, width: '15ch' }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-reflector-width"
                        endAdornment={<InputAdornment position="end">m</InputAdornment>}
                        aria-describedby="outlined-reflector-width-helper-text"
                        inputProps={{
                            'aria-label': 'refelctor-width',
                        }}
                        onChange={(e) => setReflectorWidth(e.target.value)}
                        error={reflectorWidth <= 0}
                    />
                    <FormHelperText id="outlined-reflector-helper-text">Reflector Width {reflectorWidth > 0 ? "" : "must be greater than 0!"}</FormHelperText>
                </FormControl>


                <FormControl sx={{ m: 1, width: '15ch' }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-reflector-length"
                        endAdornment={<InputAdornment position="end">m</InputAdornment>}
                        aria-describedby="outlined-reflector-length-helper-text"
                        inputProps={{
                            'aria-label': 'refelctor-length',
                        }}
                        onChange={(e) => setReflectorLength(e.target.value)}
                        error={reflectorLength <= 0}
                    />
                    <FormHelperText id="outlined-reflector-helper-text">Reflector Length {reflectorLength > 0 ? "" : "must be greater than 0!"}</FormHelperText>
                </FormControl>
                <RangeSlider
                    label="Reflector Rotatio  X:"
                    id="reflectorRotationX-slider"
                    min={0}
                    max={360}
                    value={reflectorRotationX}
                    unit="°"
                    onChange={(e) => setReflectorRotationX(e.target.value)}
                />

                <RangeSlider
                    label="Reflector Rotation Y:"
                    id="reflectorRotationY-slider"
                    min={-180}
                    max={180}
                    value={reflectorRotationY}
                    unit="°"
                    onChange={(e) => setReflectorRotationY(e.target.value)}
                />

                <RangeSlider
                    label="Reflector Rotation Z:"
                    id="reflectorRotationZ-slider"
                    min={-180}
                    max={180}
                    unit="°"
                    value={reflectorRotationZ}
                    onChange={(e) => setReflectorRotationZ(e.target.value)}
                />

                <FormControl sx={{ m: 1, width: '10ch' }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-reflector-x"
                        endAdornment={<InputAdornment position="end">m</InputAdornment>}
                        aria-describedby="outlined-reflector-x-helper-text"
                        inputProps={{
                            'aria-label': 'refelctor-x',
                        }}
                        onChange={(e) => setReflectorPosX(e.target.value)}
                    />
                    <FormHelperText id="outlined-reflector-x-helper-text">Reflector X Position</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, height: '1ch', width: '10ch' }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-reflector-y"
                        endAdornment={<InputAdornment position="end">m</InputAdornment>}
                        aria-describedby="outlined-reflector-y-helper-text"
                        inputProps={{
                            'aria-label': 'refelctor-y',
                        }}
                        onChange={(e) => setReflectorPosY(e.target.value)}
                    />
                    <FormHelperText id="outlined-reflector-y-helper-text">Reflector Y Position</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, width: '10ch' }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-reflector-z"
                        endAdornment={<InputAdornment position="end">m</InputAdornment>}
                        aria-describedby="outlined-reflector-z-helper-text"
                        inputProps={{
                            'aria-label': 'refelctor-z',
                        }}
                        onChange={(e) => setReflectorPosZ(e.target.value)}
                    />
                    <FormHelperText id="outlined-reflector-z-helper-text">Reflector Z Position</FormHelperText>
                </FormControl>
                <br />
                <h2>Sunlight Movement Simulation<br />and<br />Reflected Light Area Computation</h2>
                <FormControl sx={{ m: 1, width: '15ch' }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-render-interval"
                        endAdornment={<InputAdornment position="end">ms</InputAdornment>}
                        aria-describedby="outlined-render-interval-helper-text"
                        inputProps={{
                            'aria-label': 'render-interval',
                        }}
                        onChange={(e) => setRenderInterval(parseFloat(e.target.value))}
                    />
                    <FormHelperText id="outlined-helper-text">Render Interval{renderInterval > 0 ? "" : "must be greater than 0!"}</FormHelperText>
                </FormControl>
                <Button
                    variant="contained"
                    onClick={updateSunPosition}
                >
                    Run Sunlight Movement Simulation
                </Button>
                <h2>Sun Position</h2>
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
                    unit="°"
                    onChange={(e) => setAzimuth(e.target.value)}
                />

                <RangeSlider
                    label="Elevation"
                    id="elevation-slider"
                    min={-90} max={90}
                    value={elevation}
                    unit="°"
                    onChange={(e) => setElevation(e.target.value)}
                />
            </Container>
        </div>
    );
};

export default ControlPanel;
