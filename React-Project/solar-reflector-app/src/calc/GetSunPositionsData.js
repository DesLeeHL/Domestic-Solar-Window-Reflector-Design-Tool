import { useEffect } from 'react';
import { getSunTimes } from './suncalc';
import sunpos from './sunpos';

function GetSunPositionsData({
    setSunPositions,
    latitude,
    longitude,
    timezone,
    mode,
    startYear,
    endYear,
    startMonth,
    endMonth,
    startDay,
    endDay,
}) {
    useEffect(() => {
        const refraction = false;
        const results = [];

        const startDate = new Date(Date.UTC(startYear, startMonth, startDay));
        const endDate = new Date(Date.UTC(endYear, endMonth, endDay + 1));

        const location = [latitude, longitude];

        if (mode === 'daily') {
            for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
                const year = d.getUTCFullYear();
                const month = d.getUTCMonth();
                const day = d.getUTCDate();

                const date = new Date(Date.UTC(year, month, day + 1));
                const [solarNoon, sunriseStartTime, sunsetEndTime] = getSunTimes(date, location[0], location[1]);

                const hour = solarNoon.getUTCHours();
                const minute = solarNoon.getUTCMinutes();
                const second = solarNoon.getUTCSeconds();
                const when = [year, month + 1, day, hour, minute, second, 0];
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
            const date = new Date(Date.UTC(endYear, endMonth, endDay));
            const [solarNoon, sunriseStartTime, sunsetEndTime] = getSunTimes(date, location[0], location[1]);
            const year = date.getUTCFullYear();
            const month = date.getUTCMonth() + 1;
            const day = date.getUTCDate();

            for (let t = sunriseStartTime; t <= sunsetEndTime; t.setMinutes(t.getMinutes() + 1)) {
                const hour = t.getUTCHours();
                const minute = t.getUTCMinutes();
                const second = t.getUTCSeconds();
                const when = [year, month + 1, day, hour, minute, second, 0];
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
        // setResults(results);
        setSunPositions(results);

        console.log(results);
    }, [mode, latitude, longitude,
        startYear, endYear, startMonth,
        endMonth, startDay, endDay, 
        timezone, setSunPositions]);

    return null;
};

export default GetSunPositionsData;
