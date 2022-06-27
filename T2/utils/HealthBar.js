import * as THREE from "three";
import { scene, airplane } from "../script.js";

const HealthBar = function () {
  this.init = () => {
    this.x = airplane.health;

    this.geometry = new THREE.BoxGeometry(this.x, 1, 1);
    this.material = new THREE.MeshLambertMaterial({
      color: "rgb(255, 0, 0)",
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, -100, 0);

    scene.add(this.mesh);
  };

  this.update = (dt) => {
    this.x = airplane.health;
    this.mesh.geometry.dispose();
    this.mesh.geometry = new THREE.BoxGeometry(this.x, 1, 1);
    this.mesh.position.setX(-100 + this.x / 2);
  };

  this.init();
};

export default HealthBar;
