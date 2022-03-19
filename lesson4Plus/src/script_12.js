import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

//Scene
const gui = new dat.GUI();
const scene = new THREE.Scene();

//Texture
const textureLoader = new THREE.TextureLoader();
const diamondTex = textureLoader.load("./diamond_ore.png");
diamondTex.generateMipmaps = false;
diamondTex.minFilter = THREE.NearestFilter;
diamondTex.magFilter = THREE.NearestFilter;

//For more matcap textures visit https://github.com/nidorx/matcaps
const doorColorTexture = textureLoader.load("./door/color.jpg");
const doorAlphaTexture = textureLoader.load("./door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("./door/height.jpg");
const doorNormalTexture = textureLoader.load("./door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("./door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("./door/roughness.jpg");
const matcapTexture1 = textureLoader.load("./matcaps/2.png");
const matcapTexture2 = textureLoader.load("./matcaps/3.png");
const matcapTexture3 = textureLoader.load("./matcaps/4.png");
const matcapTexture4 = textureLoader.load("./matcaps/5.png");
const matcapTexture5 = textureLoader.load("./matcaps/6.png");
const matcapTexture6 = textureLoader.load("./matcaps/7.png");
const matcapTexture7 = textureLoader.load("./matcaps/8.png");
const gradientTexture3 = textureLoader.load("./gradients/3.jpg");
const gradientTexture5 = textureLoader.load("./gradients/5.jpg");
const spaceBG = textureLoader.load("./space.jpeg");

const cubeTextureLoader = new THREE.CubeTextureLoader();

//For more environment maps visit https://polyhaven.com/
const environmentMapTexture = cubeTextureLoader.load([
  "./environmentMaps/0/px.jpg",
  "./environmentMaps/0/nx.jpg",
  "./environmentMaps/0/py.jpg",
  "./environmentMaps/0/ny.jpg",
  "./environmentMaps/0/pz.jpg",
  "./environmentMaps/0/nz.jpg",
]);

scene.background = spaceBG;

//Object
const material = new THREE.MeshBasicMaterial({ map: diamondTex });
material.color = new THREE.Color("#ff0000");
material.transparent = true;
material.opacity = 0.5;
material.transparent = true;
material.alphaMap = diamondTex;
material.side = THREE.DoubleSide;

//Normal mesh
const normalMaterial = new THREE.MeshNormalMaterial();
normalMaterial.flatShading = true;

//Matcap mesh
const matcapMaterial = new THREE.MeshMatcapMaterial();
matcapMaterial.matcap = matcapTexture7;

//MeshCapMaterial
const meshCapMaterial = new THREE.MeshDepthMaterial();

//MeshLambertMaterial gets affected by light
const meshLambertMaterial = new THREE.MeshLambertMaterial();

//MeshPhongMaterial also gets affected and lets you see light relections on surface of geometry
const meshPhongMaterial = new THREE.MeshPhongMaterial();
meshPhongMaterial.shininess = 100;
meshPhongMaterial.specular = new THREE.Color(0x1188ff);

//ToonMaterial also gets affected by light
const toonMaterial = new THREE.MeshToonMaterial();
toonMaterial.gradientMap = gradientTexture5;
gradientTexture5.minFilter = THREE.NearestFilter;
gradientTexture5.magFilter = THREE.NearestFilter;
gradientTexture5.generateMipmaps = false;

//MeshStandardMaterial also gets affected by light
const meshStandardMaterial = new THREE.MeshStandardMaterial();
meshStandardMaterial.metalness = 0.7;
meshStandardMaterial.roughness = 0.2;
meshStandardMaterial.envMap = environmentMapTexture;
// meshStandardMaterial.map = doorColorTexture;
// meshStandardMaterial.aoMap = doorAmbientOcclusionTexture;
// meshStandardMaterial.aoMapIntensity = 1;
// meshStandardMaterial.displacementMap = doorHeightTexture;
// meshStandardMaterial.displacementScale = 0.05;
// meshStandardMaterial.metalnessMap = doorMetalnessTexture;
// meshStandardMaterial.roughnessMap = doorRoughnessTexture;
// meshStandardMaterial.metalness = 0;
// meshStandardMaterial.roughness = 1;
// meshStandardMaterial.normalMap = doorNormalTexture;
// meshStandardMaterial.normalScale.set(0.5, 0.5);
// meshStandardMaterial.transparent = true;
// meshStandardMaterial.alphaMap = doorAlphaTexture;

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  meshStandardMaterial
);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  meshStandardMaterial
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  meshStandardMaterial
);

torus.position.x = 1.5;
sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);
torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

scene.add(sphere, plane, torus);

//Camera
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  100
);

camera.position.z = 3;
camera.lookAt(sphere.position);
scene.add(camera);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

//Renderer
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//Debug
gui.add(meshStandardMaterial, "metalness").min(0).max(1).step(0.0001);
gui.add(meshStandardMaterial, "roughness").min(0).max(1).step(0.0001);

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
  controls.update();
};

tick();

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});
