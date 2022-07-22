import { game, scene } from "../script.js";
import { degreesToRadians } from "../../libs/util/util.js";

const Enemy1GLTFProjection = function (position) {
  this.inimigo = null;

  game.load("./assets/Inimigo1GLTF.gltf", (gltf) => {
    this.inimigo = gltf;
    this.inimigo.rotateY(degreesToRadians(0));
    scene.add(this.inimigo);
    this.inimigo.position.copy(position);
    this.inimigo.traverse(function (child) {
      if (child) child.castShadow = true;
    });
  });
};

export default Enemy1GLTFProjection;
