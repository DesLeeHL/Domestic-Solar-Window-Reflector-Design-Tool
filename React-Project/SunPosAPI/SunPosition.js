async function getSunPosition(when, location, refraction) {
    // year, month, day, hour, minute, second, timezone = when
    // latitude, longitude = location
    const response = await fetch('http://localhost:5000/sunpos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ when, location, refraction }),
    });
    const data = await response.json();
    return { azimuth: data.azimuth, elevation: data.elevation };
}

export default getSunPosition;