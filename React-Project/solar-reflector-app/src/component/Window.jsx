import * as THREE from 'three';

const Window = (windowWidth, windowHeight) => {
  const geometry = new THREE.BoxGeometry(windowWidth, windowHeight, 0.1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const windowObj = new THREE.Mesh(geometry, material);

  // Set the position, rotation or any other properties as required.
  windowObj.position.set(0, 0, 0);

  return windowObj;
};

export default Window;