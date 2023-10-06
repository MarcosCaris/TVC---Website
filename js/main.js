import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

// Set up the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let object;

let controls;

let objToRender = 'card';
const loader = new GLTFLoader();

// Load the 3D model
loader.load(
	`model/${objToRender}/scene.gltf`,
	function (gltf) {
		object = gltf.scene;
		scene.add(object);
	},
	function (xhr) {
		//While it is loading, log the progress
		console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
	},
	function (error) {
		//If there is an error, log it
		console.error(error);
	}
);

const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById('container3D').appendChild(renderer.domElement);

camera.position.z = objToRender === 'card' ? 5 : 500;

if (objToRender === 'card') {
	controls = new OrbitControls(camera, renderer.domElement);
	controls.enableZoom = false;
	controls.enablePan = false;
}
const fixedWidth = 800;
const fixedHeight = 600;

// Set the initial size of the renderer
renderer.setSize(fixedWidth, fixedHeight);

// Update the camera's aspect ratio based on the fixed size
camera.aspect = fixedWidth / fixedHeight;
camera.updateProjectionMatrix();

function animate() {
	requestAnimationFrame(animate);
	// Ensure that controls are updated
	renderer.render(scene, camera);
}
// Start the animation loop
animate();
