import { GLTFLoader } from "../../build/jsm/loaders/GLTFLoader.js";
import Cannon from "../prefabs/Cannon.js";
import { cannons, scene } from "../script.js";

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

  this.remove = () => {
    scene.remove(this.launcher);
  };
};

export default MisselLauncher;
