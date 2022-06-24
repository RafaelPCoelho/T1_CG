import * as THREE from "three";
import { airplane, scene } from "./script.js";

const TargetProjection = function (position, angle) {
  this.mesh = new THREE.Mesh(
    new THREE.TorusGeometry(2, 0.2, 50, 50),
    new THREE.MeshStandardMaterial({ color: "red" })
  );
  //this.mesh.castShadow = true;

  this.init = () => {
    this.mesh.rotateX(-Math.PI / 2);
    scene.add(this.mesh);
    this.mesh.position.copy(position);
  };

  this.update = (dt) => {
    let distortion = position.y / Math.tan(angle);

    this.mesh.position.set(
      airplane.mesh.position.x,
      airplane.mesh.position.y - position.y,
      airplane.mesh.position.z - distortion
    );
  };

  this.init();
};

export default TargetProjection;
