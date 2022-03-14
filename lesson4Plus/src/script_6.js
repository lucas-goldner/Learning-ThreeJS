import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//Scene
const scene = new THREE.Scene();

//Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(2);
mesh.rotateZ(2);
scene.add(mesh);

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
camera.lookAt(mesh.position);
scene.add(camera);

//Renderer
const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

/**
 * Animate
 */

const clock = new THREE.Clock();
//gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

//Controls
const controls = new OrbitControls(camera, canvas);
//controls.target.y = 2;
//Damping makes animation of controler smoother
controls.enableDamping = true;

// window.addEventListener("mousemove", (event) => {
//   cursor.x = event.clientX / sizes.width - 0.5;
//   cursor.y = -(event.clientY / sizes.height - 0.5);
// });

const tick = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
  controls.update();
  camera.lookAt(mesh.position);
};

tick();

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});
