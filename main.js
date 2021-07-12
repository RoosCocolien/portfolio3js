import './style.css';
import * as THREE from 'three';
// import CameraControls from 'camera-controls';
// import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls';
// import { STLLoader } from './node_modules/three/examples/jsm/loaders/STLLoader';
import { OBJLoader } from './node_modules/three/examples/jsm/loaders/OBJLoader';
// import { CubeCamera } from 'three';

// CameraControls.install({THREE: THREE});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 600);
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#background'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
document.body.appendChild(renderer.domElement);
const floorHeight = -10;
const objectHeight = -5;
camera.position.set(0, 0, 0);
camera.rotation.set(0, 0, 0);
let keyboardControls = false;
let resetCamera = false;
let reading = true;

//SKYBOX
let materialArr = [];
let tex_ft = new THREE.TextureLoader().load('textures/skybox/valley_ft.jpg');
let tex_bk = new THREE.TextureLoader().load('textures/skybox/valley_bk.jpg');
let tex_up = new THREE.TextureLoader().load('textures/skybox/valley_up.jpg');
let tex_dn = new THREE.TextureLoader().load('textures/skybox/valley_dn.jpg');
let tex_rt = new THREE.TextureLoader().load('textures/skybox/valley_rt.jpg');
let tex_lf = new THREE.TextureLoader().load('textures/skybox/valley_lf.jpg');

materialArr.push(new THREE.MeshBasicMaterial({map: tex_ft}));
materialArr.push(new THREE.MeshBasicMaterial({map: tex_bk}));
materialArr.push(new THREE.MeshBasicMaterial({map: tex_up}));
materialArr.push(new THREE.MeshBasicMaterial({map: tex_dn}));
materialArr.push(new THREE.MeshBasicMaterial({map: tex_rt}));
materialArr.push(new THREE.MeshBasicMaterial({map: tex_lf}));

for (let i = 0; i < 6; i++)
materialArr[i].side = THREE.BackSide;

let skyboxGeo = new THREE.BoxGeometry(300, 300, 300);
let skybox = new THREE.Mesh(skyboxGeo, materialArr);
scene.add(skybox);

const pointLight = new THREE.PointLight(0xFFFFFF);
// const pointLight2 = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(30, 30, 30);
const ambientLight = new THREE.AmbientLight(0xFFFFFF);
// scene.add(pointLight, ambientLight);
scene.add(pointLight, ambientLight);

// const pointlightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointlightHelper, gridHelper);
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(gridHelper);

//This will listen to Dom events on the mouse and update the camera position accordingly
//we then need to call controls.update() in the game loop (animation loop)

//dit moet weer aangezet worden
// const controls = new OrbitControls(camera, renderer.domElement);

//GRASS FLOOR
const beachTexture = new THREE.TextureLoader().load('textures/GrassGreenTexture0006.jpg', function (beachTexture) {
	beachTexture.wrapS = beachTexture.wrapT = THREE.RepeatWrapping;
	beachTexture.repeat.set(3, 3);
});
const grassSurface = new THREE.Mesh(
	new THREE.CircleGeometry(90, 30),
	new THREE.MeshBasicMaterial({ map: beachTexture })
)
grassSurface.rotation.x = 270 * (Math.PI / 180);
grassSurface.position.y = floorHeight;
scene.add(grassSurface);


function createModelAddToScene(textureFile, objectFile, scale, x, y, z)
{
	let model = new THREE.Mesh;
	const textureLoader = new THREE.TextureLoader().load(textureFile);
	const materialObject = new THREE.MeshPhongMaterial({
		map: textureLoader
	});
	const loaderObject = new OBJLoader();
	loaderObject.load(objectFile,
		function (objectModel) {
			objectModel.traverse(function (node) {
				if (node.isMesh) {
					node.material = materialObject;
					node.scale.set(scale, scale, scale);
					node.position.set(x, y, z);
					node.rotation.y = 130 * (Math.PI / 180);
				}
			})
			model = objectModel;
			scene.add(model);
			
		},
		function (xhr) {
			console.log(('Bicycle ' + xhr.loaded / xhr.total * 100) + '% loaded');
		},
		function (err) {
			console.log('Error occurred: ' + err);
		}
	)
	return (model);
}

