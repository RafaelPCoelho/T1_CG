import * as THREE from "three";
import{ scene, camera, airplane } from "./script.js";
import { createLightSphere } from "../libs/util/util.js";

const Light = function (){
    this.intensity = 0.5;
    this.lightPosition = new THREE.Vector3(0, 150, 50);
    this.color = "rgb(255, 255, 255)";

    this.targetObj = camera.cameraTransform;

    this.mainLight = new THREE.DirectionalLight(this.color, this.intensity);
    this.mainLight.position.copy(this.lightPosition);
    this.mainLight.castShadow = true;

    this.mainLight.shadow.mapSize.width  =  1024; 
    this.mainLight.shadow.mapSize.height =  1024;
    this.mainLight.shadow.camera.near = 2;
    this.mainLight.shadow.camera.far = 2000;
    this.mainLight.shadow.camera.left = -100;
    this.mainLight.shadow.camera.right = 100;
    this.mainLight.shadow.camera.top = 100;
    this.mainLight.shadow.camera.bottom = -100;

    this.mainLight.shadow.radius = 1.5;

    this.mainLight.target = this.targetObj;

    this.spotHelper = new THREE.CameraHelper(this.mainLight.shadow.camera, 0xFF8C00);

    this.init = () => {
        scene.add(this.mainLight);
        scene.add(this.mainLight.target);
        scene.add(this.spotHelper);
    };
    
    // this.update = () => {
    //     this.mainLight.position.set(
    //         0,
    //         150,
    //         airplane.mesh.position.z - 100
    //     );
    
        //this.mainLight.update();
    // };

    // this.moveLight = () => {
    //     mainLight.shadow.camera.updateProjectionMatrix();

    //     mainLight.target.position.set(
    //         0,
    //         150,
    //         camera.cameraTransform.position.z
    //     );

    //     this.mainLight.target.updateMatrixWorld();
    // }

    // this.update = () => {
    //     const time = Date.now() * 0.0005;

    //     this.mainLight.position.y = Math.sin(time * 0.7) * 20;
    //     this.mainLight.position.z = Math.cos(time * 0.7) * 20;

    //     renderer.render(scene, camera);
    //     requestAnimationFrame(animate);
    // };

    this.init();
};

export default Light;