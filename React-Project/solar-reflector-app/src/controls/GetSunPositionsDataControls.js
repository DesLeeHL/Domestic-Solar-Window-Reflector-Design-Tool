import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

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
                </>
            )}
            {/* </LocalizationProvider> */}

        </div>
    );
}

export default GetSunPositionsDataControls;