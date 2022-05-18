import * as THREE from "three";
import {
  basicMaterial,
  scene,
  enemyManager,
  camera,
  airplane,
} from "./script.js";
import { checkCollision } from "./libs/Collision/index.js";

const Bullet = function (position, i) {
  this.mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 10),
    new THREE.MeshStandardMaterial({
      color: "#ffff00",
    })
  );

  this.mesh.position.set(position.x, position.y, position.z);
  // this.mesh.rotation.set(rotation);
  scene.add(this.mesh);
  this.index = i;

  this.speed = 5;

  this.destroy = () => {
    airplane.bullets.splice(i, 1);
    scene.remove(this.mesh);
    console.log(`Killed bullet ${i}`);
  };

  this.update = () => {
    this.mesh.translateZ(-this.speed);

    if (this.mesh.position.z < camera.cameraTransform.position.z - 250) {
      this.destroy();
      return;
    }
  };
};

export default Bullet;
