import * as THREE from 'three';

const CustomAxesHelper = (axesLength) => {
  const createAxis = (color, label) => {
    const lineMaterial = new THREE.LineBasicMaterial({ color, linewidth: 2 });
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(axesLength, 0, 0),
    ]);

    const line = new THREE.Line(geometry, lineMaterial);

    // const textGeometry = new THREE.TextGeometry(label, {
    //   font: new THREE.FontLoader().load(
    //     'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json'
    //   ),
    //   size: 0.5,
    //   height: 0.01,
    // });

    // const textMaterial = new THREE.MeshBasicMaterial({ color });
    // const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    // textMesh.position.set(axesLength + 0.1, 0, 0);

    const group = new THREE.Group();
    group.add(line);
    // group.add(textMesh);

    return group;
  };

  const xAxis = createAxis(0xff0000, 'X');
  const yAxis = createAxis(0x00ff00, 'Y').rotateZ(Math.PI / 2);
  const zAxis = createAxis(0x0000ff, 'Z').rotateY(-Math.PI / 2);

  const axesGroup = new THREE.Group();
  axesGroup.add(xAxis);
  axesGroup.add(yAxis);
  axesGroup.add(zAxis);

  return axesGroup;
};

export default CustomAxesHelper;