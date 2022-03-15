import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//Scene
const scene = new THREE.Scene();

//Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: 0xff3344,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(2);
mesh.rotateZ(2);
scene.add(mesh);

const cigeometry = new THREE.SphereGeometry(1, 32, 32);
const cimesh = new THREE.Mesh(cigeometry, material);
cimesh.position.x = 2;
scene.add(cimesh);

const bufferGeo = new THREE.BufferGeometry();
const positionsArray = new Float32Array([
  0,
  0,
  0, // First vertex
  0,
  1,
  0, // Second vertex
  1,
  0,
  0, // Third vertex
]);
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
bufferGeo.setAttribute("position", positionsAttribute);
const bufferMesh = new THREE.Mesh(bufferGeo, material);
bufferMesh.position.x = -2;
scene.add(bufferMesh);

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

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

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
