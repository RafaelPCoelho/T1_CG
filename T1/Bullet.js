import * as THREE from "three";
import { basicMaterial, scene, enemies, camera } from "./script.js";
import { checkCollision } from "./libs/Collision/index.js";

const Bullet = function (position, onDestroy) {
  this.mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 10),
    new THREE.MeshStandardMaterial({
      color: "#ffff00",
    })
  );

  this.mesh.position.set(position.x, position.y, position.z);
  // this.mesh.rotation.set(rotation);
  scene.add(this.mesh);

  this.speed = 5;

  this.destroy = () => {
    if (onDestroy) onDestroy();
    scene.remove(this.mesh);
  };

  this.update = () => {
    this.mesh.translateZ(-this.speed);

    if (this.mesh.position.z < camera.cameraTransform.position.z - 250) {
      this.destroy();
      return;
    }

    enemies.forEach((enemy) => {
      if (checkCollision(this.mesh, enemy.mesh)) {
        enemy.destroy();
        this.destroy();
      }
    });
  };
};

export default Bullet;
