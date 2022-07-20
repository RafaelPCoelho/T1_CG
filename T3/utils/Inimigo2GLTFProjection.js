import { game, scene } from "../script.js";
import { degreesToRadians } from "../../libs/util/util.js";

const Enemy2GLTFProjection = function (position) {
  this.inimigo = null;

  game.load("./assets/Inimigo2GLTF.gltf", (gltf) => {
    this.inimigo = gltf;
    this.inimigo.rotateY(degreesToRadians(-180));
    scene.add(this.inimigo);
    this.inimigo.position.copy(position);
    this.inimigo.traverse(function (child) {
      if (child) child.castShadow = true;
    });
  });
};

export default Enemy2GLTFProjection;
