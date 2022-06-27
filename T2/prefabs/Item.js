import * as THREE from "three";
import { checkCollision } from "../libs/Collision/index.js";
import { airplane, scene } from "../script.js";
import VidaCSG from "../utils/VidaCSG.js";

const Item = function (type, position, value, onDestroy) {
  this.init = () => {
    this.geometry = new THREE.SphereGeometry(2);
    this.vidaCSG = null;

    switch (type) {
      case "health": {
        //this.mesh = VidaCSG();
        //this.material = new THREE.MeshStandardMaterial({ color: "green" });;
        this.vidaCSG = VidaCSG(position);
        scene.add(this.vidaCSG);
        //scene.add(this.mesh);
        break;
      }

      default: {
        //this.geometry = new THREE.SphereGeometry(2);
        this.material = new THREE.MeshStandardMaterial({ color: "yellow" });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        //this.mesh.position.copy(position);
        break;
      }
    }

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.action = () => {
      airplane[type] += value;
    };

    this.mesh.position.copy(position);
    if (!this.vidaCSG) scene.add(this.mesh);
  };

  this.destroy = () => {
    if (type == "health") scene.remove(this.VidaCSG);
    scene.remove(this.vidaCSG);
    scene.remove(this.mesh);
    if (onDestroy) onDestroy();
  };

  this.update = () => {
    if (checkCollision(this.mesh, airplane.mesh)) {
      this.action();
      this.destroy();
    }
  };

  this.init();
};

export default Item;
