import * as THREE from "three";
import { checkCollision } from "../libs/Collision/index.js";
import EntityList from "../utils/EntityList.js";
import Missile from "./Missile.js";
import { scene, camera, airplane } from "../script.js";
import MisselLauncher from "../utils/MisselLauncher.js";

const Cannon = function (position, onDestroy) {
  this.geometry = new THREE.BoxGeometry(10, 2, 10);
  this.material = new THREE.MeshStandardMaterial();
  this.mesh = new THREE.Mesh(this.geometry, this.material);

  this.launcher = new MisselLauncher(this.mesh.position);

  this.alive = true;
  this.counter = 0;
  this.shootInterval = 3.5;
  this.nextShoot = 0;

  this.missiles = new EntityList(Missile);

  // Inicia a posicao com base no parametro position
  this.init = () => {
    scene.add(this.mesh);
    if (position) this.mesh.position.copy(position);
    else this.mesh.position.set(0, 1, -200);
  };

  this.destroy = () => {
    this.alive = false;
    scene.remove(this.mesh);
  };

  this.deathBehaviour = (dt) => {
    if (this.missiles.isEmpty()) {
      if (onDestroy) onDestroy();
    }
  };

  // Executa comportamento do canhao enquanto vivo
  this.aliveBehaviour = (dt) => {
    this.counter += dt / 1000;

    // Sempre que puder atirar, reseta o contador e atira
    if (this.counter > this.nextShoot) {
      this.nextShoot = this.counter + this.shootInterval;

      this.missiles.add(this.mesh.position);
    }

    Object.values(airplane.torpedos.entities).forEach((torpedo) => {
      if (checkCollision(this.mesh, torpedo.mesh)) {
        torpedo.destroy();
        this.destroy();
      }
    });
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
    this.missiles.update(dt);
  };

  this.init();
};

export default Cannon;
