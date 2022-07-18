import { GLTFLoader } from "../../build/jsm/loaders/GLTFLoader.js";
import { scene } from "../script.js";
import { degreesToRadians } from "../../libs/util/util.js";

const Enemy2GLTFProjection = function (position) {
  const loader = new GLTFLoader();
  this.inimigo = null;

  loader.load(
    "./assets/Inimigo2GLTF.gltf",
    (gltf) => {
      this.inimigo = gltf.scene;
      this.inimigo.rotateY(degreesToRadians(-180));
      scene.add(this.inimigo);
      this.inimigo.position.copy(position);
      this.inimigo.traverse(function (child) {
        if (child) child.castShadow = true;
      });
    },
    null,
    null
  );
};

export default Enemy2GLTFProjection;
