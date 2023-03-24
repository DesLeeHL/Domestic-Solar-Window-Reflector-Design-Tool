import { useState, useEffect } from 'react';
import { getSunTimes } from './suncalc';
import sunpos from './sunpos';

const SunPosition = () => {
    const [mode, setMode] = useState('daily');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const refraction = false;
        const results = [];
        const location = [0,-120];
        const startYear = 2022;
        const endYear = 2022;
        const startMonth = 10;
        const endMonth = 10;
        const timezone = -8;
        console.log("SUNPOS");

        const startDate = new Date(Date.UTC(startYear, startMonth - 1, 1));
        const endDate = new Date(Date.UTC(endYear, endMonth, 0));

        if (mode === 'daily') {
            for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
                const year = d.getUTCFullYear();
                const month = d.getUTCMonth() + 1;
                const day = d.getUTCDate();

                const date = new Date(Date.UTC(year, month - 1, day + 1));
                const [solarNoon, sunriseEndTime, sunsetStartTime] = getSunTimes(date, location[0], location[1]);

                const hour = solarNoon.getUTCHours();
                const minute = solarNoon.getUTCMinutes();
                const second = solarNoon.getUTCSeconds();
                // const timezone = 0;

                const when = [year, month, day, hour, minute, second, 0];
                const [azimuth, elevation] = sunpos(when, location, refraction);

                const monthString = (month).toString().padStart(2, '0');
                results.push({
                    date: `${year}-${monthString}-${day.toString().padStart(2, '0')}`,
                    azimuth,
                    elevation,
                    timezone,
                    solarNoon,
                    sunriseEndTime, sunsetStartTime,
                });
            }
        } else if (mode === 'every5mins') {
            const date = new Date(Date.UTC(startYear, startMonth - 1, 1));
            const [sunriseEndTime, sunsetStartTime] = getSunTimes(date, location[0], location[1]).slice(1);
            const year = date.getUTCFullYear();
            const month = date.getUTCMonth() + 1;
            const day = date.getUTCDate();

            for (let t = sunriseEndTime; t <= sunsetStartTime; t.setMinutes(t.getMinutes() + 5)) {
                const hour = t.getUTCHours();
                const minute = t.getUTCMinutes();
                const second = t.getUTCSeconds();
                // const timezone = timezone;

                const when = [year, month, day, hour, minute, second, 0];
                const [azimuth, elevation] = sunpos(when, location, refraction);

                const monthString = (month).toString().padStart(2, '0');
                const hourAdj = hour+timezone
                results.push({
                    date: `${year}-${monthString}-${day.toString().padStart(2, '0')}`,
                    time: `${hourAdj.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
                    
                    elevation,
                    azimuth,
                    timezone,
                });
            }
        }

        console.log(results);
    }, [mode]);

    return (
        <div className="App">
            <h1>Sun Position</h1>
            <p>Select a mode:</p>
            <button onClick={() => setMode('daily')}>Daily</button>
            <button onClick={() => setMode('every5mins')}>Every 5 Minutes</button>
            <ul>
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
            </ul>
        </div>);
};

export default SunPosition;
