import * as THREE from "three";
import { scene } from "../script.js";

const montanhaProjection = function () {
  this.geometria = new THREE.BoxGeometry(100, 100, 600);
  this.texture = new THREE.TextureLoader().load(
    "./assets/textures/grass.jpg",
    function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 5);
    }
  );
  this.material = new THREE.MeshLambertMaterial({ map: this.texture });

  this.montanha = new THREE.Mesh(this.geometria, this.material);
  this.montanha.receiveShadow = true;

  scene.add(this.montanha);

  return this.montanha;
};

export default montanhaProjection;
