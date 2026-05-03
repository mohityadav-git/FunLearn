import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Cone, ContactShadows, PresentationControls, Cylinder, Torus } from '@react-three/drei';

// --- Shared Components ---
const SpinningShape = ({ Component, position, color, args }) => {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <Component
      ref={meshRef}
      position={position}
      args={args}
      scale={clicked ? 1.4 : 1}
      onClick={(e) => { e.stopPropagation(); setClick(!clicked); }}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
    >
      <meshStandardMaterial color={hovered ? 'hotpink' : color} />
    </Component>
  );
};

// --- Scene 1: Counting & Addition ---
const BouncingSphere = ({ position, color, delay }) => {
  const ref = useRef();
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + delay;
    ref.current.position.y = position[1] + Math.sin(t * 3) * 0.5 + (clicked ? 1 : 0);
  });

  return (
    <Sphere ref={ref} position={position} args={[0.5, 32, 32]} onClick={(e) => { e.stopPropagation(); setClicked(!clicked); }}>
      <meshStandardMaterial color={clicked ? '#fbbf24' : color} />
    </Sphere>
  );
};

const CountingScene = () => (
  <>
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <OrbitControls enableZoom={false} />
    <BouncingSphere position={[-2, 0, 0]} color="#ef4444" delay={0} />
    <BouncingSphere position={[-1, 0, 0]} color="#f97316" delay={0.2} />
    <BouncingSphere position={[0, 0, 0]} color="#eab308" delay={0.4} />
    <BouncingSphere position={[1, 0, 0]} color="#22c55e" delay={0.6} />
    <BouncingSphere position={[2, 0, 0]} color="#3b82f6" delay={0.8} />
    <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2} />
  </>
);

// --- Scene 2: Subtraction ---
const FallingBlock = ({ startPos, color, fallDelay }) => {
  const ref = useRef();
  const [falling, setFalling] = useState(false);

  useFrame((state, delta) => {
    if (falling && ref.current.position.y > -5) {
      ref.current.position.y -= delta * 5;
      ref.current.rotation.x += delta * 5;
    }
  });

  return (
    <Box ref={ref} position={startPos} args={[0.8, 0.8, 0.8]} onClick={(e) => { e.stopPropagation(); setFalling(true); }}>
      <meshStandardMaterial color={falling ? '#94a3b8' : color} />
    </Box>
  );
};

const SubtractionScene = () => (
  <>
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <OrbitControls enableZoom={false} />
    <FallingBlock startPos={[-2, 0, 0]} color="#3b82f6" />
    <FallingBlock startPos={[-1, 0, 0]} color="#3b82f6" />
    <FallingBlock startPos={[0, 0, 0]} color="#3b82f6" />
    <FallingBlock startPos={[1, 0, 0]} color="#ef4444" />
    <FallingBlock startPos={[2, 0, 0]} color="#ef4444" />
    <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2} />
  </>
);

// --- Scene 3: Multiplication (Grid) ---
const GridSphere = ({ position }) => {
  const [active, setActive] = useState(false);
  return (
    <Sphere position={position} args={[0.4, 32, 32]} onClick={(e) => { e.stopPropagation(); setActive(!active); }}>
      <meshStandardMaterial color={active ? '#10b981' : '#cbd5e1'} />
    </Sphere>
  );
};

const MultiplicationScene = () => {
  const grid = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      grid.push(<GridSphere key={`${x}-${y}`} position={[x * 1.2, y * 1.2, 0]} />);
    }
  }
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls enableZoom={false} />
      {grid}
    </>
  );
};

// --- Scene 4: Division ---
const DividerGroup = () => {
  const [split, setSplit] = useState(false);
  const offset = split ? 2 : 0;
  
  return (
    <group onClick={() => setSplit(!split)}>
      {/* Group 1 */}
      <Sphere position={[-offset, 0.5, 0]} args={[0.4, 32, 32]}><meshStandardMaterial color="#f43f5e" /></Sphere>
      <Sphere position={[-offset, -0.5, 0]} args={[0.4, 32, 32]}><meshStandardMaterial color="#f43f5e" /></Sphere>
      {/* Group 2 */}
      <Sphere position={[0, 0.5, 0]} args={[0.4, 32, 32]}><meshStandardMaterial color="#8b5cf6" /></Sphere>
      <Sphere position={[0, -0.5, 0]} args={[0.4, 32, 32]}><meshStandardMaterial color="#8b5cf6" /></Sphere>
      {/* Group 3 */}
      <Sphere position={[offset, 0.5, 0]} args={[0.4, 32, 32]}><meshStandardMaterial color="#0ea5e9" /></Sphere>
      <Sphere position={[offset, -0.5, 0]} args={[0.4, 32, 32]}><meshStandardMaterial color="#0ea5e9" /></Sphere>
    </group>
  );
};

