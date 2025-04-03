import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';

// Interface for particle systems
interface ParticleSystemOptions {
  count: number;
  color?: string | string[];
  size?: number | [number, number];
  speed?: number;
  opacity?: number;
  depth?: number;
}

// Create a reusable optimized particle system for Three.js
export const createParticleSystem = (scene: THREE.Scene, options: ParticleSystemOptions) => {
  const {
    count,
    color = '#ffffff',
    size = [0.5, 2],
    speed = 0.01,
    opacity = 0.7,
    depth = 50
  } = options;

  // Use instanced mesh for better performance with many particles
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const velocities = [];
  const sizes = [];
  const colors = [];

  // Generate colors array if multiple colors provided
  const colorArray = Array.isArray(color) ? color : [color];
  const colorObjects = colorArray.map(c => new THREE.Color(c));

  // Generate random particles
  for (let i = 0; i < count; i++) {
    // Random position within a sphere
    const x = (Math.random() - 0.5) * 2 * depth;
    const y = (Math.random() - 0.5) * 2 * depth;
    const z = (Math.random() - 0.5) * 2 * depth;

    vertices.push(x, y, z);

    // Random velocity for each particle
    const vx = (Math.random() - 0.5) * speed;
    const vy = (Math.random() - 0.5) * speed;
    const vz = (Math.random() - 0.5) * speed;
    velocities.push(vx, vy, vz);

    // Random size within range
    const particleSize = Array.isArray(size)
      ? Math.random() * (size[1] - size[0]) + size[0]
      : size;
    sizes.push(particleSize);

    // Random color from provided colors
    const selectedColor = colorObjects[Math.floor(Math.random() * colorObjects.length)];
    colors.push(selectedColor.r, selectedColor.g, selectedColor.b);
  }

  // Set up geometry attributes
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3));
  geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  // Create shader material for better performance
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      pointTexture: { value: new THREE.TextureLoader().load('/particle.png') }
    },
    vertexShader: `
      attribute vec3 velocity;
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      uniform float time;
      
      void main() {
        vColor = color;
        vec3 pos = position + velocity * time * 10.0;
        
        // Wrap particles around if they go too far
        if (pos.x > 25.0) pos.x = -25.0;
        if (pos.x < -25.0) pos.x = 25.0;
        if (pos.y > 25.0) pos.y = -25.0;
        if (pos.y < -25.0) pos.y = 25.0;
        if (pos.z > 25.0) pos.z = -25.0;
        if (pos.z < -25.0) pos.z = 25.0;
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      uniform sampler2D pointTexture;
      
      void main() {
        gl_FragColor = vec4(vColor, ${opacity});
        gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
      }
    `,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true
  });

  // Create points system
  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Animation function
  const animate = (delta: number) => {
    // Update time uniform
    if (material.uniforms) {
      material.uniforms.time.value += delta;
    }
  };

  // Return functions to update and remove particles
  return {
    animate,
    dispose: () => {
      scene.remove(particles);
      geometry.dispose();
      material.dispose();
    }
  };
};

// Create a space scene with stars and nebula
export const createSpaceScene = (
  containerRef: React.RefObject<HTMLDivElement>,
  density: 'low' | 'medium' | 'high' = 'medium'
) => {
  if (!containerRef.current) return { dispose: () => {} };

  // Set up scene, camera, and renderer with optimized settings
  const scene = new THREE.Scene();

  // Adjust particle counts based on density
  const particleCount = {
    low: 1000,
    medium: 2000,
    high: 3000
  }[density];

  // Create renderer with proper settings
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });

  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // Limit for performance
  renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
  renderer.setClearColor(0x000000, 0);
  containerRef.current.appendChild(renderer.domElement);

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    75,
    containerRef.current.clientWidth / containerRef.current.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 30;

  // Add distant stars (small, white)
  const starSystem = createParticleSystem(scene, {
    count: particleCount,
    color: ['#ffffff', '#f8f8ff', '#eeeeff'],
    size: [0.5, 1.5],
    speed: 0.001, // Very slow movement
    opacity: 0.8,
    depth: 100
  });

  // Add colorful nebula dust (larger, colored particles)
  const nebulaSystem = createParticleSystem(scene, {
    count: Math.floor(particleCount / 4),
    color: ['#4f46e5', '#a855f7', '#ec4899', '#3b82f6'],
    size: [1.5, 3],
    speed: 0.003,
    opacity: 0.4,
    depth: 50
  });

  // Create animation loop
  let frameId: number;
  const clock = new THREE.Clock();

  const animate = () => {
    frameId = requestAnimationFrame(animate);

    const delta = clock.getDelta();

    // Update particle systems
    starSystem.animate(delta);
    nebulaSystem.animate(delta);

    // Slowly rotate camera for subtle movement
    camera.position.x = Math.sin(clock.getElapsedTime() * 0.05) * 2;
    camera.position.y = Math.sin(clock.getElapsedTime() * 0.03) * 2;
    camera.lookAt(scene.position);

    // Render scene
    renderer.render(scene, camera);
  };

  // Start animation
  animate();

  // Handle window resize
  const handleResize = () => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  };

  window.addEventListener('resize', handleResize);

  // Return cleanup function
  return {
    dispose: () => {
      cancelAnimationFrame(frameId);
      starSystem.dispose();
      nebulaSystem.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    }
  };
};

