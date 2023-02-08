import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import Cylinder3d from "./component/Cylinder3d";
import Window from "./component/Window";

function App() {
  return (
    <>
      <section className='App-header'>
        Domestic Solar Window Reflector Design Tool
      </section>
      <section className='App-body'>
        {/* Canvas 1 */}
        <Canvas>
          {/* <OrthographicCamera /> */}
          <pointLight position={[10, 10, 10]} />
          <ambientLight />
          <Window position={[-1.2, 0, 0]} />
          <OrbitControls />

          <OrthographicCamera
            makeDefault
            zoom={1}
            top={500}
            bottom={-500}
            left={500}
            right={-500}
            near={1}
            far={2000}
            position={[10, 10, 100]}
          />
        </Canvas>

        {/* Canvas 2 */}
        {/* <Canvas>
          <pointLight position={[10, 10, 10]} />
          <ambientLight intensity={0.5} />
          <Cylinder3d position={[-1.2, 0, 0]} wireframe={true} />
          <Cylinder3d position={[1.2, 0, 0]} wireframe={true} />
        </Canvas> */}
      </section>
    </>
  );
}

export default App;