import { GLTFLoader } from "../../build/jsm/loaders/GLTFLoader.js";
import { Enemy, scene } from "../script.js";
import { degreesToRadians } from "../../libs/util/util.js";

const Enemy1GLTFProjection = function (position) {
  const loader1 = new GLTFLoader();
  this.inimigo1 = null;

  loader1.load(
    "./assets/Inimigo1GLTF.gltf",
    (gltf) => {
      this.inimigo1 = gltf.scene;
      this.inimigo1.rotateY(degreesToRadians(-180));
      scene.add(this.inimigo1);
      this.inimigo1.position.copy(position);
      this.inimigo1.traverse(function (child) {
        if (child) child.castShadow = true;
      });
    },
    null,
    null
  );
};

export default Enemy1GLTFProjection;
