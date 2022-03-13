import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

//Scene
const scene = new THREE.Scene();

//Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Camera
const sizes = {
  width: window.innerWidth * 0.9,
  height: window.innerHeight * 0.9,
};
// const camera = new THREE.PerspectiveCamera(
//   75,
//   sizes.width / sizes.height,
//   1,
//   100
// );
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.OrthographicCamera(
  -1 * aspectRatio,
  1 * aspectRatio,
  1,
  -1,
  0.1,
  100
);

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

const clock = new THREE.Clock();
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });

const tick = () => {
  //Time

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
