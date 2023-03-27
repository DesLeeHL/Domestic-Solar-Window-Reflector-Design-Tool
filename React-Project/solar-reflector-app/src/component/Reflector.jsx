import * as THREE from 'three';

const Reflector = (reflectorWidth, reflectorLength) => {
  const whiteMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const greyMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });

  const geometry = new THREE.PlaneGeometry(reflectorWidth, reflectorLength);

  const whiteSide = new THREE.Mesh(geometry, whiteMaterial);
  const greySide = new THREE.Mesh(geometry, greyMaterial);
  whiteSide.rotation.y = Math.PI;

  const reflectorObj = new THREE.Group();
  reflectorObj.add(whiteSide);
  reflectorObj.add(greySide);

  return reflectorObj;
};

export default Reflector;