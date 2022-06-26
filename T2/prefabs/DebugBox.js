import * as THREE from "three";
import { scene } from "../script.js";

// Caixa para debugar posicoes
const DebugBox = function (size = 1) {
  this.init = () => {
    this.geometry = new THREE.BoxGeometry(size, size, size);
    this.material = new THREE.MeshStandardMaterial({ color: "red" });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;

    scene.add(this.mesh);
  };

  this.destroy = () => {
    scene.remove(this.mesh);
  };

  this.follow = (position) => {
    this.mesh.position.copy(position);
  };

  this.init();
};

export default DebugBox;
