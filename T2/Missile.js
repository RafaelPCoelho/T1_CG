import * as THREE from "three";
import { distVec } from "./libs/utils/vec.js";
import { airplane, camera, scene } from "./script.js";

const Missile = function (position) {
  this.geometry = new THREE.BoxGeometry(2, 2, 2);
  this.material = new THREE.MeshStandardMaterial({ color: "red" });
  this.mesh = new THREE.Mesh(this.geometry, this.material);

  this.alive = true;
  this.raiseVelocity = 100;
  this.inPosition = false;
  this.direction = new THREE.Vector3(0, 0, 0);

  this.speed = 200;

  this.init = () => {
    scene.add(this.mesh);
    this.mesh.position.copy(position);
  };

  this.deathBehaviour = (dt) => {};

  this.aliveBehaviour = (dt) => {
    if (!this.inPosition) {
      this.mesh.translateY(this.raiseVelocity * (dt / 1000));

      // Stop raising Y when reach position
      if (this.mesh.position.y >= airplane.mesh.position.y) {
        this.inPosition = true;
        // this.direction = distVec(this.mesh.position, airplane.mesh.position);
        this.mesh.lookAt(airplane.mesh.position);
      }
    } else {
      this.mesh.translateZ(this.speed * (dt / 1000));
      this.mesh.position.z += camera.vz;
    }
  };

  this.update = (dt) => {
    if (this.alive) this.aliveBehaviour(dt);
    else this.deathBehaviour();
  };

  this.init();
};

export default Missile;
