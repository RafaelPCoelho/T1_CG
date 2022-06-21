import * as THREE from "three";
import { GLTFLoader } from "../../build/jsm/loaders/GLTFLoader.js";
import { airplane, scene } from "../script.js";
import { degreesToRadians } from "../../libs/util/util.js";

/*const loader = new GLTFLoader();
    loader.load("./assets/aviaoGLTF.gltf",function ( gltf )
    {
      this.aviao = gltf.scene
      
      aviao.position.set(0,50,-200);
      aviao.rotateY(degreesToRadians(-180))
      aviao.traverse( function (child){
        if(child) 
        child.castShadow = true;
      });
      scene.add(aviao);
    },null ,null);  
*/
const AviaoGLTFProjection = function (position) {
    const loader = new GLTFLoader();
    loader.load(
      "./assets/aviaoGLTF.gltf",
      ( gltf ) => {
        this.aviao = gltf.scene;
        this.aviao.rotateY(degreesToRadians(-180))
        scene.add(this.aviao);
        this.aviao.position.copy(position);
        this.aviao.traverse( function (child){
          if(child) child.castShadow = true;
        });
    },null ,null);  

  /*this.init = () => {
    this.aviao.rotateY(degreesToRadians(-180))
    scene.add(this.aviao);
    this.aviao.position.copy(position);
  };*/

  this.update = (dt) => {
    //let distortion = position.y / Math.tan(angle);
    
    if (this.aviao){
    this.aviao.position.copy(
      airplane.mesh.position
    );
    if(!airplane.alive)
    this.aviao.rotateX(degreesToRadians(35 * (dt / 100)));

    }
  };

  //this.init();
};

export default AviaoGLTFProjection;