const DivisionScene = () => (
  <>
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <OrbitControls enableZoom={false} />
    <DividerGroup />
  </>
);

// --- Scene 5: Time (Clock) ---
const ClockScene = () => {
  const minHand = useRef();
  const hourHand = useRef();
  const [running, setRunning] = useState(false);

  useFrame((state, delta) => {
    if (running) {
      minHand.current.rotation.z -= delta * 5;
      hourHand.current.rotation.z -= delta * (5 / 12);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} intensity={1} />
      <OrbitControls enableZoom={false} />
      <group onClick={() => setRunning(!running)}>
        {/* Face */}
        <Cylinder args={[2, 2, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Cylinder>
        {/* Rim */}
        <Torus args={[2, 0.1, 16, 100]} rotation={[0, 0, 0]}>
          <meshStandardMaterial color="#3b82f6" />
        </Torus>
        {/* Min Hand */}
        <group ref={minHand} position={[0, 0, 0.15]}>
          <Box args={[0.1, 1.5, 0.05]} position={[0, 0.75, 0]}>
            <meshStandardMaterial color="#ef4444" />
          </Box>
        </group>
        {/* Hour Hand */}
        <group ref={hourHand} position={[0, 0, 0.2]}>
          <Box args={[0.15, 1, 0.05]} position={[0, 0.5, 0]}>
            <meshStandardMaterial color="#1e293b" />
          </Box>
        </group>
        {/* Center dot */}
        <Sphere args={[0.15, 16, 16]} position={[0, 0, 0.25]}>
          <meshStandardMaterial color="#000000" />
        </Sphere>
      </group>
    </>
  );
};

// --- Scene 6: Money (Coins) ---
const Coin = ({ position, color, label }) => {
  const ref = useRef();
  const [flipping, setFlipping] = useState(false);

  useFrame((state, delta) => {
    if (flipping) {
      ref.current.rotation.x += delta * 10;
      if (ref.current.rotation.x > Math.PI * 2) {
        ref.current.rotation.x = 0;
        setFlipping(false);
      }
    }
  });

  return (
    <Cylinder 
      ref={ref} 
      position={position} 
      args={[0.8, 0.8, 0.1, 32]} 
      rotation={[Math.PI / 2, 0, 0]}
      onClick={() => setFlipping(true)}
    >
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </Cylinder>
  );
};

const MoneyScene = () => (
  <>
    <ambientLight intensity={0.5} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <OrbitControls enableZoom={false} />
    <Coin position={[-1.5, 0, 0]} color="#fcd34d" />
    <Coin position={[0, 0, 0]} color="#e4e4e7" />
    <Coin position={[1.5, 0, 0]} color="#b45309" />
  </>
);

// --- Scene 7: Length (Ruler) ---
const LengthScene = () => {
  const [active, setActive] = useState(0);
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls enableZoom={false} />
      {/* Ruler */}
      <Box args={[6, 0.5, 0.1]} position={[0, -1.5, 0]}>
        <meshStandardMaterial color="#fef08a" />
      </Box>
      {/* Objects */}
      <Box args={[2, 0.4, 0.4]} position={[-2, 0, 0]} onClick={() => setActive(1)}>
        <meshStandardMaterial color={active === 1 ? '#3b82f6' : '#94a3b8'} />
      </Box>
      <Box args={[4, 0.4, 0.4]} position={[-1, 0.6, 0]} onClick={() => setActive(2)}>
        <meshStandardMaterial color={active === 2 ? '#ef4444' : '#94a3b8'} />
      </Box>
      <Box args={[5.5, 0.4, 0.4]} position={[-0.25, 1.2, 0]} onClick={() => setActive(3)}>
        <meshStandardMaterial color={active === 3 ? '#10b981' : '#94a3b8'} />
      </Box>
    </>
  );
};

// --- Scene 8: Weight (Scale) ---
const WeightScene = () => {
  const [tilted, setTilted] = useState(false);
  const rotZ = tilted ? -0.2 : 0;
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} intensity={1} />
      <OrbitControls enableZoom={false} />
      <group onClick={() => setTilted(!tilted)}>
        {/* Base */}
        <Cone args={[0.5, 1.5, 4]} position={[0, -1, 0]}>
          <meshStandardMaterial color="#64748b" />
        </Cone>
        {/* Beam */}
        <group rotation={[0, 0, rotZ]} position={[0, -0.25, 0]}>
          <Box args={[5, 0.2, 0.5]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#f59e0b" />
          </Box>
          {/* Left Pan */}
          <Cylinder args={[0.8, 0.8, 0.1, 32]} position={[-2.2, 0.1, 0]}>
             <meshStandardMaterial color="#e2e8f0" />
          </Cylinder>
          <Box args={[0.6, 0.6, 0.6]} position={[-2.2, 0.5, 0]}>
            <meshStandardMaterial color="#3b82f6" />
          </Box>
          {/* Right Pan */}
          <Cylinder args={[0.8, 0.8, 0.1, 32]} position={[2.2, 0.1, 0]}>
             <meshStandardMaterial color="#e2e8f0" />
          </Cylinder>
          {tilted && (
            <Box args={[1, 1, 1]} position={[2.2, 0.6, 0]}>
              <meshStandardMaterial color="#ef4444" />
            </Box>
          )}
        </group>
      </group>
    </>
  );
};

// --- Scene 9: Capacity (Jug) ---
const CapacityScene = () => {
  const [fullness, setFullness] = useState(0); // 0, 1, 2, 3
  
  const h = (fullness / 3) * 2; // max height 2
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls enableZoom={false} />
      <group onClick={() => setFullness((f) => (f + 1) % 4)} position={[0, -1, 0]}>
        {/* Glass cylinder */}
        <Cylinder args={[1.5, 1.5, 2.5, 32]} position={[0, 1.25, 0]}>
          <meshStandardMaterial color="#cbd5e1" transparent opacity={0.3} />
        </Cylinder>
        {/* Water */}
        {fullness > 0 && (
          <Cylinder args={[1.45, 1.45, h, 32]} position={[0, h/2, 0]}>
            <meshStandardMaterial color="#0ea5e9" transparent opacity={0.8} />
          </Cylinder>
        )}
      </group>
    </>
  );
};

