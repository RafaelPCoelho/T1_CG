import * as THREE from "three";
import { degreesToRadians } from "../libs/util/util.js";
import { scene, camera, keyboard, enemies } from "./script.js";
import Bullet from "./Bullet.js";
import { checkCollision } from "./libs/Collision/index.js";
import { iterateCalling, pushObject } from "./libs/utils/funcs.js";
import Torpedo from "./Torpedo.js";
import TargetProjection from "./TargetProjection.js";

const Airplane = function () {
  this.radius = 5;
  this.size = 10;
  this.vx = 0;
  this.vy = 0;
  this.vz = -1;
  this.alive = true;
  this.ammoPerMag = 10;
  this.ammo = this.ammoPerMag;
  this.counter = 0;
  this.reloadTime = 2;
  this.nextReload = 0;
  this.shootDelay = 0.5;
  this.nextShoot = 0;
  this.bullets = {};
  this.torpedos = {};
  this.gameOver = false;
  this.torpedoMark = null;
  this.torpedoAngle = degreesToRadians(30);

  this.material = new THREE.MeshLambertMaterial({
    color: "rgb(50, 100, 10)",
  });

  this.mesh = new THREE.Mesh(
    new THREE.ConeGeometry(this.radius, this.size),
    this.material
  );

  // Inicia o avião com as configurações padrão
  this.init = () => {
    this.mesh.rotateX(degreesToRadians(-90));
    this.mesh.position.set(0, 50, 80);
    scene.add(this.mesh);

    this.torpedoMark = new TargetProjection(
      this.mesh.position,
      this.torpedoAngle
    );
  };

  // Define o estado do avião como destruído
  this.destroy = () => {
    if (!this.alive) return;

    this.alive = false;
    this.vz = 0;
    this.vy = 2;
  };

  // Enquanto tiver munição e puder atirar dispara uma nova bala e define um novo tempo
  // com base no intervalo entre tiros para poder atirar novamente
  this.shoot = () => {
    if (this.ammo > 0 && this.counter >= this.nextShoot) {
      this.ammo--;

      if (this.ammo == 0) this.nextReload = this.counter + this.reloadTime;
      this.nextShoot = this.counter + this.shootDelay;

      var key = pushObject(this.bullets, null);
      this.bullets[key] = new Bullet(this.mesh.position, () => {
        delete this.bullets[key];
      });
    }
  };

  this.torpedo = () => {
    let key = pushObject(this.torpedos, null);
    this.torpedos[key] = new Torpedo(
      this.mesh.position,
      -this.torpedoAngle,
      () => {
        delete this.torpedos[key];
      }
    );
  };

  // Roda o comportamento do avião quando seu estado é: vivo
  this.aliveBehaviour = (dt) => {
    var { x, y, z } = this.mesh.position;
    var cam = camera.cameraTransform;

    // Define o comportamento dos controles
    if (keyboard.pressed("A") || keyboard.pressed("left")) this.vx = -1;
    if (keyboard.pressed("D") || keyboard.pressed("right")) this.vx = 1;
    if (keyboard.pressed("W") || keyboard.pressed("up")) this.vz = -2;
    if (keyboard.pressed("S") || keyboard.pressed("down")) this.vz = 0.5;
    if (
      keyboard.up("A") ||
      keyboard.up("D") ||
      keyboard.up("right") ||
      keyboard.up("left")
    ) {
      this.vx = 0;
    }
    if (
      keyboard.up("W") ||
      keyboard.up("S") ||
      keyboard.up("up") ||
      keyboard.up("down")
    ) {
      this.vz = -1;
    }
    if (keyboard.down("T")) this.torpedo();
    if (keyboard.down("space") || keyboard.down("ctrl")) this.shoot();

    // Define a posição do avião, limitando as laterais e a profundidade
    this.mesh.position.set(
      Math.max(-100, Math.min(100, x + this.vx)),
      y + this.vy,
      Math.max(
        -100 + cam.position.z,
        Math.min(80 + cam.position.z, z + this.vz)
      )
    );

    // Incrementa o contador do avião, que será utilizado para comparações de delay
    // ex: delay entre disparos, delay de recarga...
    this.counter += dt / 1000;

    // Se terminou de recarregar, seta as munições
    if (this.counter >= this.nextReload && this.ammo == 0) {
      this.ammo = this.ammoPerMag;
    }

    // Atualiza o estado das balas e torpedos disparados
    iterateCalling(Object.values(this.bullets), "update", dt);
    iterateCalling(Object.values(this.torpedos), "update", dt);

    if (this.torpedoMark) this.torpedoMark.update(dt);
  };

  // Roda o comportamento do avião quando seu estado é: morto
  // (derruba o avião e ao encostar no chão, termina o jogo)
  this.deathBehaviour = (dt) => {
    this.vz -= 4.5 * (dt / 1000);
    this.vy -= 1 * (dt / 1000);

    this.mesh.translateY(this.vy);
    this.mesh.translateZ(this.vz);
    this.mesh.rotateX(-degreesToRadians(35 * (dt / 1000)));

    if (this.mesh.position.y <= 0) {
      this.gameOver = true;
      alert("Game Over");
      window.location.reload();
    }
  };

  // Atualiza a cada frame o estado do avião
  this.update = (dt) => {
    if (this.alive) this.aliveBehaviour(dt);
    else this.deathBehaviour(dt);
  };

  this.init();
};

export default Airplane;