//COMPUTER
function createComputer() {
	const computer = new THREE.Group();
	const materialComputer = new THREE.MeshPhongMaterial({color : 0x4b5661});
	const materialKeyBlue = new THREE.MeshPhongMaterial({color: 0x003cff});
	const materialKeyGreen = new THREE.MeshPhongMaterial({color: 0x009c2f});
	const materialKeyRed = new THREE.MeshPhongMaterial({color: 0x910c00});
	const materialScreen = new THREE.MeshPhongMaterial({color: 0x5a9190});
	//keyboard
	const keyboard = new THREE.Mesh(new THREE.BoxGeometry(5, 0.5, 3), materialComputer);
	keyboard.position.y = objectHeight;
	const keyGeo = new THREE.BoxGeometry(1, 1, 1);
	const keyBlue = new THREE.Mesh(keyGeo, materialKeyBlue);
	keyBlue.position.y = objectHeight + 0.3;
	keyBlue.position.x = -1.5;
	const keyGreen = new THREE.Mesh(keyGeo, materialKeyGreen);
	keyGreen.position.y = objectHeight + 0.3;
	const keyRed = new THREE.Mesh(keyGeo, materialKeyRed);
	keyRed.position.y = objectHeight + 0.3;
	keyRed.position.x = 1.5;
	//desktop
	const base = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.7, 0.5, 21, 1), materialComputer);
	base.position.z = -5;
	base.position.y = objectHeight;
	const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.5, 21, 1), materialComputer);
	neck.position.z = -5;
	neck.position.y = objectHeight + 1;
	const computerBox = new THREE.Mesh(new THREE.BoxGeometry(9, 5, 2), materialComputer);
	computerBox.position.z = -5;
	computerBox.position.y = objectHeight + 4;
	const screen = new THREE.Mesh(new THREE.BoxGeometry(8, 4.5, 0.5), materialScreen);
	screen.position.z = -3.9;
	screen.position.y = objectHeight + 4.1;
	computer.add(keyboard,keyBlue,keyGreen,keyRed, base, neck, computerBox, screen);
	return (computer);
}

//CHURCH
function createChurch() {
	const church = new THREE.Group();
	
	const stoneTexture = new THREE.TextureLoader().load('textures/stones.jpeg', function (stoneTexture) {
		stoneTexture.wrapS = stoneTexture.wrapT = THREE.RepeatWrapping;
		stoneTexture.repeat.set(2, 2);
	});
	const roofTexture = new THREE.TextureLoader().load('textures/roof_tiles.jpeg', function (roofTexture) {
		roofTexture.wrapS = roofTexture.wrapT = THREE.RepeatWrapping;
		roofTexture.repeat.set(2, 2);
	})
	const building = new THREE.Mesh(
		new THREE.BoxGeometry(10, 5, 5),
		new THREE.MeshBasicMaterial({ map: stoneTexture})
		)
		building.position.x = 0;
		building.position.z = -20;
		building.position.y = objectHeight;
		// church.rotation.y = 30 * (Math.PI / 180);
		const roof = new THREE.Mesh(
			new THREE.BoxGeometry(5, 3.8, 3.8),
			new THREE.MeshBasicMaterial({ map: roofTexture})
			)
	roof.position.x = 2.4;
	roof.position.z = -20;
	roof.position.y = objectHeight + 2.4;
	// roof.rotation.z = 90 * (Math.PI / 180);
	// roof.rotation.y = 30 * (Math.PI / 180);
	roof.rotation.x = 45 * (Math.PI / 180);
	const tower = new THREE.Mesh(
		new THREE.BoxGeometry(5, 7, 5),
		new THREE.MeshBasicMaterial({map:stoneTexture})
	)
	tower.position.x = -2.5;
	tower.position.z = -20;
	tower.position.y = objectHeight + 6;
	const towerTop = new THREE.Mesh(
		new THREE.ConeGeometry(4, 4, 4),
		new THREE.MeshLambertMaterial({map: roofTexture})
		)
	towerTop.position.x = -2.5;
	towerTop.position.z = -20;
	towerTop.position.y = objectHeight + 11.5;
	towerTop.rotation.y = 45 * (Math.PI / 180);
	church.add(building, roof, tower, towerTop);
	church.position.x = 0;
	church.rotation.y = 5 * (Math.PI / 180);
	church.name = "church";
	return (church);
}
		
		
		
