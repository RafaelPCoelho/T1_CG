import * as THREE from "three";
import { pushObject } from "./libs/utils/funcs.js";
import Missile from "./Missile.js";
import { scene } from "./script.js";

const Cannon = function (position) {
  this.geometry = new THREE.BoxGeometry(10, 2, 10);
  this.material = new THREE.MeshStandardMaterial();
  this.mesh = new THREE.Mesh(this.geometry, this.material);

  this.alive = true;
  this.counter = 0;
  this.shootInterval = 1;
  this.nextShoot = this.shootInterval;

  this.missiles = {};

  this.init = () => {
    scene.add(this.mesh);
    if (position) this.mesh.position.copy(position);
    else this.mesh.position.set(0, 1, -200);
  };

  this.deathBehaviour = (dt) => {};
  this.aliveBehaviour = (dt) => {
    this.counter += dt / 1000;

    // Shoot
    if (this.counter > this.nextShoot) {
      this.nextShoot = this.counter + this.shootInterval;
      pushObject(this.missiles, new Missile(this.mesh.position));
    }

    Object.values(this.missiles).forEach((missile) => {
      missile.update(dt);
    });
  };

  this.update = (dt) => {
    if (this.alive) this.aliveBehaviour(dt);
    else this.deathBehaviour(dt);
  };

  this.init();
};

export default Cannon;
