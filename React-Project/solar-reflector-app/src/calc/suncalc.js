import SunCalc from 'suncalc'

const rad = (degrees) => (degrees * Math.PI) / 180;
const deg = (radians) => (radians * 180) / Math.PI;
const intoRange = (x, rangeMin, rangeMax) => {
  const shiftedX = x - rangeMin;
  const delta = rangeMax - rangeMin;
  return (((shiftedX % delta) + delta) % delta) + rangeMin;
};

export function getSunTimes(/*Date*/ date, /*Number*/ latitude, /*Number*/ longitude, /*Number (default=0)*/ height) {
  const times = SunCalc.getTimes(date, latitude, longitude)

  let solarNoonTime = times.solarNoon
  let sunriseEndTime = times.sunriseEnd
  let sunsetStartTime = times.sunsetStart

  return [solarNoonTime, sunriseEndTime, sunsetStartTime]
}

//inaccurate after testing
export function getSunPos(/*Date*/ timeAndDate, /*Number*/ latitude, /*Number*/ longitude) {
  const positions = SunCalc.getPosition(timeAndDate, latitude, longitude)
  let azimuth = positions.azimuth
  let elevation = positions.altitude
  const azimuthDeg = azimuth * 180 / Math.PI + 180
  const elevationDeg = elevation * 180 / Math.PI
  const azimuthDegAdj = intoRange(azimuthDeg, 0, 360);
  const elevationDegAdj = intoRange(elevationDeg, -180, 180);
  return [azimuthDegAdj, elevationDegAdj]
}