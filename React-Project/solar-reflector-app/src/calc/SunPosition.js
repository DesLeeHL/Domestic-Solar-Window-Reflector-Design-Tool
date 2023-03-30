import { useState, useEffect } from 'react';
import { getSunTimes } from './suncalc';
import sunpos from './sunpos';



const SunPosition = ({ setSunPositions }) => {
    const [mode, setMode] = useState('daily');
    const [results, setResults] = useState([]);

    const [latitude, setLatitude] = useState(53.343759213779215);
    const [longitude, setLongitude] = useState(-6.250541536992013);
    const [startYear, setStartYear] = useState(2022);
    const [endYear, setEndYear] = useState(2022);
    const [startMonth, setStartMonth] = useState(10);
    const [endMonth, setEndMonth] = useState(10);
    const [startDay, setStartDay] = useState(1);
    const [endDay, setEndDay] = useState(31);
    const [timezone, setTimezone] = useState(0);
    // const [currYear, setCurrYear] = useState(2023)
    // const [currMonth, setCurrMonth] = useState();
    // const [currDay, setCurrDay] = useState();

    const handleToggle = () => {
        setMode(mode === 'daily' ? 'minutely' : 'daily');
    }
    useEffect(() => {
        const refraction = false;
        const results = [];
        const location = [latitude, longitude];
        // const startYear = 2022;
        // const endYear = 2022;
        // const startMonth = 10;
        // const endMonth = 10;
        // const timezone = -8;
        console.log("SUNPOS");

        const startDate = new Date(Date.UTC(startYear, startMonth - 1, startDay));
        const endDate = new Date(Date.UTC(endYear, endMonth, endDay));

        if (mode === 'daily') {
            for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
                const year = d.getUTCFullYear();
                const month = d.getUTCMonth() + 1;
                const day = d.getUTCDate();

                const date = new Date(Date.UTC(year, month - 1, day + 1));
                const [solarNoon, sunriseStartTime, sunsetEndTime] = getSunTimes(date, location[0], location[1]);

                const hour = solarNoon.getUTCHours();
                const minute = solarNoon.getUTCMinutes();
                const second = solarNoon.getUTCSeconds();
                // const timezone = 0;

                const when = [year, month, day, hour, minute, second, 0];
                const [azimuth, elevation] = sunpos(when, location, refraction);

                const monthString = (month).toString().padStart(2, '0');
                const hourAdj = hour + timezone
                results.push({
                    date: `${year}-${monthString}-${day.toString().padStart(2, '0')}`,
                    time: `${hourAdj.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
                    timezone,
                    azimuth,
                    elevation,

                    solarNoon,
                    sunriseStartTime, sunsetEndTime,
                });
            }
        } else if (mode === 'minutely') {
            const date = new Date(Date.UTC(endYear, endMonth - 1, endDay));
            // const [sunriseStartTime, sunsetEndTime] = getSunTimes(date, location[0], location[1]).slice(1);
            const [solarNoon, sunriseStartTime, sunsetEndTime] = getSunTimes(date, location[0], location[1]);
            const year = date.getUTCFullYear();
            const month = date.getUTCMonth() + 1;
            const day = date.getUTCDate();

            for (let t = sunriseStartTime; t <= sunsetEndTime; t.setMinutes(t.getMinutes() + 1)) {
                const hour = t.getUTCHours();
                const minute = t.getUTCMinutes();
                const second = t.getUTCSeconds();
                // const timezone = timezone;

                const when = [year, month, day, hour, minute, second, 0];
                const [azimuth, elevation] = sunpos(when, location, refraction);

                const monthString = (month).toString().padStart(2, '0');
                const hourAdj = hour + timezone
                results.push({
                    date: `${year}-${monthString}-${day.toString().padStart(2, '0')}`,
                    time: `${hourAdj.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
                    timezone,
                    azimuth,
                    elevation,

                    solarNoon,
                    sunriseStartTime, sunsetEndTime,
                });
            }
        }
        setResults(results);
        setSunPositions(results);

        console.log(results);
    }, [mode, latitude, longitude, startYear, endYear, startMonth, endMonth, timezone]);

    return (
        <div className="App">
            <h1>Sun Position</h1>
            <p>Select a mode:</p>
            {/* <button onClick={() => setMode('daily')}>Daily</button>
            <button onClick={() => setMode(',minutely')}>Minutely (in 1 day)</button> */}
            <button onClick={handleToggle}>
                {mode === 'daily' ? 'Daily' : 'Minutely (in 1 day)'}
            </button>
            <h2>Location</h2>
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

            <h2>Date Range</h2>
            {mode === 'daily' ? (
                <>
                    <label htmlFor="startYear">Start Year: </label>
                    <div className="TextInput">

                    </div>
                    <div className="TextInput">
                        <input
                            type="number"
                            id="startYear"
                            value={startYear}
                            onChange={(e) => setStartYear(parseInt(e.target.value))}
                        />
                    </div>

                    <label htmlFor="startMonth">Start Month: </label>
                    <input
                        type="number"
                        id="startYear"
                        value={startMonth}
                        onChange={(e) => setStartMonth(parseInt(e.target.value))}
                    /><label htmlFor="startYear">Start Day: </label>
                    <input
                        type="number"
                        id="startYear"
                        value={startDay}
                        onChange={(e) => setStartDay(parseInt(e.target.value))}
                    />
                    <br />
                    <label htmlFor="endYear">End Year: </label>
                    <input
                        type="number"
                        id="endYear"
                        value={endYear}
                        onChange={(e) => setEndYear(parseInt(e.target.value))}
                    />
                    <label htmlFor="endMonth">End Month: </label>
                    <input
                        type="number"
                        id="endYear"
                        value={endMonth}
                        onChange={(e) => setEndMonth(parseInt(e.target.value))}
                    /><label htmlFor="endDay">End Day: </label>
                    <input
                        type="number"
                        id="endDay"
                        value={endDay}
                        onChange={(e) => setEndDay(parseInt(e.target.value))}
                    />
                    <br />
                </>
            ) :
                (
                    <>
                        <br />
                        <label htmlFor="Year">Year: </label>
                        <input
                            type="number"
                            id="Year"
                            value={endYear}
                            onChange={(e) => setEndYear(parseInt(e.target.value))}
                        />
                        <label htmlFor="Month">Month: </label>
                        <input
                            type="number"
                            id="Year"
                            value={endMonth}
                            onChange={(e) => setEndMonth(parseInt(e.target.value))}
                        /><label htmlFor="Day">Day: </label>
                        <input
                            type="number"
                            id="Day"
                            value={endDay}
                            onChange={(e) => setEndDay(parseInt(e.target.value))}
                        />
                        <br />
                    </>
                )
            }

            {/* <h2>Timezone</h2>
            <label htmlFor="timezone">Timezone: </label>
            <input
                type="number"
                id="timezone"
                value={timezone}
                onChange={(e) => setTimezone(parseFloat(e.target.value))}
            /> */}
            {/* <ul>
                {results.map((result, index) => (
                    <li key={index}>
                        {mode === 'daily'
                            ? `Date: ${result.date}, Azimuth: ${result.azimuth.toFixed(
                                2
                            )}, Elevation: ${result.elevation.toFixed(2)}, Solar Noon: ${result.solarNoon.toISOString()}`
                            : `Date: ${result.date}, Time: ${result.time
                            }, Azimuth: ${result.azimuth.toFixed(
                                2
                            )}, Elevation: ${result.elevation.toFixed(2)}`}
                    </li>
                ))}
            </ul> */}
        </div>);
};

export default SunPosition;
