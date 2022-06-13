import * as THREE from "three";
import { iterateCalling, pushObject } from "./libs/utils/funcs.js";
import Missile from "./Missile.js";
import { scene, camera } from "./script.js";

const Cannon = function (position) {
  this.geometry = new THREE.BoxGeometry(10, 2, 10);
  this.material = new THREE.MeshStandardMaterial();
  this.mesh = new THREE.Mesh(this.geometry, this.material);

  this.alive = true;
  this.counter = 0;
  this.shootInterval = 3.5;
  this.nextShoot = 0;

  this.missiles = {};

  // Inicia a posicao com base no parametro position
  this.init = () => {
    scene.add(this.mesh);
    if (position) this.mesh.position.copy(position);
    else this.mesh.position.set(0, 1, -200);
  };

  this.deathBehaviour = (dt) => {};

  // Executa comportamento do canhao enquanto vivo
  this.aliveBehaviour = (dt) => {
    this.counter += dt / 1000;

    // Sempre que puder atirar, reseta o contador e atira
    if (this.counter > this.nextShoot) {
      this.nextShoot = this.counter + this.shootInterval;

      var key = pushObject(this.missiles, null);
      this.missiles[key] = new Missile(this.mesh.position, () => {
        delete this.missiles[key];
      });
    }
  };

  this.update = (dt) => {
    var farFromCamera = this.mesh.position.distanceTo(
      camera.cameraTransform.position
    );

    // Realiza o comportamento apenas se estiver vivo e próximo do avião
    if (this.alive) {
      if (farFromCamera < 300) {
        this.aliveBehaviour(dt);
      }
    } else this.deathBehaviour(dt);

    // Chama update de todos os mísseis
    iterateCalling(Object.values(this.missiles), "update", dt);
  };

  this.init();
};

export default Cannon;
