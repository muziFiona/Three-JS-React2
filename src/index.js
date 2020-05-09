import ReactDOM from 'react-dom'
import React, { useRef } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import './styles.css'

function LIGHTSS() {
  return (
    <group>
      <ambientLight intensity={0.5} />
      <spotLight intensity={0.6} position={[20, 10, 10]} angle={0.2} penumbra={1} />
    </group>
  )
}

function SeGeo() {
  const { viewport } = useThree()
  const ref = useRef()
  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2
    const y = (mouse.y * viewport.height) / 2
    ref.current.position.set(x, y, 0)
    //ref.current.rotation.set (x,y, 0)
  })

  return (
    <mesh ref={ref} castShadow>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={'red'} />
    </mesh>
  )
}

function Sphere() {
  return (
    <mesh>
      <sphereBufferGeometry attach="geometry" args={[1, 5, 5]} />
      <meshStandardMaterial attach="material" color={'#794C84'} />
    </mesh>
  )
}

function App() {
  return (
    <Canvas style={{ background: 'lightblue' }} shadowMap camera={{ position: [0, 0, 5] }}>
      <LIGHTSS />
      <mesh receiveShadow>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshPhongMaterial attach="material" color="#FFB861" />
      </mesh>
      <SeGeo position={[10, 10, 10]} />
      <Sphere />
    </Canvas>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
