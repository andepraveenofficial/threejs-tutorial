/* -----> import third party packages <----- */
import * as THREE from "three";

// console.log(THREE);

/* -----> Director <----- */

// Step 1 : Where to render -> Select the canvas element
const box = document.getElementById("box");

// Step 2: What to render -> Set up the renderer
const size = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const director = new THREE.WebGLRenderer({ canvas: box });
director.setSize(size.width, size.height);
director.setClearColor("0x202020"); // Set background color

// Step 3: Create the scene
const scene = new THREE.Scene();

// Step 4: Define geometry and material
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// Step 5: Create a mesh by combining geometry and material
const object = new THREE.Mesh(geometry, material);
// object.rotation.x = 3;
object.rotateX(3);
object.rotateY(2);
object.rotateZ(1);
scene.add(object); // Add object to the scene

// Step 6: Create a camera
const camera = new THREE.PerspectiveCamera(45, size.width / size.height);
camera.position.z = 5; // camera position
camera.rotateX(0.2);

// Step 7: Render the scene with the camera

/* -----> Helpers <----- */
// Axis helper
const axisHelper = new THREE.AxesHelper(4);
scene.add(axisHelper);

director.render(scene, camera); // render the 3D object
