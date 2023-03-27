import * as THREE from 'three';

const Sun = ({ sunSize }) => {
  // Convert azimuth and elevation to spherical coordinates
//   const radius = 1;
//   const phi = (90 - elevation) * Math.PI / 180;
//   const theta = (azimuth + 180) * Math.PI / 180;

//   // Calculate position of the sun using spherical coordinates
//   const x = radius * Math.sin(phi) * Math.cos(theta);
//   const y = radius * Math.cos(phi);
//   const z = radius * Math.sin(phi) * Math.sin(theta);

  // Create a sphere geometry and material
  const geometry = new THREE.SphereGeometry(sunSize, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });

  // Create a mesh and position it at the calculated position
  const sunObj = new THREE.Mesh(geometry, material);
//   sun.position.set(x, y, z);

  return sunObj;
};

export default Sun;