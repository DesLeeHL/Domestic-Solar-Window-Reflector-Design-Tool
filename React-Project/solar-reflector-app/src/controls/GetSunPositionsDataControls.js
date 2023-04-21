import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
    const handleToggle = () => {
        setMode(mode === 'daily' ? 'minutely' : 'daily');
        setSunPositions(null);
    };

    return (
        <div>
            <h2>Controls</h2>
            <button onClick={handleToggle}>
                {mode === 'daily' ? 'Daily' : 'Minutely (in 1 day)'}
            </button>
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
        </div>
    );
}

export default GetSunPositionsDataControls;