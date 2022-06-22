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
};

export default AviaoGLTFProjection;
