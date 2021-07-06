import './style.css';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls';
import { STLLoader } from './node_modules/three/examples/jsm/loaders/STLLoader';
import { OBJLoader } from './node_modules/three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from './node_modules/three/examples/jsm/loaders/MTLLoader';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader';

CameraControls.install({THREE: THREE});
const pi_180 = Math.PI / 180;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#background'),
});
scene.fog = new THREE.FogExp2(0x11111f, 0.002);
camera.position.set(-900, -200, -900);
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
	new THREE.MeshBasicMaterial({ color: 0xddeeff })
	)
	beachSurface.material.side = THREE.DoubleSide;
	// beachSurface.rotation.z = 30;
	beachSurface.rotation.x = 270 * pi_180;
	beachSurface.position.y = -40;
	// scene.add(beachSurface);
	
const museum = new THREE.Mesh(
	new THREE.BoxGeometry(500, 250, 500),
	new THREE.MeshBasicMaterial({color: 0xcceeee})
)
museum.material.side = THREE.DoubleSide;
scene.add(museum);

// const hulahoopTexture = new THREE.TextureLoader().load('textures/yellow_red_stripes.jpeg', function (hulahoopTexture) {
// 	hulahoopTexture.wrapS = hulahoopTexture.wrapT = THREE.RepeatWrapping;
// 	hulahoopTexture.repeat.set(8, 0.3);
// });
// const hulahoop = new THREE.Mesh(
// 	new THREE.TorusGeometry(8, 0.3, 16, 100),
// 	new THREE.MeshBasicMaterial({ map: hulahoopTexture})
// )
// hulahoop.position.x = 7;
// hulahoop.position.z = -10;
// // hulahoop.rotation.x = 30;
// scene.add(hulahoop);


const pointLight = new THREE.PointLight(0xFFFFFF);
const pointLightYellow1 = new THREE.PointLight(0xFFFF33);
pointLight.position.set(20, 20, 20);
pointLight.position.set(400, 200, 100);
const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(pointLight, pointLightYellow1, ambientLight);
const pointlightHelper = new THREE.PointLightHelper(pointLight, pointLightYellow1);
const gridHelper = new THREE.GridHelper(500,250);
scene.add(pointlightHelper, gridHelper);
// scene.add(gridHelper);

//This will listen to Dom events on the mouse and update the camera position accordingly
//we then need to call controls.update() in the game loop (animation loop)

//dit moet weer aangezet worden
let controls = new OrbitControls(camera, renderer.domElement);
// controls.addEventListener('change', renderer);
controls.minDistance = 300;
controls.maxDistance = 1500;






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

//all Spheres
// const worldDayTexture = new THREE.TextureLoader().load('textures/fish_texture.jpeg');
// const worldNightTexture = new THREE.TextureLoader().load('textures/2k_earth_nightmap.jpeg');
// const sunTexture = new THREE.TextureLoader().load('textures/fish_texture_pink.jpeg');
// const moonTexture = new THREE.TextureLoader().load('textures/submarine.jpeg');
// const normalTexture = new THREE.TextureLoader().load('textures/2k_earth_normal_map.tif');
// const worldSphere = new THREE.Mesh(
// 	new THREE.SphereGeometry(3, 32, 32),
// 	new THREE.MeshStandardMaterial({
// 		map: worldDayTexture,
// 	})
// )
// const moonSphere = new THREE.Mesh(
// 	new THREE.SphereGeometry(4, 32, 32),
// 	new THREE.MeshStandardMaterial({
// 		map: moonTexture
// 	})
// )
// const sunSphere = new THREE.Mesh(
// 	new THREE.SphereGeometry(6, 32, 32),
// 	new THREE.MeshStandardMaterial({
// 		map: sunTexture
// 	})
// )
// worldSphere.position.z = 30;
// worldSphere.position.x = -10;
// moonSphere.position.z = 40;
// moonSphere.position.x = 10;
// moonSphere.position.y = 10;
// sunSphere.position.z = 100;
// sunSphere.position.x = -50;
// sunSphere.position.y = 15;
// scene.add(worldSphere, sunSphere, moonSphere);
// scene.add(sunSphere);
// scene.add(moonSphere);
// scene.add(worldSphere);

// //FISHES
const textureParasect = new THREE.TextureLoader().load('models/textures/Parasect_pm0047_00_BodyA1.png');
const materialParasect = new THREE.MeshPhongMaterial({
	map: textureParasect
})
const loaderParasect = new OBJLoader();
loaderParasect.load(
	'models/Parasect.obj',
	function (objectParasect) {
		objectParasect.traverse(function ( node ) {
			if (node.isMesh) {
				node.material = materialParasect;
			}
		})
		scene.add(objectParasect);
		objectParasect.rotation.x = 70 * pi_180;
		objectParasect.position.x = 20
		objectParasect.position.z = 30
		objectParasect.position.y = -40;
	},
	function (xhr) {
		console.log((xhr.loaded / xhr.total * 100) + '% loaded' );
	},
	function (error) {
		console.log('An error occurred');
	}
)

