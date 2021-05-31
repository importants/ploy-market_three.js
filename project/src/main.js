import * as THREE from "../three/build/three.module.js";
import {
  OrbitControls
} from "../three/examples/jsm/controls/OrbitControls.js";

import {
  ground
} from "./ground.js"

import {
  items
} from "./three3/item/items.js"

import {
  model
} from "./three3/model.js"

import {
  GUI
} from "../three/examples/jsm/libs/dat.gui.module.js"




class main_three {

  constructor() {
    this._Initialize();

  }

  _Initialize() {

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.objects = [];

    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.set(100, 100, 100);
    this.camera.lookAt(0, 0, 0);
    //this.control = new OrbitControls(this.scene_, this.camera);


    this.scene_ = new THREE.Scene();
    this.scene_.background = new THREE.Color("#FBF1E3");

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x999999, 1);
    //this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;



    // lights

    const ambientLight = new THREE.AmbientLight(0x606060, 0.7);
    //this.scene_.add(ambientLight);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(300, 300, 300);

    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene_.add(directionalLight);
    this.scene_.add(directionalLight.target);

    var d = 200;
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;

    directionalLight.shadow.camera.near = 0.01;
    directionalLight.shadow.camera.far = 10000;

    // this.helper = new THREE.DirectionalLightHelper(directionalLight, 10)
    // this.scene_.add(this.helper)
    // this.shadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
    // this.scene_.add(this.shadowHelper)



    document.body.appendChild(this.renderer.domElement);

    // 축 보기
    const axesHelper = new THREE.AxesHelper(100);
    this.scene_.add(axesHelper);

    //this.previousRAF_ = null;



    // mesh 불러오기
    // this.center = new ground.ground({
    //   scene: this.scene_
    // });

    this.model = new model.model({
      scene: this.scene_,
      camera: this.camera,
    })

    this.items = new items.items({
      scene: this.scene_,
      camera: this.camera,
      objects: this.objects
    })
    this.ground = new ground.ground({
      scene: this.scene_,
      objects: this.objects,
      camera: this.camera,
    })




    this._mixers = [];
    this._previousRAF = null;
    this.InitInput_();

    this.render();

  }


  InitInput_() {
    document.addEventListener("keydown", (e) => this.OnKeyDown_(e), false);
    document.addEventListener("keyup", (e) => this.OnKeyUp_(e), false);
    //document.addEventListener("pointermove", (e) => this.onDocumentMouseMove_(e), false);
    //document.addEventListener("pointerdown", (e) => this.onDocumentMouseDown_(e), false);
    //document.addEventListener("pointerup", (e) => this.onDocumentMouseUp_(e), false);
    window.addEventListener("resize", (e) => this.onWindowResize_(e), false);
  }


  OnKeyDown_(event) {
    switch (event.keyCode) {
      case 49:
        break;
      case 50:
        break;
    }
  }

  OnKeyUp_(event) {
    switch (event.keyCode) {
      case 65:
        break;
      case 68:
        break;
    }
  }

  onDocumentMouseMove_(event) {
    event.preventDefault();

    this.mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(this.objects);
    //if (intersects.name == 'ex')
    if (intersects.length > 0)
      console.log(intersects[0].object.name)
  }

  onDocumentMouseDown_(event) {

  }

  onDocumentMouseUp_(event) {

  }


  onWindowResize_() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      window.innerWidth, window.innerHeight
    );
  }



  render() {
    requestAnimationFrame((t) => {
      if (this.previousRAF_ === null) {
        this.previousRAF_ = t;
        console.log(t)
      }
      this.render();
      this.renderer.render(this.scene_, this.camera);
      this._Step(t - this._previousRAF);
      this.rotation_();
      this.previousRAF_ = t;

      //this.control.update();
    });
  }

  _Step(timeElapsed) {
    const timeElapsedS = timeElapsed * 0.001;
    let a = this.items.Update(timeElapsedS); // 아이템 값
    let b = this.items.getHeigt(); // y 값
    this.model.Update(a, b);
    // if (this._controls) {
    //   // this._controls.Update(timeElapsedS);
    // }

  }

  onDocumentKeyDown(event) {


  }


  rotation_() {

  }
}

let _APP = null;

window.addEventListener("DOMContentLoaded", () => {
  _APP = new main_three();
});

let btn = document.getElementsByClassName("click")[0];





function clearCanvas() {
  var canvas = document.querySelector("canvas");
  document.body.removeChild(canvas);
}