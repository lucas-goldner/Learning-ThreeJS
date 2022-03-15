import "./style.css";
import * as THREE from "three";
import * as dat from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Debug
 */
const gui = new dat.GUI();

//Scene
const scene = new THREE.Scene();

//Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({
  color: 0xff3344,
  wireframe: true,
});
const materialNoWF = new THREE.MeshBasicMaterial({
  color: 0xff3344,
  wireframe: false,
});
const mesh = new THREE.Mesh(geometry, materialNoWF);
mesh.rotateX(2);
mesh.rotateZ(2);
scene.add(mesh);

const cigeometry = new THREE.SphereGeometry(1, 32, 32);
const cimesh = new THREE.Mesh(cigeometry, material);
cimesh.position.x = 2;
scene.add(cimesh);

const bufferGeo = new THREE.BufferGeometry();

const count = 50;
const positionsArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4;
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
bufferGeo.setAttribute("position", positionsAttribute);
const bufferMesh = new THREE.Mesh(bufferGeo, material);
bufferMesh.position.x = -4;
scene.add(bufferMesh);

//Add  sliders
const parameters = {
  color: 0xff0000,
};
gui
  .addColor(parameters, "color")
  .name("Mat Color")
  .onChange(() => material.color.set(parameters.color));
gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("Cube Y");
gui.add(mesh, "visible").name("Cube Visible");

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
