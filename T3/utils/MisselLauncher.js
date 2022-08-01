import { game, scene } from "../script.js";

const MisselLauncher = function (position) {
  game.load(
    "./assets/models/missile_launcher_tower/scene.gltf",
    (gltf) => {
      this.launcher = gltf;
      // this.launcher.scale.set(10, 10, 10);
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
