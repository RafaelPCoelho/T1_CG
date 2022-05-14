import * as THREE from "three";
import { scene, airplane } from "./script.js";
import { createGroundPlaneWired } from "../libs/util/util.js";

var Plano = function () {
  this.plano1 = createGroundPlaneWired(600, 600);
  this.plano2 = createGroundPlaneWired(600, 600);
  this.plano2.position.set(0, 0, -600);
  this.limiteCriadorDePlano = -500;
  this.alternadorDePlano = true;
  this.proxPlano = -1200;
  this.novaPosition = 0;

  this.init = () => {
    scene.add(this.plano1);
    scene.add(this.plano2);
  };

  this.update = () => {
    if (airplane.mesh.position.z < this.limiteCriadorDePlano) {
      this.limiteCriadorDePlano -= 600;
      if (this.alternadorDePlano) {
        this.novaPosition = this.plano1.position.z + this.proxPlano;
        this.plano1.position.set(0, 0, this.novaPosition);
        this.alternadorDePlano = false;
        // console.log(
        //   "ALTERNOU",
        //   this.limiteCriadorDePlano,
        //   this.alternadorDePlano,
        //   this.novaPosition
        // );
      } else {
        this.novaPosition = this.plano2.position.z + this.proxPlano;
        this.plano2.position.set(0, 0, this.novaPosition);
        this.alternadorDePlano = true;
      }
    }
  };

  this.init();
};

export default Plano;