// --- Scene 10: Fractions ---
const FractionSlice = ({ rotation, color, offset }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <group rotation={rotation}>
      <mesh 
        position={clicked ? [offset, 0, offset] : [0, 0, 0]} 
        onClick={(e) => { e.stopPropagation(); setClicked(!clicked); }}
      >
        <cylinderGeometry args={[1.5, 1.5, 0.5, 32, 1, false, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

const FractionsScene = () => (
  <>
    <ambientLight intensity={0.5} />
    <directionalLight position={[0, 10, 5]} intensity={1} />
    <OrbitControls enableZoom={false} />
    <group rotation={[-Math.PI / 4, 0, 0]}>
      <FractionSlice rotation={[0, 0, 0]} color="#ef4444" offset={0.5} />
      <FractionSlice rotation={[0, Math.PI / 2, 0]} color="#f97316" offset={0.5} />
      <FractionSlice rotation={[0, Math.PI, 0]} color="#eab308" offset={0.5} />
      <FractionSlice rotation={[0, -Math.PI / 2, 0]} color="#22c55e" offset={0.5} />
    </group>
  </>
);

// --- Scene 11: Geometry ---
const GeometryScene = () => (
  <>
    <ambientLight intensity={0.5} />
    <directionalLight position={[10, 10, 5]} intensity={1} />
    <PresentationControls global={true} cursor={true} snap={true} speed={1} zoom={1} rotation={[0, 0, 0]} polar={[-Math.PI / 4, Math.PI / 4]} azimuth={[-Math.PI / 4, Math.PI / 4]}>
      <SpinningShape Component={Box} position={[-2, 0, 0]} color="#3b82f6" args={[1, 1, 1]} />
      <SpinningShape Component={Sphere} position={[0, 0, 0]} color="#f59e0b" args={[0.7, 32, 32]} />
      <SpinningShape Component={Cone} position={[2, 0, 0]} color="#10b981" args={[0.7, 1.5, 32]} />
    </PresentationControls>
    <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
  </>
);

// --- Main Visualizer Wrapper ---
const Visualizer3D = ({ type }) => {
  return (
    <div style={{ width: '100%', height: '350px', background: '#f8fafc', borderRadius: '16px', overflow: 'hidden', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)', border: '2px solid var(--primary-light)', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {type === 'geometry' && <GeometryScene />}
        {type === 'fractions' && <FractionsScene />}
        {type === 'counting' && <CountingScene />}
        {type === 'subtraction' && <SubtractionScene />}
        {type === 'multiplication' && <MultiplicationScene />}
        {type === 'division' && <DivisionScene />}
        {type === 'time' && <ClockScene />}
        {type === 'money' && <MoneyScene />}
        {type === 'length' && <LengthScene />}
        {type === 'weight' && <WeightScene />}
        {type === 'capacity' && <CapacityScene />}
        
        {/* Fallback to counting if none matched */}
        {!['geometry', 'fractions', 'counting', 'subtraction', 'multiplication', 'division', 'time', 'money', 'length', 'weight', 'capacity'].includes(type) && <CountingScene />}
      </Canvas>
      <div style={{ position: 'absolute', bottom: '10px', left: '0', right: '0', textAlign: 'center', pointerEvents: 'none', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 'bold' }}>
        👆 Click and drag to interact!
      </div>
    </div>
  );
};

export default Visualizer3D;
