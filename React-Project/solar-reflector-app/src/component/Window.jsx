import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
 
function Window(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(15);
//   // Subscribe this component to the render-loop, rotate the mesh every frame
//   useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
    >
      <boxGeometry args={[width, height,1]} />
      <meshStandardMaterial
        wireframe={props.wireframe}
        color={"orange"}
      />
    </mesh>
  );
}
 
export default Window; 