//gearWheel
function createGearBox(texture) {
	const gearBox = new THREE.Mesh(
		new THREE.CylinderGeometry(0.7, 1, 1.5, 6, 1),
		new THREE.MeshPhongMaterial( {map: texture} )
	)
	return (gearBox);
} 
	
function createGearWheel() {
	const gearWheel = new THREE.Group();
	const gearWheelTexture = new THREE.TextureLoader().load('textures/submarine.jpeg');
	const box1 = createGearBox(gearWheelTexture);
	box1.position.y = 3.75;
	const box2 = createGearBox(gearWheelTexture);
	box2.rotation.z = 45 * (Math.PI / 180);
	box2.position.y = 2.75;
	box2.position.x = -2.75
	const box3 = createGearBox(gearWheelTexture);
	box3.rotation.z = 90 * (Math.PI / 180);
	box3.position.y = 0;
	box3.position.x = -3.75
	const box4 = createGearBox(gearWheelTexture);
	box4.rotation.z = 135 * (Math.PI / 180);
	box4.position.y = -2.75;
	box4.position.x = -2.75;
	const box5 = createGearBox(gearWheelTexture);
	box5.rotation.z = 180 * (Math.PI / 180);
	box5.position.y = -3.75;
	box5.position.x = 0;
	const box6 = createGearBox(gearWheelTexture);
	box6.rotation.z = 225 * (Math.PI / 180);
	box6.position.y = -2.75;
	box6.position.x = 2.75
	const box7 = createGearBox(gearWheelTexture);
	box7.rotation.z = 270 * (Math.PI / 180);
	box7.position.y = 0;
	box7.position.x = 3.75
	const box8 = createGearBox(gearWheelTexture);
	box8.rotation.z = 315 * (Math.PI / 180);
	box8.position.y = 2.75;
	box8.position.x = 2.75
	const innerWheel = new THREE.Mesh(
		new THREE.TorusGeometry(3, 1, 4, 8, 6.3),
		new THREE.MeshPhongMaterial( {map: gearWheelTexture})
		)
	gearWheel.add(box1, box2, box3, box4, box5, box6, box7, box8, innerWheel);
	return (gearWheel);
}
const gearWheel = createGearWheel();
gearWheel.position.set(17, objectHeight + 3, -5);
gearWheel.rotation.y = 288 * (Math.PI / 180);

//create transparant meshes
function createTransparantMesh(x, y, z) {
	const object = new THREE.Mesh(
		new THREE.BoxGeometry(10, 10, 10),
		new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true})
	)
	object.position.set(x, y, z);
	object.visible = false;
	return (object);
}

// const torusHelper = new THREE.Mesh(
// 	new THREE.TorusGeometry(20, 1, 16, 100),
// 	new THREE.MeshBasicMaterial({color: 0xffffff})
// )
// torusHelper.rotation.x = 90 * (Math.PI / 180);
// scene.add(torusHelper);

// createBicycleAddToScene();
let rock = createModelAddToScene('models/rock/textures/Rock_6_d.jpg','models/rock/Rock_6.OBJ', 5, -19, objectHeight, -6.18);
let bicycle = createModelAddToScene('models/bicycle2/textures/bicycle2_BaseColor.png','models/bicycle2/bicycle2_002.obj', 0.2, 12, objectHeight - 2, 12);
let computer = createComputer();
let church = createChurch();
computer.position.set(-10, objectHeight + 4, 10);
computer.rotation.y = 130 * (Math.PI / 180);
scene.add(computer);
scene.add(church);
scene.add(gearWheel);

//create transp meshes
const churchObject = createTransparantMesh(0, -2, -20);
const gearObject = createTransparantMesh(19, -3, -6.18);
const bicycleObject = createTransparantMesh(15, -2, 13);
const computerObject = createTransparantMesh(-10, -2, 10);
const rockObject = createTransparantMesh(-15, -2, -5);
scene.add(churchObject, gearObject, bicycleObject, computerObject, rockObject);


// function moveCamera() {
// 	//where is the user currently scrolled to? Get the view port.
// 	//Call the document body get boudning client rect
// 	//that will give us the dimensions of the viewport
// 	//the top porperty will show us how far we are from the top of the webpage
// 	//from there we can start changing properties on our 3d objects whenever this function is called
// 	const topValue = document.body.getBoundingClientRect().top;
// 	// worldSphere.rotation.x += 0.05;
// 	// worldSphere.rotation.y += 0.01;
// 	// worldSphere.rotation.z += 0.05;
// 	// worldSphere.position.y *= -(topValue)
	
