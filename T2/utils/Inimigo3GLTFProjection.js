import { GLTFLoader } from "../../build/jsm/loaders/GLTFLoader.js";
import { Enemy, scene } from "../script.js";
import { degreesToRadians } from "../../libs/util/util.js";

const Enemy1GLTFProjection = function (position) {
  const loader3 = new GLTFLoader();
  this.inimigo3 = null;

  loader1.load(
    "./assets/Inimigo3GLTF.gltf",
    (gltf) => {
      this.inimigo3 = gltf.scene;
      this.inimigo3.rotateY(degreesToRadians(-90));
      scene.add(this.inimigo3);
      this.inimigo3.position.copy(position);
      this.inimigo3.traverse(function (child) {
        if (child) child.castShadow = true;
      });
    },
    null,
    null
  );
};

export default Enemy1GLTFProjection;
