import './style.css';

import * as THREE from 'three';

import {OrbitControls} from './node_modules/three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#background'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const hulahoopTexture = new THREE.TextureLoader().load('textures/stripe_pattern.jpeg', function (hulahoopTexture) {
	hulahoopTexture.wrapS = hulahoopTexture.wrapT = THREE.RepeatWrapping;
	hulahoopTexture.repeat.set(8, 0.3);
});
const hulahoop = new THREE.Mesh(
	new THREE.TorusGeometry(10, 0.3, 16, 100),
	new THREE.MeshBasicMaterial({ map: hulahoopTexture})
)
// const geometry = new THREE.TorusGeometry(10, 0.3, 16, 100);
// const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
// const hulahoop = new THREE.Mesh(geometry, material);
hulahoop.position.x = 30;
scene.add(hulahoop);

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(20, 20, 20);
const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(pointLight, ambientLight);
// const pointlightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointlightHelper, gridHelper);

//This will listen to Dom events on the mouse and update the camera position accordingly
//we then need to call controls.update() in the game loop (animation loop)
const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({color: 0xffffff});
	const star = new THREE.Mesh(geometry, material);

	const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
	star.position.set(x, y, z);
	scene.add(star);
}

Array(400).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('textures/2k_stars_milky_way.jpeg');
scene.background = spaceTexture;

//roosCube
const roosTexture = new THREE.TextureLoader().load('images/Roos_cube-02.png');
const roosCube = new THREE.Mesh(
	new THREE.BoxGeometry(5, 5, 5),
	new THREE.MeshBasicMaterial({ map: roosTexture })
)
roosCube.position.x = 30;
scene.add(roosCube);

//worldSphere
const worldDayTexture = new THREE.TextureLoader().load('textures/2k_earth_daymap.jpeg');
// const worldNightTexture = new THREE.TextureLoader().load('2k_earth_nightmap.jpeg');
const normalTexture = new THREE.TextureLoader().load('textures/2k_earth_normal_map.tif');
const worldSphere = new THREE.Mesh(
	new THREE.SphereGeometry(3, 32, 32),
	new THREE.MeshStandardMaterial({
		map: worldDayTexture,
		normalMap: normalTexture
	})
)
worldSphere.position.z = 30;
worldSphere.position.x = -10;
scene.add(worldSphere);


function moveCamera() {
	//where is the user currently scrolled to? Get the view port.
	//Call the document body get boudning client rect
	//that will give us the dimensions of the viewport
	//the top porperty will show us how far we are from the top of the webpage
	//from there we can start changing properties on our 3d objects whenever this function is called
	const topValue = document.body.getBoundingClientRect().top;
	// console.log('t: ', topValue);
	worldSphere.rotation.x += 0.05;
	worldSphere.rotation.y += 0.075;
	worldSphere.rotation.z += 0.05;
	worldSphere.position.y *= -(topValue)

	roosCube.rotation.y += 0.01;
	roosCube.rotation.z += 0.01;

	//the top value will always be negative so multiple it by a negative number
	if (topValue < 0) {
		camera.position.z = (topValue * -0.02);
		camera.position.x = (topValue * -0.0004);
		camera.position.y = (topValue * -0.0002);
	} else {
		camera.position.z = (topValue * 0.02);
		camera.position.x = (topValue * 0.0004);
		camera.position.y = (topValue * 0.0002);
	}
}
moveCamera();
document.body.onscroll = moveCamera;

function animate() {
	requestAnimationFrame(animate);

	hulahoop.rotation.x += 0.006;
	hulahoop.rotation.y += 0.005;
	hulahoop.rotation.z += 0.007;

	controls.update();

	// console.log('sphere', worldSphere.position.x, ' ', worldSphere.position.y, ' ', worldSphere.position.z);
	// console.log('canera', camera.position.x, ' ', camera.position.y, ' ', camera.position.z);
	// console.log('cube', roosCube.position.x, ' ', roosCube.position.y, ' ', roosCube.position.z);

	renderer.render(scene, camera);
}

animate();