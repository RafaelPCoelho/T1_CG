import * as THREE from "three";
import { scene, airplane, camera } from "./script.js";
import { createGroundPlaneWired } from "../libs/util/util.js";
import montanhaProjection from "./utils/MontanhaProjection.js";
import margemProjection from "./utils/MargemProjection.js";
import { degreesToRadians } from "../../libs/util/util.js";

var Plano = function () {
  this.init = () => {
    // Cria-se dois planos que alternarão entre si
    // produzindo um efeito de chão infinito
    this.plano1 = createGroundPlaneWired(600, 600);
    this.plano2 = createGroundPlaneWired(600, 600);
    this.plano2.position.set(0, 0, -600);
    this.limiteCriadorDePlano = -500;
    this.alternadorDePlano = true;
    this.proxPlano = -1200;
    this.novaPosition = 0;

    //MONTANHAS

    this.montanhaDireita1 = new montanhaProjection();
    this.montanhaEsquerda1 = new montanhaProjection();

    this.montanhaDireita1.position.set(150, 0, 0);
    this.montanhaEsquerda1.position.set(-150, 0, 0);

    this.montanhaDireita2 = new montanhaProjection();
    this.montanhaEsquerda2 = new montanhaProjection();

    this.montanhaDireita2.position.set(-150, 0, -600);
    this.montanhaEsquerda2.position.set(150, 0, -600);

    //MARGENS

    this.margemDireita1 = new margemProjection();
    this.margemEsquerda1 = new margemProjection();

    this.margemDireita1.position.set(50, 0, 0);
    this.margemEsquerda1.position.set(-50, 0, -600);
    this.margemEsquerda1.rotateY(degreesToRadians(180));

    this.margemDireita2 = new margemProjection();
    this.margemEsquerda2 = new margemProjection();

    this.margemDireita2.position.set(50, 0, -600);
    this.margemEsquerda2.position.set(-50, 0, -600);
    this.margemEsquerda2.rotateY(degreesToRadians(180));

    // n sei oq é

    this.visibleDepth = window.innerHeight / Math.sin(camera.theta);

    // Inicia os dois planos
    scene.add(this.plano1);
    scene.add(this.plano2);
  };

  // Roda o estado dos planos,
  // verificando se o avião atingiu o limite necessário
  // do cenário, para transladar o plano de tras
  // para a frente do próximo plano
  this.update = () => {
    if (airplane.mesh.position.z < this.limiteCriadorDePlano) {
      this.limiteCriadorDePlano -= 600;
      if (this.alternadorDePlano) {
        this.novaPosition = this.plano1.position.z + this.proxPlano;
        this.plano1.position.set(0, 0, this.novaPosition);
        this.montanhaDireita1.position.set(150, 0, this.plano1.position.z);
        this.montanhaEsquerda1.position.set(-150, 0, this.plano1.position.z);
        this.margemDireita1.position.set(50, 0, this.plano1.position.z);
        this.margemEsquerda1.position.set(-50, 0, this.plano1.position.z);
        this.alternadorDePlano = false;
      } else {
        this.novaPosition = this.plano2.position.z + this.proxPlano;
        this.plano2.position.set(0, 0, this.novaPosition);
        this.montanhaDireita2.position.set(-150, 0, this.plano2.position.z);
        this.montanhaEsquerda2.position.set(150, 0, this.plano2.position.z);
        this.margemDireita2.position.set(50, 0, this.plano2.position.z);
        this.margemEsquerda2.position.set(-50, 0, this.plano2.position.z);
        this.alternadorDePlano = true;
      }
    }
  };

  this.init();
};

export default Plano;
