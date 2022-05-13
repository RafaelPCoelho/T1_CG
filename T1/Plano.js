import * as THREE from "three";
import { scene, camera } from "./script.js";
import { createGroundPlaneWired } from "../libs/util/util.js";

var Plano = function () {
  this.plano = createGroundPlaneWired(600, 600);
  this.x = x;
  this.z = z;

  this.init = () => {
    scene.add(this.plano);
  };
};

function PlanoInfinito(camera, plano) {
  while (camera.z < plano.z - 300) {}
}

export default Plano;
