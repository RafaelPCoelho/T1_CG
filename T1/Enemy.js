import * as THREE from "three";
import { degreesToRadians } from "../libs/util/util.js";
import { scene, camera, airplane } from "./script.js";

const Enemy = function (onDestroy) {
  this.mesh = new THREE.Mesh(
    new THREE.BoxGeometry(6, 6, 6),
    new THREE.MeshLambertMaterial({
      color: "rgb(150, 60, 30)",
    })
  );

  this.vx = Math.random();
  this.vz = Math.random();
  this.vz = Math.max(0.4, this.vz);
  this.vz = Math.min(this.vz, 0.7);

  this.init = () => {
    // Seta a posição do inimigo com
    // x aleatorio
    // y ( altura ) fixa
    // z proporcional ao tamanho da tela em relacao a rotacao da camera
    this.mesh.position.set(
      -100 + Math.random() * 200,
      50,
      airplane.mesh.position.z - window.innerHeight * Math.cos(camera.theta)
    );
    scene.add(this.mesh);
  };

  this.update = () => {
    if (airplane.mesh.position.z < this.mesh.position.z) {
      console.log("DESTOI");
      if (onDestroy) {
        onDestroy();
        scene.remove(this.mesh);
        // delete this;
      }
    }
  };

  this.init();
};

export default Enemy;
