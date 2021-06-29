import './style.css';

import * as THREE from 'three';

import {OrbitControls} from './node_modules/three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#background'),
});
scene.fog = new THREE.FogExp2(0x11111f, 0.002);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(scene.fog.color);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const beachTexture = new THREE.TextureLoader().load('textures/beach.jpg', function (beachTexture) {
	beachTexture.wrapS = beachTexture.wrapT = THREE.RepeatWrapping;
	beachTexture.repeat.set(18, 18);
});
const beachSurface = new THREE.Mesh(
	new THREE.CircleGeometry(170, 32),
	new THREE.MeshBasicMaterial({ map: beachTexture })
)
// beachSurface.rotation.z = 30;
beachSurface.rotation.x = 30;
beachSurface.position.y = -20;
scene.add(beachSurface);


const hulahoopTexture = new THREE.TextureLoader().load('textures/yellow_red_stripes.jpeg', function (hulahoopTexture) {
	hulahoopTexture.wrapS = hulahoopTexture.wrapT = THREE.RepeatWrapping;
	hulahoopTexture.repeat.set(8, 0.3);
});
const hulahoop = new THREE.Mesh(
	new THREE.TorusGeometry(8, 0.3, 16, 100),
	new THREE.MeshBasicMaterial({ map: hulahoopTexture})
)
hulahoop.position.x = 7;
hulahoop.position.z = -10;
// hulahoop.rotation.x = 30;
scene.add(hulahoop);
// //hulahoop without pattern
// const geometryHoop = new THREE.TorusGeometry(10, 0.3, 16, 100);
// const materialHoop = new THREE.MeshStandardMaterial({color: 0x38aba1});
// const hulahoop = new THREE.Mesh(geometryHoop, materialHoop);
// hulahoop.position.x = 7;
// hulahoop.position.z = -10;
// scene.add(hulahoop);

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(20, 20, 20);
const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(pointLight, ambientLight);

// const pointlightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointlightHelper, gridHelper);
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(gridHelper);

//This will listen to Dom events on the mouse and update the camera position accordingly
//we then need to call controls.update() in the game loop (animation loop)
const controls = new OrbitControls(camera, renderer.domElement);

// //STARS
// function addStar() {
// 	const geometryStar = new THREE.SphereGeometry(0.25, 24, 24);
// 	const materialStar = new THREE.MeshStandardMaterial({color: 0xffffff});
// 	const star = new THREE.Mesh(geometryStar, materialStar);

// 	const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(400));
// 	star.position.set(x, y, z);
// 	scene.add(star);
// }
// Array(400).fill().forEach(addStar);
//Add Bubbles
function addBubble() {
	const geometryBubble = new THREE.SphereGeometry(3, 50, 50);
	const materialBubble = new THREE.MeshPhongMaterial({
		color: 0x42f5cb,
		opacity: 0.5,
		transparent: true
	});
	const bubble = new THREE.Mesh(geometryBubble, materialBubble);

	const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(800));
	bubble.position.set(x, y, z);
	scene.add(bubble);
}
Array(400).fill().forEach(addBubble);

// var bubbles = [];
// function createBubbles() {
// 	var bubble, material;
// 	for (var zpos = -1000 ; zpos < 1000; zpos+=20) {
// 		material = new THREE.ParticleCanvasMaterial({
// 			color: 0x42f5cb,
// 			program: particleRender,
// 			opacity: 0.5,
// 			transparant: true
// 		})
// 		partical = new THREE.Particle(material);
// 		particle.position.x = Math.random() * 1000 - 500;
// 		particle.position.y = Math.random() * 1000 - 500;
// 	}
// }


// createBubbles();



const spaceTexture = new THREE.TextureLoader().load('textures/underwater_wallpaper.jpeg');
scene.background = spaceTexture;

//roosCube
const roosTexture = new THREE.TextureLoader().load('images/Roos_cube-02.png');
const roosCube = new THREE.Mesh(
	new THREE.BoxGeometry(5, 5, 5),
	new THREE.MeshBasicMaterial({ map: roosTexture })
)
roosCube.position.x = 7;
roosCube.position.z = -10;
scene.add(roosCube);
// //roosCube without PICTURE
// const geometryRoos = new THREE.BoxGeometry(5, 5, 5);
// const materialRoos = new THREE.MeshStandardMaterial({color: 0x45962c});
// const roosCube = new THREE.Mesh(geometryRoos, materialRoos);
// roosCube.position.x = 7;
// roosCube.position.z = -10;
// scene.add(roosCube);

//worldSphere
const worldDayTexture = new THREE.TextureLoader().load('textures/fish_texture.jpeg');
const worldNightTexture = new THREE.TextureLoader().load('textures/2k_earth_nightmap.jpeg');
const sunTexture = new THREE.TextureLoader().load('textures/fish_texture_pink.jpeg');
const moonTexture = new THREE.TextureLoader().load('textures/submarine.jpeg');
const normalTexture = new THREE.TextureLoader().load('textures/2k_earth_normal_map.tif');
const worldSphere = new THREE.Mesh(
	new THREE.SphereGeometry(3, 32, 32),
	new THREE.MeshStandardMaterial({
		map: worldDayTexture,
	})
)
const moonSphere = new THREE.Mesh(
	new THREE.SphereGeometry(4, 32, 32),
	new THREE.MeshStandardMaterial({
		map: moonTexture
	})
)
const sunSphere = new THREE.Mesh(
	new THREE.SphereGeometry(6, 32, 32),
	new THREE.MeshStandardMaterial({
		map: sunTexture
	})
)
worldSphere.position.z = 30;
worldSphere.position.x = -10;
moonSphere.position.z = 40;
moonSphere.position.x = 10;
moonSphere.position.y = 10;
sunSphere.position.z = 100;
sunSphere.position.x = 0;
sunSphere.position.y = 15;
scene.add(worldSphere, sunSphere, moonSphere);


function moveCamera() {
	//where is the user currently scrolled to? Get the view port.
	//Call the document body get boudning client rect
	//that will give us the dimensions of the viewport
	//the top porperty will show us how far we are from the top of the webpage
	//from there we can start changing properties on our 3d objects whenever this function is called
	const topValue = document.body.getBoundingClientRect().top;
	// console.log('t: ', topValue);
	worldSphere.rotation.x += 0.05;
	worldSphere.rotation.y += 0.01;
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

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

let t = 0;
function animate() {
	requestAnimationFrame(animate);

	t += 0.01;

	moonSphere.position.x = 20*Math.cos(t) + 0;
	moonSphere.position.z = 20*Math.sin(t) + 0;
	worldSphere.position.x = 50*Math.cos(t) + 0;
	worldSphere.position.z = 50*Math.sin(t) + 0;
	sunSphere.position.x = 5*Math.cos(t) + 0;
	sunSphere.position.y = 5*Math.sin(t) + 0;

	// updateBubbles();
	// hulahoop.rotation.x += 0.006;
	// hulahoop.rotation.y += 0.005;
	// hulahoop.rotation.z += 0.007;
	// hulahoop.position.x = 3*Math.cos(t) + 0;
	// hulahoop.position.z = 3*Math.sin(t) + 0;

	// for (let i = 0; i < 400; i++) {
	// 	Array[0] = Array[0] += 1;
	// }


	controls.update();

	renderer.render(scene, camera);
}
//HIER BEN IK
//http://creativejs.com/tutorials/three-js-part-1-make-a-star-field/index.html
animate();