import * as THREE from "three";
import { camera, scene } from "../script.js";

const loader = new THREE.TextureLoader();

const ExplosionProjection = function (position) {
  this.textures = [];
  this.i = 0;

  this.loaded = false;

  Promise.all(
    Array(16)
      .fill(1)
      .map(
        (_, i) =>
          new Promise((res) => {
            loader.load(`./assets/textures/${i + 1}.png`, (texture) => {
              res(texture);
            });
          })
      )
  ).then((res) => {
    console.log("ALL TEXTURES LOADED", res);
    this.textures = res;
    this.loaded = true;
    this.i = 0;
    scene.add(this.explosao);
  });

  this.material = new THREE.MeshBasicMaterial({
    transparent: true,
  });
  this.geometria = new THREE.BoxGeometry(20, 20, 0);
  this.explosao = new THREE.Mesh(this.geometria, this.material);
  this.explosao.position.copy(position);

  this.update = () => {
    if (!this.loaded) return;

    this.explosao.lookAt(camera.cameraTransform.position);

    this.material.map = this.textures[this.i];
    this.i++;
    if (this.i >= this.textures.length) this.i = 0;
  };
};

export default ExplosionProjection;
