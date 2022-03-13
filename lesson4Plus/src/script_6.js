import "./style.css";
import * as THREE from "three";

//Scene
const scene = new THREE.Scene();

//Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Camera
const sizes = {
  width: window.innerWidth * 0.9,
  height: window.innerHeight * 0.9,
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
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
const tick = () => {
  mesh.rotation.y += 0.02;
  mesh.rotation.z += 0.01;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
