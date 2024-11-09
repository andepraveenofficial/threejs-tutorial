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
// const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const geometry = new THREE.TorusGeometry(10, 3, 10, 100);

// Step 5: Create a mesh by combining geometry and material
const object = new THREE.Mesh(geometry, material);
// object.position.x = 2; // object position
// object.position.set(2, 0, 0); // object position
object.scale.set(0.2, 0.2, 0.2);
scene.add(object); // Add object to the scene

// Step 6: Create a camera
const camera = new THREE.PerspectiveCamera(45, size.width / size.height);
camera.position.z = 5; // camera position

// Step 7: Render the scene with the camera

director.render(scene, camera); // render the 3D object

// Run the Animation Loop
function animate() {
	const axisHelper = new THREE.AxesHelper();
	scene.add(axisHelper);

	// Add rotation for some animation
	object.rotation.x += 0.01;
	object.rotation.y += 0.01;

	director.render(scene, camera);
}
animate(); // Start the animation loop

director.setAnimationLoop(animate);

/* -----> Helpers <----- */
// Axis helper
const axisHelper = new THREE.AxesHelper(4);
scene.add(axisHelper);
