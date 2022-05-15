import * as THREE from "three";
import Stats from "../../../build/jsm/libs/stats.module.js";
import { TrackballControls } from "../../../build/jsm/controls/TrackballControls.js";
import {
  initRenderer,
  initCamera,
  InfoBox,
  onWindowResize,
} from "../../../libs/util/util.js";
import { checkCollision } from "../Collision/index.js";
import { pushBack } from "./index.js";
import KeyboardState from "../../../libs/util/KeyboardState.js";

var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var renderer = initRenderer(); // View function in util/utils
var camera = initCamera(new THREE.Vector3(0, -30, 15)); // Init camera in this position
// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);

// create the ground plane
var planeGeometry = new THREE.PlaneGeometry(100, 100);
planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
var planeMaterial = new THREE.MeshBasicMaterial({
  color: "rgba(150, 150, 150)",
  side: THREE.DoubleSide,
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
// add the plane to the scene
scene.add(plane);

// create a cube
var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
var cubeMaterial = new THREE.MeshNormalMaterial();

var meMaterial = new THREE.MeshStandardMaterial({
  color: "#0000ff",
});
var markedMaterial = new THREE.MeshStandardMaterial({
  color: "#ff0000",
});

var NUMBER_OF_CUBES = 5;

var cubes = Array(NUMBER_OF_CUBES)
  .fill("")
  .map((_, i) => {
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    let rx = -25 + Math.random() * 50;
    let ry = -25 + Math.random() * 50;
    let rz = -25 + Math.random() * 50;

    cube.userData.weight = 1 + Math.random() * 2;
    cube.userData.velCollision = 0;
    cube.userData.id = i;
    cube.userData.collisor = null;
    cube.userData.interacted = false;

    cube.position.set(rx, ry, 2);

    scene.add(cube);
    return cube;
  });

// Use this to show information onscreen
var controls = new InfoBox();
controls.add("Physics Example");
controls.addParagraph();
controls.add("Use arrows to move the blue box");
controls.show();

// Listen window size changes
window.addEventListener(
  "resize",
  function () {
    onWindowResize(camera, renderer);
  },
  false
);

var keyboard = new KeyboardState();
scene.add(new THREE.HemisphereLight());

render();
function render() {
  keyboard.update();

  if (keyboard.pressed("left")) cubes[0].translateX(-0.5);
  if (keyboard.pressed("right")) cubes[0].translateX(0.5);
  if (keyboard.pressed("up")) cubes[0].translateY(0.5);
  if (keyboard.pressed("down")) cubes[0].translateY(-0.5);
  if (keyboard.pressed("space")) cubes[0].translateZ(0.5);
  if (keyboard.pressed("C")) cubes[0].translateZ(-0.5);

  // Set physic state
  var colliders = [];
  cubes.forEach((cube, i) => {
    cube.userData.collisor == null;
    cube.userData.interacted == false;

    colliders.push(
      cubes.filter((collisor, j) => i !== j && checkCollision(cube, collisor))
    );

    colliders[i].map((collider) => {
      cube.material = markedMaterial;
      collider.userData.velCollision =
        i == 0 ? 0.5 : cube.userData.velCollision;
    });

    if (colliders[i].length == 0)
      cube.material = i == 0 ? meMaterial : cubeMaterial;
  });

  // Run physics interactions
  cubes.forEach((cube, i) => {
    colliders[i].map((collider) => {
      pushBack(cube, collider, cube.userData.velCollision);
    });
  });

  stats.update(); // Update FPS
  trackballControls.update(); // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera); // Render scene
}
