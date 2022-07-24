import * as THREE from "three";
import { clamp, lerp, slerp } from "./libs/utils/math.js";
import { initCamera, radiansToDegrees } from "../libs/util/util.js";
import { airplane, game, scene } from "./script.js";
import { GAMEMODES } from "./utils/Consts.js";

const Camera = function () {
  this.vz = -1;

  this.camera = initCamera(new THREE.Vector3(0, 200, 200));
  this.cameraTransform = new THREE.Mesh();

  this.theta = Math.atan2(200, 220);

  this.tickerX = 0;
  this.tickerZ = 0;
  this.dtLerp = 1000;

  this.died = false;
  this.deathTimer = 0;
  this.delayAfterDie = 2;

  this.audioListener = new THREE.AudioListener();
  this.camera.add(this.audioListener);

  // Inicia a camera com sua posição inicial
  this.init = () => {
    this.cameraTransform.position.set(0, 20, 0);
    this.cameraTransform.add(this.camera);
    scene.add(this.cameraTransform);
  };

  this.deathBehaviour = (dt) => {
    if (!this.died) {
      this.died = true;
    } else if (this.deathTimer < this.delayAfterDie) {
      // Se o aviao morreu, continua se movimentando por um tempo
      this.deathTimer += dt / 1000;
      this.cameraTransform.translateZ(this.vz);
    }
  };

  // Atualiza o estado da camera, movimentando-a e,
  // seguindo lentamente a posição do avião ( no eixo X )
  this.aliveBehaviour = (dt) => {
    // Salva a distância da camera para o avião ( em X )
    var dsx = airplane.mesh.position.x - this.cameraTransform.position.x;
    var dsz = airplane.mesh.position.z - this.cameraTransform.position.z;

    // Calcula quantos passos ( velocidade ) serão necessários
    // por frame, para alcançar o avião
    var vx = Math.abs(dsx) / (this.dtLerp * (dt || 1));
    var vz = Math.abs(dsz) / (this.dtLerp * (dt || 1));

    this.tickerX += vx;
    this.tickerZ += vz;
    this.cameraTransform.position.set(
      // Interpola entre a posição atual e a posição do avião
      // com base no ticker ( velocidade para chegar até lá )
      slerp(
        this.cameraTransform.position.x,
        airplane.mesh.position.x,
        this.tickerX
      ),
      this.cameraTransform.position.y,
      this.cameraTransform.position.z
    );

    // Para que o valor não fique agarrado sempre em 1 após
    // alcançar a posição do avião
    // reduz o ticker em uma proporção de 1/2 do seu avanço
    // dessa forma, ele está sempre desacelerando
    // e mantendo o movimento suave ( lento ) da camera
    this.tickerX = lerp(this.tickerX, 0, this.tickerX / 2);
    this.tickerZ = lerp(this.tickerZ, 0, this.tickerZ / 2);

    // Movimenta a camera se estiver no modo sobrevivencia
    // if (game.gamemode == GAMEMODES.SURVIVAL)
    this.cameraTransform.translateZ(this.vz * (dt / 20));
  };

  this.update = (dt) => {
    if (!airplane.alive) this.deathBehaviour(dt);
    else this.aliveBehaviour(dt);

    // this.audioListener.position.copy(this.cameraTransform.position);
  };

  this.init();
};

export default Camera;
