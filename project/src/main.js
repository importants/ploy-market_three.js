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
  Market1
} from "./Market1.js";

import {
  Market2
} from "./Market2.js";
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
    // this.scene_.background = new THREE.Color("#FBF1E3");

    {
      const color = 0xFFFFFF; // 하양
      const near = 700;
      const far = 1000;
      this.scene_.fog = new THREE.Fog(color, near, far);
    }

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0xECFDFF, 1);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping; // toneMapping 속성
    this.renderer.toneMappingExposure = 1.2; // 렌더러의 밝기 속성
    this.num = 2;

    // lights

    const ambientLight = new THREE.AmbientLight(0x606060, 1);
    this.scene_.add(ambientLight);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    //directionalLight.position.set(300, 300, 300);
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

    document.body.appendChild(this.renderer.domElement);

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

    this.Market1 = new Market1.Market1({
      scene: this.scene_,
      objects: this.objects,
      camera: this.camera,
    })

    this.Market2 = new Market2.Market2({
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
    window.addEventListener("resize", (e) => this.onWindowResize_(e), false);
    let leftBtn = document.getElementsByClassName("left")[0]
    let rightBtn = document.getElementsByClassName("right")[0]
    this.place = new THREE.Vector3(0, 0, 0);
    rightBtn.addEventListener("click", () => {
      this.num++;
      if (this.num == 3)
        this.num = 0;
      console.log(this.num)
      switch (this.num) {
        case 0:
          this.place.copy(new THREE.Vector3(2500, 0, -2500));
          break;
        case 1:
          this.place.copy(new THREE.Vector3(-2500, 0, 2500));
          break;
        case 2:
          this.place.copy(new THREE.Vector3(0, 0, 0));
          break;
        default:
          this.place.copy(new THREE.Vector3(0, 0, 0));
          break;
      }
      this.model.ChangePos(this.place)
    }, false)
    leftBtn.addEventListener("click", () => {
      this.num--;
      if (this.num == -1)
        this.num = 2;
      console.log(this.num)
      switch (this.num) {
        case 0:
          this.place.copy(new THREE.Vector3(2500, 0, -2500));
          break;
        case 1:
          this.place.copy(new THREE.Vector3(-2500, 0, 2500));
          break;
        case 2:
          this.place.copy(new THREE.Vector3(0, 0, 0));
          break;
        default:
          this.place.copy(new THREE.Vector3(0, 0, 0));
          break;
      }
      this.model.ChangePos(this.place)
    }, false)
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
      this.previousRAF_ = t;
      //this.control.update();
    });
  }

  _Step(timeElapsed) {
    const timeElapsedS = timeElapsed * 0.001;
    let a = this.items.Update(timeElapsedS); // 아이템 값
    let b = this.items.getHeigt(); // y 값
    this.model.Update(a, b, this.place);
  }

}

let _APP = null;

window.addEventListener("DOMContentLoaded", () => {
  _APP = new main_three();
});