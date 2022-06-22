import * as THREE from "three";
import { degreesToRadians } from "../../libs/util/util.js";
import { scene, camera, keyboard, enemies, game } from "../script.js";
import Bullet from "./Bullet.js";
import Torpedo from "./Torpedo.js";
import TargetProjection from "../utils/TargetProjection.js";
import EntityList from "../utils/EntityList.js";
import { GAMEMODES, MAP } from "../utils/Consts.js";
import { GLTFLoader } from "../../build/jsm/loaders/GLTFLoader.js";
import AviaoGLTFProjection from "../utils/AviaoGLTFProjection.js";
import { clamp, slerp } from "../libs/utils/math.js";
import Ticker from "../utils/Ticker.js";

const Airplane = function () {
  // Inicia o avião com as configurações padrão
  this.init = () => {
    this.radius = 5;
    this.size = 10;
    this.vx = 0;
    this.vy = 0;
    this.vz = -1;
    this.alive = true;
    this.ammoPerMag = 10;
    this.ammo = this.ammoPerMag;
    this.counter = 0;
    this.defReloadTime = 2;
    this.reloadTime = 2;
    this.nextReload = 0;
    this.shootDelay = 0.5;
    this.nextShoot = 0;
    this.bullets = new EntityList(Bullet);
    this.torpedos = new EntityList(Torpedo);
    this.gameOver = false;
    this.torpedoMark = null;
    this.torpedoAngle = degreesToRadians(20);
    this.health = 100;
    this.aviao = null;
    this.canRegenerate = true;
    this.fodTicker = new Ticker(2000, () => {
      // Tempo livre de dano
      this.canRegenerate = true;
    });
    this.regeneration = new Ticker(300, () => {
      // Regenerador
      this.health = clamp(this.health + 1, 0, 100);
    });
    this.rotCounter = 0;

    this.material = new THREE.MeshLambertMaterial({
      color: "rgb(50, 100, 10)",
    });

    this.mesh = new THREE.Mesh(
      new THREE.ConeGeometry(this.radius, this.size),
      this.material
    );

    this.aviao = new AviaoGLTFProjection(this.mesh.position);

    this.mesh.rotateX(degreesToRadians(-90));
    this.mesh.position.set(0, 50, 80);
    // scene.add(this.mesh);

    this.torpedoMark = new TargetProjection(
      this.mesh.position,
      this.torpedoAngle
    );
  };

  // Define o estado do avião como destruído
  this.destroy = () => {
    if (!this.alive || game.gamemode == GAMEMODES.CREATIVE) return;

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

      this.bullets.add(this.mesh.position);
    }
  };

  this.torpedo = () => {
    this.torpedos.add(this.mesh.position, -this.torpedoAngle);
  };

  // Roda o comportamento do avião quando seu estado é: vivo
  this.aliveBehaviour = (dt) => {
    var { x, y, z } = this.mesh.position;
    var cam = camera.cameraTransform;

    // Define o comportamento dos controles
    if (keyboard.pressed("A") || keyboard.pressed("left")) this.vx = -1;
    if (keyboard.pressed("D") || keyboard.pressed("right")) this.vx = 1;
    if (keyboard.pressed("W") || keyboard.pressed("up")) this.vz = -2;
    if (keyboard.pressed("S") || keyboard.pressed("down"))
      if (game.gamemode == GAMEMODES.SURVIVAL) this.vz = 0.5;
      else this.vz = 2;
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
      if (game.gamemode == GAMEMODES.SURVIVAL) this.vz = -1;
      else this.vz = 0;
    }
    if (keyboard.down("T")) this.torpedo();
    if (keyboard.down("space") || keyboard.down("ctrl")) this.shoot();

    // Define a posição do avião, limitando as laterais e a profundidade
    this.mesh.position.set(
      Math.max(-MAP.BOUND_X, Math.min(MAP.BOUND_X, x + this.vx)),
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
    this.torpedos.update(dt);
    this.bullets.update(dt);
    if (this.torpedoMark) this.torpedoMark.update(dt);

    // Ticker free of damage e regeneracao
    this.fodTicker.update(dt);
    if (this.canRegenerate) this.regeneration.update(dt);

    // Faz o modelo seguir o mesh principal
    let speedRot = (dt / 1000) * this.vx * 2;
    this.rotCounter += speedRot;
    this.aviao.aviao?.position.copy(this.mesh.position);
    this.aviao.aviao?.rotation.set(
      this.aviao.aviao?.rotation.x,
      this.aviao.aviao?.rotation.y,
      this.rotCounter + Math.PI
    );
    this.rotCounter = slerp(this.rotCounter, 0, Math.abs(this.rotCounter / 8));
  };

  // Roda o comportamento do avião quando seu estado é: morto
  // (derruba o avião e ao encostar no chão, termina o jogo)
  this.deathBehaviour = (dt) => {
    this.vz -= 4.5 * (dt / 1000);
    this.vy -= 1 * (dt / 1000);

    this.mesh.translateY(this.vy);
    this.mesh.translateZ(this.vz);
    this.aviao.aviao.rotateX(degreesToRadians(35 * (dt / 100)));

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

  this.damage = (value) => {
    if (!this.alive) return;

    this.health = clamp(this.health - Math.abs(value), 0, 100);
    this.canRegenerate = false;
    this.fodTicker.reset();

    if (this.health <= 0) this.destroy();
  };

  this.init();
};

export default Airplane;