// React hook for Three.js space background
export const useSpaceBackground = (
  density: 'low' | 'medium' | 'high' = 'medium',
  interactive: boolean = true
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let sceneController: { dispose: () => void } | null = null;

    if (containerRef.current) {
      // Initialize scene
      sceneController = createSpaceScene(containerRef, density);
      setIsInitialized(true);

      // Add mouse interaction if enabled
      if (interactive && containerRef.current) {
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event: MouseEvent) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (!rect) return;

          // Normalize mouse position to -1 to 1
          mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

          // Apply subtle camera movement
          if (sceneController) {
            const camera = (sceneController as any).camera;
            if (camera) {
              camera.position.x += (mouseX * 2 - camera.position.x) * 0.01;
              camera.position.y += (mouseY * 2 - camera.position.y) * 0.01;
            }
          }
        };

        containerRef.current.addEventListener('mousemove', handleMouseMove as EventListener);

        return () => {
          containerRef.current?.removeEventListener('mousemove', handleMouseMove as EventListener);
          if (sceneController) {
            sceneController.dispose();
          }
        };
      }
    }

    return () => {
      if (sceneController) {
        sceneController.dispose();
      }
    };
  }, [density, interactive]);

  return { containerRef, isInitialized };
};

// Create smooth camera transitions between points of interest
export const createCameraController = (camera: THREE.Camera) => {
  const targetPosition = new THREE.Vector3();
  let isAnimating = false;

  const moveTo = (position: THREE.Vector3, duration: number = 1000, callback?: () => void) => {
    if (isAnimating) return;
    isAnimating = true;

    const startPosition = camera.position.clone();
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Use cubic easing for smoother motion
      const easedProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      // Interpolate position
      camera.position.lerpVectors(startPosition, position, easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        isAnimating = false;
        if (callback) callback();
      }
    };

    animate();
  };

  // Look at a target with smooth animation
  const lookAt = (target: THREE.Vector3, duration: number = 1000, callback?: () => void) => {
    if (isAnimating) return;
    isAnimating = true;

    const startTime = Date.now();
    const startRotation = camera.quaternion.clone();

    // Create a temporary quaternion for the target rotation
    const tempCamera = camera.clone();
    tempCamera.lookAt(target);
    const targetRotation = tempCamera.quaternion.clone();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Use cubic easing for smoother motion
      const easedProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      // Interpolate rotation with quaternion slerp
      camera.quaternion.slerpQuaternions(startRotation, targetRotation, easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        isAnimating = false;
        if (callback) callback();
      }
    };

    animate();
  };

  return {
    moveTo,
    lookAt,
    isAnimating: () => isAnimating
  };
};

// Create a simple nebula effect with shaders
export const createNebulaEffect = (scene: THREE.Scene, options: {
  size?: number;
  color?: string;
  density?: number;
}) => {
  const {
    size = 100,
    color = '#4c00b0',
    density = 0.5
  } = options;

  // Create a shader material with perlin noise
  const nebulaMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(color) },
      density: { value: density }
    },
    vertexShader: `
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      uniform float density;
      varying vec2 vUv;
      
      // Simplex noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        
        // First corner
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        
        // Other corners
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        
        // Permutations
        i = mod289(i);
        vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
              
        // Gradients
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        
        // Normalise gradients
        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        
        // Mix final noise value
        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }
      
      void main() {
        vec2 p = vUv * 4.0 - 2.0;
        float d = length(p) * density;
        
        // Multiple layers of noise
        float noise = 0.0;
        vec3 noisePos = vec3(p * 1.5, time * 0.05);
        
        noise += (1.0 - d) * snoise(noisePos) * 0.5 + 0.5;
        noise += snoise(noisePos * 2.0) * 0.25;
        noise += snoise(noisePos * 4.0) * 0.125;
        
        // Fade out edges
        float alpha = smoothstep(0.3, 0.0, d) * noise;
        
        // Final color
        gl_FragColor = vec4(color * noise, alpha * 0.5);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  // Create a plane for the nebula
  const geometry = new THREE.PlaneGeometry(size, size);
  const nebula = new THREE.Mesh(geometry, nebulaMaterial);
  nebula.rotation.x = Math.PI / 2;
  nebula.position.z = -50;

  scene.add(nebula);

  // Animation function
  const animate = (delta: number) => {
    // Update time uniform for animation
    nebulaMaterial.uniforms.time.value += delta;
  };

  // Return functions to update and remove nebula
  return {
    animate,
    dispose: () => {
      scene.remove(nebula);
      geometry.dispose();
      nebulaMaterial.dispose();
    }
  };
};