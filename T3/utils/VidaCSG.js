import * as THREE from "three";
import { CylinderGeometry } from "../../build/three.module.js";
import { CSG } from "../../libs/other/CSGMesh.js";
import { degreesToRadians } from "../../libs/util/util.js";

const VidaCSG = function (position) {
  const material = new THREE.MeshStandardMaterial({ color: "red" });
  const cylinderMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(3, 3, 1, 32),
    material
  );
  const caixa1 = new THREE.Mesh(new THREE.BoxGeometry(3, 1, 1), material);
  const caixa2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 3), material);
  const mesh = CSG.fromMesh(cylinderMesh);
  caixa1.matrixAutoUpdate = false;
  caixa2.matrixAutoUpdate = false;
  const cylinderCSG = CSG.fromMesh(cylinderMesh);
  const caixa1CSG = CSG.fromMesh(caixa1);
  const caixa2CSG = CSG.fromMesh(caixa2);
  const tira1 = cylinderCSG.subtract(caixa1CSG);
  const tira2 = tira1.subtract(caixa2CSG);
  const tiraTudo = CSG.toMesh(tira2, new THREE.Matrix4());
  tiraTudo.material = new THREE.MeshStandardMaterial({ color: "red" });
  tiraTudo.position.copy(position);
  tiraTudo.rotateX(degreesToRadians(90));
  //const material = new THREE.MeshStandardMaterial({ color: "red" });
  //scene.add(cylinderGeometry);

  return tiraTudo;
};
export default VidaCSG;
