import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//Scene
const scene = new THREE.Scene();

//Texture
const textureLoader = new THREE.TextureLoader();
const diamondTex = textureLoader.load("./diamond_ore.png");
diamondTex.generateMipmaps = false;
diamondTex.minFilter = THREE.NearestFilter;
diamondTex.magFilter = THREE.NearestFilter;

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
matcapMaterial.matcap = diamondTex;

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  matcapMaterial
);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), matcapMaterial);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  matcapMaterial
);
torus.position.x = 1.5;

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

//Renderer
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

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
