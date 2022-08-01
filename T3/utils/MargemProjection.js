import * as THREE from "three";
import { scene } from "../script.js";
import { ConvexGeometry } from "../../build/jsm/geometries/ConvexGeometry.js";
import { radiansToDegrees } from "../../libs/util/util.js";

const margemProjection = function () {
  this.points = [];

  // this.points.push(new THREE.Vector3(0, 0, 0));
  // this.points.push(new THREE.Vector3(50, 0, 0));
  // this.points.push(new THREE.Vector3(50, 50, 0));
  // this.points.push(new THREE.Vector3(20, 35, 0));
  // this.points.push(new THREE.Vector3(0, 0, -600));
  // this.points.push(new THREE.Vector3(50, 0, -600));
  // this.points.push(new THREE.Vector3(50, 50, -600));
  // this.points.push(new THREE.Vector3(20, 35, -600));

  this.texture = new THREE.TextureLoader().load(
    "./assets/textures/grass-rock.jpg",
    function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(2, 6);
    }
  );
  this.material = new THREE.MeshLambertMaterial({ map: this.texture });

  this.margem = new THREE.Mesh(
    new THREE.BoxGeometry(95, 50, 600),
    this.material
  );
  this.margem.receiveShadow = true;

  scene.add(this.margem);

  return this.margem;
};

export default margemProjection;
