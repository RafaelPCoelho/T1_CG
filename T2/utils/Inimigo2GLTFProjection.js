import { GLTFLoader } from "../../build/jsm/loaders/GLTFLoader.js";
import { Enemy, scene } from "../script.js";
import { degreesToRadians } from "../../libs/util/util.js";

const Enemy2GLTFProjection = function (position) {
  const loader2 = new GLTFLoader();
  this.inimigo2 = null;

  loader1.load(
    "./assets/Inimigo2GLTF.gltf",
    (gltf) => {
      this.inimigo2 = gltf.scene;
      this.inimigo2.rotateY(degreesToRadians(-180));
      scene.add(this.inimigo2);
      this.inimigo2.position.copy(position);
      this.inimigo2.traverse(function (child) {
        if (child) child.castShadow = true;
      });
    },
    null,
    null
  );
};

export default Enemy2GLTFProjection;