const gltfLoaderShell = new GLTFLoader();
const pathShell = 'models/shell/shell.gltf';
gltfLoaderShell.load(pathShell, (gltf) => {
	const shell = gltf.scene;
	shell.position.x = 30;
	shell.position.y = -48;
	shell.position.z = -40;
	shell.rotation.x = 85 * pi_180;
	scene.add(shell);
},
function (xhr) {
	console.log((xhr.loaded /xhr.total * 100) + '% loaded (shell)');
},
function (error) {
	console.log('Error: ' + error);
});

const gltfLoaderRock = new GLTFLoader();
const pathRock = 'models/starfish/scene.gltf';
gltfLoaderRock.load(pathRock, (gltf) => {
	const rock = gltf.scene;
	rock.position.x = -30;
	rock.position.y = -38;
	rock.position.z = -40;
	// rock.rotation.x = 85 * pi_180;
	scene.add(rock);
},
function (xhr) {
	console.log((xhr.loaded /xhr.total * 100) + '% loaded (rock)');
},
function (error) {
	console.log('Error: ' + error);
});

let submarine;
const gltfLoaderSubmarine = new GLTFLoader();
const pathSubmarine = 'models/submarine/scene.gltf';
gltfLoaderSubmarine.load(pathSubmarine, (gltf) => {
	submarine = gltf.scene;
	submarine.position.x = -17;
	submarine.position.y = -20
	submarine.position.z = 120;
	submarine.scale.set(50, 50, 50);
	scene.add(submarine);
},
function (xhr) {
	console.log((xhr.loaded /xhr.total * 100) + '% loaded (submarin)');
},
function (error) {
	console.log('Error: ' + error);
});

let increment_x = false;
let turn = false;

function updateSubmarine() {
	if (submarine) {
		if (submarine.position.z <= 120 && increment_x == true && turn == false) {
			submarine.position.z += 0.3;
			if (submarine.position.z >= 119) {
				increment_x = false;
				turn = true;
				}
			}
		else if (submarine.position.z >= -120 && increment_x == false && turn == false) {
			submarine.position.z -= 0.3;
			if (submarine.position.z <= -120) {
				increment_x = true;
				turn = true;
			}
		}
		if (turn == true) {
			if (submarine.position.z >= 119 && submarine.rotation.y > 0) {
				submarine.rotation.y -= (1 * pi_180);
				if (submarine.rotation.y <= 0) {
					turn = false;
				}
			}
			if (submarine.position.z <= -119 && submarine.rotation.y < 4) {
				submarine.rotation.y += (1 * pi_180);
				if (submarine.rotation.y > 3) {
					turn = false;
				}
			}
		}
	}
}

var shark;
const textureShark = new THREE.TextureLoader().load('models/textures/cartoon_shark.jpg');
const materialShark = new THREE.MeshPhongMaterial({
	map: textureShark
})
const loaderShark = new OBJLoader();
loaderShark.load(
	'models/cartoon_shark.obj',
	function (objectShark) {
		objectShark.traverse(function ( node ) {
			if (node.isMesh) {
				node.material = materialShark;
			}
		})
		shark = objectShark;
		scene.add(objectShark);
		objectShark.rotation.x = 30 * pi_180;
		objectShark.position.x = 50
		objectShark.position.z = -50
		objectShark.position.y = 3.5;
	},
	function (xhr) {
		console.log((xhr.loaded / xhr.total * 100) + '% loaded' );
	},
	function (error) {
		console.log('An error occurred');
	}
)

function updateShark() {
	if (shark) {
		shark.position.x = 100*Math.cos(t) + 50;
		shark.position.z = 100*Math.sin(t) + -50;
		shark.rotation.y = shark.rotation.y - (0.5 * pi_180);
	}
}


function moveCamera() {
	//where is the user currently scrolled to? Get the view port.
	//Call the document body get boudning client rect
	//that will give us the dimensions of the viewport
	//the top porperty will show us how far we are from the top of the webpage
	//from there we can start changing properties on our 3d objects whenever this function is called
	const topValue = document.body.getBoundingClientRect().top;
	// worldSphere.rotation.x += 0.05;
	// worldSphere.rotation.y += 0.01;
	// worldSphere.rotation.z += 0.05;
	// worldSphere.position.y *= -(topValue)

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

	// moonSphere.position.x = 20*Math.cos(t) + 20;
	// moonSphere.position.z = 20*Math.sin(t) + 10;
	// worldSphere.position.x = 50*Math.cos(t) + 5;
	// worldSphere.position.z = 50*Math.sin(t) + 10;
	// sunSphere.position.x = 5*Math.cos(t) + -15;
	// sunSphere.position.y = 5*Math.sin(t) + 0;
	// objectShark.position.x = 70*Math.cos(t) + 0;
	// objectShark.position.y = 70*Math.sin(t) + 0;


	// hulahoop.rotation.x += 0.006;
	// hulahoop.rotation.y += 0.005;
	// hulahoop.rotation.z += 0.007;
	// hulahoop.position.x = 3*Math.cos(t) + 0;
	// hulahoop.position.z = 3*Math.sin(t) + 0;
	
	
	updateShark();
	updateSubmarine();
	controls.update(); //dit moet weer aangezet worden

	renderer.render(scene, camera);
}

animate();