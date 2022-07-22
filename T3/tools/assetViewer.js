import * as THREE from "three";
import Stats from "../../build/jsm/libs/stats.module.js";
import { TrackballControls } from "../../build/jsm/controls/TrackballControls.js";
import {
  initRenderer,
  initCamera,
  InfoBox,
  onWindowResize,
} from "../../libs/util/util.js";
import { GUI } from "../../build/jsm/libs/lil-gui.module.min.js";
import { GLTFLoader } from "../../build/jsm/loaders/GLTFLoader.js";

var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var renderer = initRenderer(); // View function in util/utils
renderer.setClearColor(new THREE.Color(0.4, 0.4, 0.8));
var camera = initCamera(new THREE.Vector3(0, -30, 15)); // Init camera in this position

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);

// Listen window size changes
window.addEventListener(
  "resize",
  function () {
    onWindowResize(camera, renderer);
  },
  false
);

const loader = new GLTFLoader();
const audioLoader = new THREE.AudioLoader();
const audio = new THREE.Audio(new THREE.AudioListener());
const gui = new GUI();

var current = null;
var cached = {};

const loadModel = async (model) => {
  if (!cached[model]) {
    cached[model] = await loader.loadAsync(model);
  }

  scene.add(cached[model].scene);
  current = cached[model];
};

var currentSound = "";

const player = {
  trigger: async (sound) => {
    console.log(sound);

    const musicBuffer = await audioLoader.loadAsync(currentSound);
    audio.setBuffer(musicBuffer);
    audio.play();
  },
};

const model = {
  selected: "airplane",
  types: {
    airplane: {
      gltf: "../assets/aviaoGLTF.gltf",
      sounds: {
        Shoot: "../assets/sounds/airplane_shoot.ogg",
      },
    },
    enemy_01: {
      gltf: "../assets/Inimigo1GLTF.gltf",
      sounds: {},
    },
    enemy_02: { gltf: "../assets/Inimigo2GLTF.gltf", sounds: {} },
    enemy_03: { gltf: "../assets/Inimigo3GLTF.gltf", sounds: {} },
    enemy_ground: {
      gltf: "../assets/models/missile_launcher_tower/scene.gltf",
      sounds: {
        LaunchMissile: "../assets/sounds/missile.wav",
      },
    },
    missile: {
      gltf: "../assets/models/missile_stinger/scene.gltf",
      sounds: {},
    },
  },
  allSounds: {
    HitEnemy: "../assets/sounds/hit_enemy.ogg",
    DestroyEnemy: "../assets/sounds/destroy_enemy.wav",
  },
};

const handleModelChange = (val) => {
  if (current) {
    scene.remove(current.scene);
    current = null;
  }

  loadModel(model.types[val].gltf);
  model.selected = val;
  hydrateFolder();
};

gui
  .add(model, "selected", Object.keys(model.types))
  .name("Model")
  .onChange(handleModelChange);

var soundsFolder = gui.addFolder("Sounds");

const hydrateFolder = () => {
  soundsFolder.reset();
  // soundsFolder = gui.addFolder("Sounds");

  Object.keys(model.types[model.selected].sounds).forEach((sound) => {
    currentSound = model.types[model.selected].sounds[sound];
    soundsFolder.add(player, "trigger", true).name(sound);
  });
};

const allSounds = gui.addFolder("All Sounds");

Object.keys(model.allSounds).forEach((sound) => {
  currentSound = model.allSounds[sound];
  allSounds.add(player, "trigger").name(sound);
});

const light = new THREE.AmbientLight();
scene.add(light);

handleModelChange(model.selected);

render();
function render() {
  stats.update(); // Update FPS
  trackballControls.update(); // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera); // Render scene
}
