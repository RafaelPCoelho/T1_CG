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
import { invVec, mulVec } from "../utils/vec.js";

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
    cube.userData.force = new THREE.Vector3(0, 0, 0);
    cube.userData.id = i;
    cube.userData.colliding = false;

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

var vel = 2;
var dt = 0;
var lt = 0;

render();
function render(t) {
  dt = t - lt;
  lt = t;
  keyboard.update();

  var speed = (vel * dt) / 100;

  if (keyboard.pressed("left")) cubes[0].translateX(-speed);
  if (keyboard.pressed("right")) cubes[0].translateX(speed);
  if (keyboard.pressed("up")) cubes[0].translateY(speed);
  if (keyboard.pressed("down")) cubes[0].translateY(-speed);
  if (keyboard.pressed("space")) cubes[0].translateZ(speed);
  if (keyboard.pressed("C")) cubes[0].translateZ(-speed);

  // Set physic state
  for (let i = 0; i < cubes.length - 1; i++) {
    for (let j = i + 1; j < cubes.length; j++) {
      let collision = checkCollision(cubes[i], cubes[j]);

      if (collision) {
        let speedVec = mulVec(collision, speed);
        cubes[i].userData.colliding = true;
        cubes[j].userData.colliding = true;

        cubes[j].userData.force.add(mulVec(speedVec, 0.5));
        cubes[i].userData.force.add(invVec(cubes[j].userData.force));
        // invVec(mulVec(speedVec, 0.5))
      }
    }
  }

  // cubes.forEach((cube, i) => {
  //   cube.userData.force.set(0, 0, 0);

  //   cubes.forEach((cube, j) => {});

  //   colliders[i].map((collider) => {
  //     cube.material = markedMaterial;
  //     collider.userData.force = i == 0 ? 0.5 : cube.userData.force;
  //   });

  //   if (colliders[i].length == 0)
  //     cube.material = i == 0 ? meMaterial : cubeMaterial;
  // });

  // Run physics interactions
  cubes.forEach((cube, i) => {
    if (cube.userData.colliding) {
      // cube.material = markedMaterial;
    } else {
      cube.material = i == 0 ? meMaterial : cubeMaterial;
    }

    cube.translateX(cube.userData.force.x);
    cube.translateY(cube.userData.force.y);
    cube.translateZ(cube.userData.force.z);

    cube.userData.colliding = false;
    cube.userData.force.set(0, 0, 0);
  });

  stats.update(); // Update FPS
  trackballControls.update(); // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera); // Render scene
}
