import * as THREE from "three";
import { checkCollision } from "../libs/Collision/index.js";
import { airplane, scene } from "../script.js";

const EnemyBullet = function (position, onDestroy) {
  this.init = () => {
    this.geometry = new THREE.SphereGeometry(1);
    this.material = new THREE.MeshStandardMaterial({ color: "red" });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.speed = 200;
    this.dist = 0;
    this.maxDist = 1000;

    this.mesh.position.copy(position);
    this.airplaneProjection = airplane.mesh.position.clone();

    // Prevê o tempo do hit da bala com o aviao
    this.hitDelay =
      this.airplaneProjection.distanceTo(this.mesh.position) /
      (this.speed * 0.01666);

    // Define local da projeção, com uma variação para garantir erro/acerto
    this.spread = 50;
    this.airplaneProjection.z +=
      airplane.vz * this.hitDelay -
      this.spread +
      Math.random() * 2 * this.spread;

    this.mesh.lookAt(this.airplaneProjection);
    scene.add(this.mesh);
  };

  this.destroy = () => {
    scene.remove(this.mesh);
    if (onDestroy) onDestroy();
  };

  this.collision = () => {
    if (!checkCollision(this.mesh, airplane.mesh)) return;

    this.destroy();
    airplane.damage(20);
  };

  this.update = (dt) => {
    this.collision();

    let step = this.speed * (dt / 1000);

    this.mesh.translateZ(step);
    this.dist += step;

    if (this.dist >= this.maxDist) this.destroy();
  };

  this.init();
};

export default EnemyBullet;