// 	// roosCube.rotation.y += 0.01;
// 	// roosCube.rotation.z += 0.01;
	
// 	//the top value will always be negative so multiple it by a negative number
// 	if (topValue < 0) {
// 		camera.position.z = (topValue * -0.005);
// 		camera.position.x = (topValue * -0.0001);
// 		camera.position.y = (topValue * -0.00005);
// 	} else {
// 		camera.position.z = (topValue * 0.005);
// 		camera.position.x = (topValue * 0.0001);
// 		camera.position.y = (topValue * 0.00005);
// 	}
// }
// moveCamera();
// document.body.onscroll = moveCamera;

function scrollBackToTop() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

function activateInteraction() {
	setTimeout(function() {
		reading = false;
		keyboardControls = true;
	}, 1000);
}

const welcomeDiv = document.getElementById("textWelcome");
const menuDiv = document.getElementById("textMenu");
const welcomeBtn = document.getElementById("yesButton");
const startBtn = document.getElementById("startButton")
welcomeBtn.onclick = function () {
	if (welcomeDiv.style.display !== "none") {
		welcomeDiv.style.display = "none";
		menuDiv.style.display = "block";
		scrollBackToTop();
	} else {
		welcomeDiv.style.display = "block";
	}
}
startBtn.onclick = function () {
	if (menuDiv.style.display !== "none") {
		menuDiv.style.display = "none";
		scrollBackToTop();
		activateInteraction();
	} else {
		welcomeDiv.style.display = "block";
	}
}
const churchDiv = document.getElementById("textChurch");
const gearDiv = document.getElementById("textGear");
const rockDiv = document.getElementById("textRock");
const otherHobbies = document.getElementById("otherHobbies");

const promoDiv = document.getElementById("textPromoTech");
const techStackDiv = document.getElementById("textTechStack");
const favoProjectsDiv = document.getElementById("textFavoProjects");

const exitBtnChurch = document.getElementById("exitButtonChurch");
const exitBtnGear = document.getElementById("exitButtonGear");
const exitBtnRock = document.getElementById("exitButtonRock");
const exitBtnHobbies = document.getElementById("exitButtonHobbies");
const exitBtnComputer = document.getElementById("exitButtonComputer");
exitBtnChurch.onclick = function () {
	console.log('exit is pressed');
	if (churchDiv.style.display !== "none") {
		churchDiv.style.display = "none";
		activateInteraction();
	}
}
exitBtnGear.onclick = function () {
	console.log('exit is pressed');
	if (gearDiv.style.display !== "none") {
		gearDiv.style.display = "none";
		activateInteraction();
	}
}
exitBtnRock.onclick = function () {
	console.log('exit is pressed');
	if (rockDiv.style.display !== "none") {
		rockDiv.style.display = "none";
		activateInteraction();
	}
}
exitBtnHobbies.onclick = function () {
	console.log('exit is pressed');
	if (otherHobbies.style.display !== "none") {
		otherHobbies.style.display = "none";
		activateInteraction();
	}
}
exitBtnComputer.onclick = function () {
	console.log('exit is pressed');
	if (promoDiv.style.display !== "none") {
		promoDiv.style.display = "none";
		techStackDiv.style.display = "none";
		favoProjectsDiv.style.display = "none";
		activateInteraction();
	}
}

// function goToObject(rotationY) {
// 	currRotationY = camera.rotation.y;
// 	if (rotationY < currRotation) {
// 		// ++
// 	} else {

// 	}
// }

