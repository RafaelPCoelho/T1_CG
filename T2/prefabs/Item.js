import * as THREE from "three";
import { checkCollision } from "../libs/Collision/index.js";
import { airplane, scene } from "../script.js";

const Item = function (type, position, value, onDestroy) {
  this.init = () => {
    this.geometry = new THREE.SphereGeometry(2);

    switch (type) {
      case "health": {
        this.material = new THREE.MeshStandardMaterial({ color: "green" });
        break;
      }

      default: {
        this.material = new THREE.MeshStandardMaterial({ color: "yellow" });
        break;
      }
    }

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.action = () => {
      airplane[type] += value;
    };

    this.mesh.position.copy(position);
    scene.add(this.mesh);
  };

  this.destroy = () => {
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
