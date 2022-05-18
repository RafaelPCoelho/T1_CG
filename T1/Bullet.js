import * as THREE from "three";
import { scene, camera } from "./script.js";

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
    console.log(`Killed bullet`);
  };

  this.update = () => {
    this.mesh.translateZ(-this.speed);

    if (this.mesh.position.z < camera.cameraTransform.position.z - 250)
      this.destroy();
  };
};

export default Bullet;
