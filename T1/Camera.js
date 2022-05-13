import * as THREE from "three";
import { clamp, lerp, slerp } from "./libs/utils/math.js";
import { initCamera } from "../libs/util/util.js";
import { airplane, scene } from "./script.js";

const Camera = function () {
  this.vz = -1;

  this.camera = initCamera(new THREE.Vector3(0, 200, 200));
  this.cameraTransform = new THREE.Mesh();

  this.ticker = 0;
  this.dtLerp = 1000;

  this.init = () => {
    this.cameraTransform.position.set(0, 20, 0);
    this.cameraTransform.add(this.camera);
    scene.add(this.cameraTransform);
  };

  this.update = (dt) => {
    var ds = airplane.mesh.position.x - this.cameraTransform.position.x;
    let v = Math.abs(ds) / (this.dtLerp * (dt || 1));

    this.ticker += v;
    this.cameraTransform.position.set(
      slerp(
        this.cameraTransform.position.x,
        airplane.mesh.position.x,
        this.ticker
      ),
      this.cameraTransform.position.y,
      this.cameraTransform.position.z
    );
    this.ticker = lerp(this.ticker, 0, this.ticker / 2);

    this.cameraTransform.translateZ(this.vz);
  };

  this.init();
};

export default Camera;
