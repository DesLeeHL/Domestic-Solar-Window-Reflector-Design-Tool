//source (py): https://levelup.gitconnected.com/python-sun-position-for-solar-energy-and-research-7a4ead801777

const rad = (degrees) => (degrees * Math.PI) / 180;
const deg = (radians) => (radians * 180) / Math.PI;
const intoRange = (x, rangeMin, rangeMax) => {
  const shiftedX = x - rangeMin;
  const delta = rangeMax - rangeMin;
  return (((shiftedX % delta) + delta) % delta) + rangeMin;
};

const sunpos = (when, location, refraction) => {
  const [year, month, day, hour, minute, second, timezone] = when;
  const [latitude, longitude] = location;
  const rlat = rad(latitude);
  const rlon = rad(longitude);

  const greenwichTime = hour - timezone + minute / 60 + second / 3600;
  const dayNum =
  367 * year
  - 7 * Math.floor((year + Math.floor((month + 9) / 12)) / 4)
  + Math.floor(275 * month / 9)
  + day
  - 730531.5
  + greenwichTime / 24;

  const meanLong = dayNum * 0.01720279239 + 4.894967873;
  const meanAnom = dayNum * 0.01720197034 + 6.240040768;

  const eclipLong = meanLong + 0.03342305518 * Math.sin(meanAnom) + 0.0003490658504 * Math.sin(2 * meanAnom);
  const obliquity = 0.4090877234 - 0.000000006981317008 * dayNum;

  const rasc = Math.atan2(Math.cos(obliquity) * Math.sin(eclipLong), Math.cos(eclipLong));
  const decl = Math.asin(Math.sin(obliquity) * Math.sin(eclipLong));

  const sidereal = 4.894961213 + 6.300388099 * dayNum + rlon;
  const hourAng = sidereal - rasc;

  const elevation = Math.asin(Math.sin(decl) * Math.sin(rlat) + Math.cos(decl) * Math.cos(rlat) * Math.cos(hourAng));
  const azimuth = Math.atan2(-Math.cos(decl) * Math.cos(rlat) * Math.sin(hourAng), Math.sin(decl) - Math.sin(rlat) * Math.sin(elevation));

  const azimuthDeg = intoRange(deg(azimuth), 0, 360);
  const elevationDeg = intoRange(deg(elevation), -180, 180);

  if (refraction) {
    const targ = rad(elevationDeg + 10.3 / (elevationDeg + 5.11));
    const elevationWithRefraction = elevationDeg + (1.02 / Math.tan(targ)) / 60;
    return [azimuthDeg, elevationWithRefraction];
  }

  return [azimuthDeg, elevationDeg];
};

export default sunpos;