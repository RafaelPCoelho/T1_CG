import { GLTFLoader } from "../../build/jsm/loaders/GLTFLoader.js";
import { airplane, scene } from "../script.js";
import { degreesToRadians } from "../../libs/util/util.js";
const AviaoGLTFProjection = function (position) {
  const loader = new GLTFLoader();
  loader.load(
    "./assets/aviaoGLTF.gltf",
    (gltf) => {
      this.aviao = gltf.scene;
      this.aviao.rotateY(degreesToRadians(-180));
      scene.add(this.aviao);
      this.aviao.position.copy(position);
      this.aviao.traverse(function (child) {
        if (child) child.castShadow = true;
      });
    },
    null,
    null
  );

  this.update = (dt) => {
    if (this.aviao) {
      this.aviao.position.copy(airplane.mesh.position);
      if (airplane.vx > 0)
        this.aviao.rotateZ(degreesToRadians(100 * (dt / 1000)));
      if (airplane.vx < 0)
        this.aviao.rotateZ(degreesToRadians(-100 * (dt / 1000)));

      if (!airplane.alive)
        this.aviao.rotateX(degreesToRadians(35 * (dt / 100)));
    }
  };
};

export default AviaoGLTFProjection;
