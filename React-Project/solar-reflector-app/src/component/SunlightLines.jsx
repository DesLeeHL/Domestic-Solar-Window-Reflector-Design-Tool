import * as THREE from 'three';

const SunlightLines = (reflectorWidth, reflectorLength, azimuth, elevation, onGroupCreated, onAnglesChange) => {
    // const group = new THREE.Group();

    // const updateLines = (group, azimuth, elevation) => {
    //     // Calculate the sun direction (e.g., azimuth 45, elevation 45)
    //     const theta = azimuth * (Math.PI / 180);
    //     const phi = (90 - elevation) * (Math.PI / 180);
    //     const sunDirection = new THREE.Vector3(
    //         Math.sin(phi) * Math.cos(theta),
    //         Math.cos(phi),
    //         Math.sin(phi) * Math.sin(theta)
    //     );

    //     // Remove any existing lines from the group
    //     group.children.forEach(child => group.remove(child));

    //     // Create lines from the corners of the reflector towards the sun direction
    //     const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
    //     for (let i = 0; i < 4; i++) {
    //         const lineGeometry = new THREE.BufferGeometry().setFromPoints([
    //             new THREE.Vector3(
    //                 (i % 2 === 0 ? -1 : 1) * reflectorWidth / 2,
    //                 0,
    //                 (i < 2 ? 1 : -1) * reflectorLength / 2
    //             ),
    //             new THREE.Vector3(
    //                 (i % 2 === 0 ? -1 : 1) * reflectorWidth / 2,
    //                 0,
    //                 (i < 2 ? 1 : -1) * reflectorLength / 2
    //             ).add(sunDirection.clone().multiplyScalar(10)),
    //         ]);
    //         const line = new THREE.Line(lineGeometry, lineMaterial);
    //         group.add(line);
    //     }
    // }

    // if (typeof onGroupCreated === 'function') {
    //     onGroupCreated(group);
    // }

    // if (typeof onAnglesChange === 'function') {
    //     onAnglesChange(group, azimuth, elevation);
    // } else {
    //     updateLines(group, azimuth, elevation);
    // }




    const group = new THREE.Group();
    if (onGroupCreated) {
        onGroupCreated(group);
    }

    if (onAnglesChange) {
        onAnglesChange(group, azimuth, elevation);
    }

    return group;
};

export default SunlightLines;