function onDocumentMouseClick(event) {
	if (!reading) {
		event.preventDefault();
		console.log('( '+ event.clientX + ' ; '+event.clientY+' )');
		mouse.x = (event.clientX / window.innerWidth) * 2 -1;
		mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
		raycaster.setFromCamera(mouse, camera);
		const intersects = raycaster.intersectObjects(scene.children);
	
		console.log('length: ' + intersects.length)
		for (let i = 0; i < intersects.length; i++) {
			if (intersects[i].object.uuid == churchObject.uuid) {
				reading = true;
				keyboardControls = false;
				console.log('Welcome to the church');
				console.log('position camera: ' + camera.position.x, ' ', camera.position.y,' ', camera.position.z,' ', camera.rotation.x,' ', camera.rotation.y,' ', camera.rotation.z);
				document.getElementById("textChurch").style.display = "block";
			}
			else if (intersects[i].object.uuid == gearObject.uuid) {
				reading = true;
				keyboardControls = false;
				console.log('Welkom to the building');
				console.log('position camera: ' + camera.position.x, ' ', camera.position.y,' ', camera.position.z,' ', camera.rotation.x,' ', camera.rotation.y,' ', camera.rotation.z)
				document.getElementById("textGear").style.display = "block";
			}
			else if (intersects[i].object.uuid == bicycleObject.uuid) {
				reading = true;
				keyboardControls = false;
				console.log('Welcome to the bicycle');
				console.log('position camera: ' + camera.position.x, ' ', camera.position.y,' ', camera.position.z,' ', camera.rotation.x,' ', camera.rotation.y,' ', camera.rotation.z)
				document.getElementById("otherHobbies").style.display = "block";
			}
			else if (intersects[i].object.uuid == computerObject.uuid) {
				reading = true;
				keyboardControls = false;
				console.log('Welcome to the computer');
				console.log('position camera: ' + camera.position.x, ' ', camera.position.y,' ', camera.position.z,' ', camera.rotation.x,' ', camera.rotation.y,' ', camera.rotation.z)
				document.getElementById("textPromoTech").style.display = "block";
				document.getElementById("textTechStack").style.display = "block";
				document.getElementById("textFavoProjects").style.display = "block";
			}
			else if (intersects[i].object.uuid == rockObject.uuid) {
				reading = true;
				keyboardControls = false;
				console.log('Welcome to the climbing spot');
				console.log('position camera: ' + camera.position.x, ' ', camera.position.y,' ', camera.position.z,' ', camera.rotation.x,' ', camera.rotation.y,' ', camera.rotation.z)
				document.getElementById("textRock").style.display = "block";
			}
		}
	}
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function resetCameraPosition() {
	if (camera.rotation.y > 3.14) {
		// console.log('test1')
		camera.rotation.y += 0.1;
		if (camera.rotation.y >= 360 * (Math.PI / 180))
			camera.rotation.y = 0;
	}
	else if (camera.rotation.y <= 3.14) {
		// console.log('test2')
		camera.rotation.y -= 0.1;
	}
	if (camera.rotation.y >= -0.1 && camera.rotation.y <= 0.1) {
		camera.rotation.y = 0;
		keyboardControls = true;
		resetCamera = false;
	}
}

//37 left, 38 up, 39 right, 40 down, 114 reset, 97 A, 100 D, 119 W, 115 S
function onKeyPress(event) {
	console.log('keypress ', event.keyCode)
	if (keyboardControls && !reading) {
		// if (event.keyCode == 115) {
		// 	camera.rotation.x += 0.01;
		// }
		// if (event.keyCode == 119) {
		// 	camera.rotation.x -= 0.01;
		// }
		if (event.keyCode == 100) {
			if (camera.rotation.y <= 0) {
				camera.rotation.y = 360 * (Math.PI / 180);
			}
			console.log(camera.rotation.y);
			camera.rotation.y -= 0.01;
		}
		if (event.keyCode == 97) {
			if (camera.rotation.y >= 360 * (Math.PI / 180)) {
				camera.rotation.y = 0;
			}
			console.log(camera.rotation.y);
			camera.rotation.y += 0.01;
		}
		if (event.keyCode == 114) {
			keyboardControls = false;
			resetCamera = true;
			// resetCameraPosition();
		}
	}
}


window.addEventListener('click', onDocumentMouseClick, false);
window.addEventListener('resize', onWindowResize, false);
window.addEventListener('keypress', onKeyPress, false);


// let t = 0;
function animate() {
	requestAnimationFrame(animate);

	// t += 0.01;
	// moonSphere.position.x = 20*Math.cos(t) + 20;
	// moonSphere.position.z = 20*Math.sin(t) + 10;

	if (resetCamera == true) {
		resetCameraPosition();
	}
	gearWheel.rotation.z += 0.01;
	// controls.update();

	renderer.render(scene, camera);
}

animate();