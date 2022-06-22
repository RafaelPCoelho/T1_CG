import { GLTFLoader } from "../../build/jsm/loaders/GLTFLoader.js";
import { scene } from "../script.js";
import { degreesToRadians } from "../../libs/util/util.js";

const MisselLauncher = function (position) {
  const loader = new GLTFLoader();
  loader.load(
    "./assets/missileLaucherGLTF.gltf",
    (gltf) => {
      this.launcher = gltf.scene;
      this.launcher.scale.set(2, 2, 2);
      this.launcher.position.copy(position);
      this.launcher.traverse(function (child) {
        if (child) child.castShadow = true;
      });
      scene.add(this.launcher);
    },
    null,
    null
  );
};

export default MisselLauncher;
