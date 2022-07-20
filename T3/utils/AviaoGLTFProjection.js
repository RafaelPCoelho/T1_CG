import { airplane, game, scene } from "../script.js";
import { degreesToRadians } from "../../libs/util/util.js";

const AviaoGLTFProjection = function (position) {
  this.aviao = null;

  game.load("./assets/aviaoGLTF.gltf", (gltf) => {
    this.aviao = gltf;
    this.aviao.rotateY(degreesToRadians(-180));
    scene.add(this.aviao);
    this.aviao.position.copy(position);
    this.aviao.traverse(function (child) {
      if (child) child.castShadow = true;
    });
  });
};

export default AviaoGLTFProjection;
