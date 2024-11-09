/* -----> Import Third Party Packages <----- */
import * as THREE from "three";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";

/* -----> Where to Render <----- */
const character = document.getElementById("character");

/* -----> What to Render <----- */

/* -----> 01 Director <------ */
const size = { width: window.innerWidth, height: window.innerHeight };

const director = new THREE.WebGLRenderer({ canvas: character });
director.setSize(size.width, size.height);
director.setClearColor(0x000000, 0); // set background color as transparent

/* -----> 02 Scene <----- */
const scene = new THREE.Scene();
scene.background = null;

// Set up the scene, camera, and director

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 40; // Adjust camera position closer to the object

// Add lighting to the scene
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Load the FBX model
const loader = new FBXLoader();
loader.load(
	"assets/mixamo1.fbx",
	(object) => {
		scene.add(object);

		// Scale the character (e.g., scale it to 10% of its original size)
		object.scale.set(0.1, 0.1, 0.1); // Adjust scale as needed

		// Traverse the object to ensure all materials are correctly applied
		object.traverse((child) => {
			if (child.isMesh) {
				// Check if the mesh has a texture and apply a default material if not
				if (child.material.map) {
					child.material = new THREE.MeshStandardMaterial({
						map: child.material.map, // Apply existing texture
					});
				} else {
					// Apply default material if no texture
					child.material = new THREE.MeshStandardMaterial({
						color: 0xaaaaaa, // Default gray if no texture found
					});
				}
			}
		});

		// Create a mixer for animations
		const mixer = new THREE.AnimationMixer(object);

		// Check if the FBX model has animations and play them
		if (object.animations && object.animations.length) {
			object.animations.forEach((clip) => {
				mixer.clipAction(clip).play();
			});
		}

		// Animation loop
		function animate() {
			requestAnimationFrame(animate);

			// Update the mixer if there are animations
			if (mixer) mixer.update(0.01);

			director.render(scene, camera);
		}

		// Start the animation loop
		animate();
	},
	undefined,
	(error) => {
		console.error("Error loading FBX model:", error);
	}
);

// Resize handler for responsive design
window.addEventListener("resize", () => {
	size.width = window.innerWidth;
	size.height = window.innerHeight;
	director.setSize(size.width, size.height);
	camera.aspect = size.width / size.height;
	camera.updateProjectionMatrix();
});
