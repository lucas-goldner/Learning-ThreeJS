import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

//Playing with transform properties
mesh.position.x = 0.7;
mesh.position.y = -0.6;
mesh.position.z = -1;
mesh.scale.x = 2;
mesh.scale.y = 0.2;
mesh.rotation.x = Math.PI * 0.2;
mesh.rotation.y = Math.PI * 0.25;

scene.add(mesh);

const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

const axes = new THREE.AxesHelper(2);
// scene.add(axes);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas.webgl"),
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//Debug
console.log(mesh.position.length());
console.log(mesh.position.distanceTo(camera.position));
console.log(mesh.position.normalize());
console.log(mesh.position.normalize().distanceTo(camera.position.normalize()));
