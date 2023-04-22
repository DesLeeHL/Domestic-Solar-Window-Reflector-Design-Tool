import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// // import { LocalizationProvider } from '@mui/x-date-pickers';
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// // import DateAdapter from '@mui/lab/AdapterDateFns';
// import { LocalizationProvider, DatePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';

// import TextField from '@mui/material/TextField';

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

function GetSunPositionsDataControls({
    sunPositions,
    setSunPositions,
    mode,
    setMode,
    startYear,
    setStartYear,
    startMonth,
    setStartMonth,
    startDay,
    setStartDay,
    endYear,
    setEndYear,
    endMonth,
    setEndMonth,
    endDay,
    setEndDay,
}) {
    const handleMode = () => {
        setMode(mode === 'daily' ? 'minutely' : 'daily');
        setSunPositions(null);
    };

    return (
        <div>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
            <h2>Select a Mode:</h2>
            <ToggleButtonGroup
                color="primary"
                value={mode}
                exclusive
                onChange={handleMode}
                aria-label="Platform"
            >
                <ToggleButton value="daily">Daily</ToggleButton>
                <ToggleButton value="minutely">Minutely</ToggleButton>
            </ToggleButtonGroup>
            <h2>Date Range</h2>
            {mode === 'daily' ? (
                <>
                    <label htmlFor="startYear">Start Date: </label>
                    <DatePicker
                        selected={new Date(Date.UTC(startYear, startMonth - 1, startDay))}
                        onChange={date => {
                            setStartYear(date.getUTCFullYear());
                            setStartMonth(date.getUTCMonth() + 1);
                            setStartDay(date.getUTCDate());
                        }}
                    />
                    <label htmlFor="endYear">End Date: </label>
                    <DatePicker
                        selected={new Date(Date.UTC(endYear, endMonth - 1, endDay))}
                        onChange={date => {
                            setEndYear(date.getUTCFullYear());
                            setEndMonth(date.getUTCMonth() + 1);
                            setEndDay(date.getUTCDate());
                        }}
                    />

                    {/* <label htmlFor="startYear">Start Date: </label>
                        <DatePicker
                            value={new Date(Date.UTC(startYear, startMonth - 1, startDay))}
                            onChange={date => {
                                setStartYear(date.getUTCFullYear());
                                setStartMonth(date.getUTCMonth() + 1);
                                setStartDay(date.getUTCDate());
                            }}
                        />

                        <label htmlFor="endYear">End Date: </label>
                        <DatePicker
                            value={new Date(Date.UTC(endYear, endMonth - 1, endDay))}
                            onChange={date => {
                                setEndYear(date.getUTCFullYear());
                                setEndMonth(date.getUTCMonth() + 1);
                                setEndDay(date.getUTCDate());
                            }}
                        /> */}

                </>
            ) : (
                <>
                    <label htmlFor="endYear">Date: </label>
                    <DatePicker
                        selected={new Date(Date.UTC(endYear, endMonth - 1, endDay))}
                        onChange={date => {
                            setEndYear(date.getUTCFullYear());
                            setEndMonth(date.getUTCMonth() + 1);
                            setEndDay(date.getUTCDate());
                        }}
                    />
                    {/* <label htmlFor="endYear">End Date: </label>
                        <DatePicker
                            value={new Date(Date.UTC(endYear, endMonth - 1, endDay))}
                            onChange={date => {
                                setEndYear(date.getUTCFullYear());
                                setEndMonth(date.getUTCMonth() + 1);
                                setEndDay(date.getUTCDate());
                            }}
                        /> */}

                </>
            )}
            {/* </LocalizationProvider> */}

        </div>
    );
}

export default GetSunPositionsDataControls;