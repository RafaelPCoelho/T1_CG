import * as THREE from "three";
import { degreesToRadians } from "../../libs/util/util.js";
import { camera, game, scene } from "../script.js";

const Torpedo = function (position, angle, onDestroy) {
  // Inicia o torpedo na direcao definida
  this.init = () => {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 5),
      new THREE.MeshStandardMaterial()
    );
    this.mesh.castShadow = true;

    // scene.add(this.mesh);
    this.mesh.position.copy(position);
    this.mesh.rotateX(angle);

    this.gltf = null;

    game.load(
      "./assets/models/aim120_amraam_air_to_air_missile/scene.gltf",
      (gltf) => {
        this.gltf = gltf;
        this.gltf.rotateY(degreesToRadians(180));
        this.gltf.rotateX(angle);
        this.gltf.scale.set(8, 8, 2);
        scene.add(this.gltf);
      }
    );

    this.audio = new THREE.PositionalAudio(camera.audioListener);
    this.audio.hasPlaybackControl = true;
    scene.add(this.audio);
    game.play("./assets/sounds/missile.wav", this.audio);
  };

  this.destroy = () => {
    scene.remove(this.mesh);

    if (this.gltf) scene.remove(this.gltf);

    if (onDestroy) onDestroy();
  };

  // Avança em linha reta
  this.update = (dt) => {
    this.mesh.translateZ(-100 * (dt / 1000));
    if (this.mesh.position.y < 0) this.destroy();

    this.audio.position.copy(this.mesh.position);
    if (this.gltf) this.gltf.position.copy(this.mesh.position);
  };

  this.init();
};

export default Torpedo;
