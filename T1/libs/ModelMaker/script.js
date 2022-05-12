import * as THREE from "three";
import Stats from "../../../build/jsm/libs/stats.module.js";
import { TrackballControls } from "../../../build/jsm/controls/TrackballControls.js";
import {
  initRenderer,
  initCamera,
  InfoBox,
  onWindowResize,
} from "../../../libs/util/util.js";
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
var basicMaterial = new THREE.MeshNormalMaterial();
var selectedMaterial = new THREE.MeshStandardMaterial({
  color: "rgb(255, 0, 0)",
});
scene.add(new THREE.AmbientLight());

var models = [];

function body(geometry, material) {
  return {
    mesh: new THREE.Mesh(geometry, material),
    append(child) {
      this.mesh.add(child);
    },
  };
}

function save(filename = "scene") {
  if (!filename) return;

  let blob = new Blob([JSON.stringify(scene.toJSON())], { type: "text/json" });
  let uri = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = uri;
  a.download = `${filename}.json`;
  a.click();
}

function add(shape = "", ...props) {
  let geometry = null;

  if (shape == "cube") geometry = new THREE.BoxGeometry(...props);
  if (shape == "sphere") geometry = new THREE.SphereGeometry(...props);
  if (shape == "cylinder") geometry = new THREE.CylinderGeometry(...props);
  if (shape == "cone") geometry = new THREE.ConeGeometry(...props);

  if (!geometry) return;

  let b = body(geometry, basicMaterial);
  scene.add(b.mesh);
  models.push(b);
}

const addCube = () => add("cube", 1, 1, 1);
const addSphere = () => add("sphere", 1);
const addCylinder = () => add("cylinder", 0.5, 0.5, 1);
const addCone = () => add("cone", 0.5, 1);

window.addCube = addCube;
window.addSphere = addSphere;
window.addCylinder = addCylinder;
window.addCone = addCone;
window.save = save;

// Listen window size changes
window.addEventListener(
  "resize",
  function () {
    onWindowResize(camera, renderer);
  },
  false
);

function init() {
  models.forEach((model) => {
    scene.add(model.mesh);
  });
}

const selected = {
  index: -1,
  body: null,
  prev() {
    this.index = Math.max(-1, this.index - 1);
    this.update();
  },
  next() {
    this.index = Math.min(models.length - 1, this.index + 1);
    this.update();
  },
  update() {
    if (this.body) {
      this.body.mesh.material = basicMaterial;
    }

    if (this.index > -1) {
      this.body = models[this.index];
      this.body.mesh.material = selectedMaterial;
    } else {
      this.body = null;
    }

    console.log(this.index);
  },
};

var keyboard = new KeyboardState();

var controls = new InfoBox();
controls.add("Model Maker");
controls.addParagraph();
controls.add("A => Move -X");
controls.add("D => Move +X");
controls.add("W => Move +Y");
controls.add("S => Move -Y");
controls.add("I => Scale +Y");
controls.add("K => Scale -Y");
controls.add("J => Scale -X");
controls.add("L => Scale +X");
controls.add("U => Scale -Z");
controls.add("P => Scale +Z");
controls.add("LeftArrow => Select previous");
controls.add("RightArrow => Select next");
controls.add("= => Add model");
controls.add("C => Save Scene");
controls.show();

init();
render();
function render() {
  keyboard.update();

  if (keyboard.down("right")) {
    selected.next();
  }
  if (keyboard.down("left")) {
    selected.prev();
  }
  if (keyboard.down("A")) {
    selected.body?.mesh.translateX(-1);
  }
  if (keyboard.down("D")) {
    selected.body?.mesh.translateX(1);
  }
  if (keyboard.down("S")) {
    selected.body?.mesh.translateY(-1);
  }
  if (keyboard.down("W")) {
    selected.body?.mesh.translateY(1);
  }
  if (keyboard.down("I")) {
    selected.body?.mesh.geometry.scale(1, 1.1, 1);
  }
  if (keyboard.down("K")) {
    selected.body?.mesh.geometry.scale(1, 0.9, 1);
  }
  if (keyboard.down("J")) {
    selected.body?.mesh.geometry.scale(0.9, 1, 1);
  }
  if (keyboard.down("L")) {
    selected.body?.mesh.geometry.scale(1.1, 1, 1);
  }
  if (keyboard.down("U")) {
    selected.body?.mesh.geometry.scale(1, 1, 0.9);
  }
  if (keyboard.down("O")) {
    selected.body?.mesh.geometry.scale(1, 1, 1.1);
  }
  if (keyboard.down("=")) {
    add(prompt("What model type ?"));
    document.querySelector("#webgl-output").focus();
  }
  if (keyboard.down("C")) {
    save(prompt("Filename"));
    document.querySelector("#webgl-output").focus();
  }

  stats.update(); // Update FPS
  trackballControls.update(); // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera); // Render scene
}
