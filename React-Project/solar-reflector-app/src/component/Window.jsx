import * as THREE from 'three';

const Window = (windowWidth, windowHeight) => {
  const geometry = new THREE.BoxGeometry(windowWidth, windowHeight, 0.1);
  const material = new THREE.MeshBasicMaterial({
    color: 0x0088ff,
    opacity: 0.5,
    transparent: true
  });
  const windowObj = new THREE.Mesh(geometry, material);

  return windowObj;
};

export default Window;