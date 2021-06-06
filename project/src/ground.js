import * as THREE from '../three/build/three.module.js';


import {
    CarCenter,
}
from './three3/item/main/CarCenter.js';

import {
    tree1,
}

from './three3/item/main/tree1.js';
import {
    tree2,
}
from './three3/item/main/tree2.js';
import {
    tree3,
}
from './three3/item/main/tree3.js';
import {
    Road
} from "./three3/item/main/Road.js";

import {
    Plant2
} from "./three3/item/plaza/Plant2.js";

import {
    StreetLamp
} from "./three3/item/plaza/StreetLamp.js";

import {
    Bench
} from "./three3/item/plaza/Bench.js";
import {
    Statue
} from "./three3/item/plaza/Statue.js";
import {
    Statue2
} from "./three3/item/plaza/Statue2.js";
import {
    Building1
} from "./three3/item/building/Building1.js";

import {
    Building2
} from "./three3/item/building/Building2.js";

import {
    Building3
} from "./three3/item/building/Building3.js";

import {
    Building4
} from "./three3/item/building/Building4.js";

import {
    Building5
} from "./three3/item/building/Building5.js";

import {
    Building6
} from "./three3/item/building/Building6.js";

import {
    Building7
} from "./three3/item/building/Building7.js";

import {
    Building8
} from "./three3/item/building/Building8.js";

import {
    Building9
} from "./three3/item/building/Building9.js";

import {
    Building10
} from "./three3/item/building/Building10.js";

export const ground = (() => {

    let i = 0;
    class ground {
        constructor(params) {
            let {
                scene,
                objects,
                camera
            } = params;
            this.scene_ = scene;
            this.camera_ = camera;
            this.objects_ = objects;
            // new THREE.Vector3(10, 10, 10);
            this.velocity_ = 0.0;

            this.LoadModel_();

        }

        LoadModel_() {


            const listener = new THREE.AudioListener();
            this.camera_.add(listener);
            const audioLoader = new THREE.AudioLoader();
            const sound = new THREE.PositionalAudio(listener);
            audioLoader.load('./src/sounds/traffic.mp3', function (buffer) {

                sound.setBuffer(buffer);
                sound.setRefDistance(40);
                sound.play();

            });



            const exGeo = new THREE.BoxGeometry(300, 119, 50);
            const exMat = new THREE.MeshPhongMaterial({
                color: 0X1E854D,
            });
            const exGeo1 = new THREE.BoxGeometry(300, 52, 50);
            const ex1Mat = new THREE.MeshPhongMaterial({
                color: 0X4B4B4B,
            });
            const exGeo2 = new THREE.BoxGeometry(300, 129, 50);
            const ex2Mat = new THREE.MeshPhongMaterial({
                color: 0X816653,
            });

            const ex = new THREE.Mesh(exGeo, exMat);
            this.scene_.add(ex);
            ex.rotation.x = -Math.PI / 2;
            ex.position.y = -26;
            ex.position.z = 90;
            ex.receiveShadow = true;

            const ex1 = new THREE.Mesh(exGeo1, ex1Mat);
            this.scene_.add(ex1);
            ex1.rotation.x = -Math.PI / 2;
            ex1.position.y = -26;
            ex1.position.z = 5;
            ex1.receiveShadow = true;

            const ex2 = new THREE.Mesh(exGeo2, ex2Mat);
            this.scene_.add(ex2);
            ex2.rotation.x = -Math.PI / 2;
            ex2.position.y = -26;
            ex2.position.z = -85;
            ex2.receiveShadow = true;



            // const ex3Geo = new THREE.BoxGeometry(300, 300, 800);
            // const ex3Mat = new THREE.MeshPhongMaterial({
            //     color: 0X6D6D6D,

            // });

            // const ex3 = new THREE.Mesh(ex3Geo, ex3Mat);
            // this.scene_.add(ex3);
            // ex3.rotation.x = -Math.PI / 2;
            // ex3.position.y = -412;
            // ex3.receiveShadow = true;

            const roadGeo = new THREE.BoxGeometry(300, 60, 1);
            const roadMat = new THREE.MeshPhongMaterial({
                color: 0X5B5B5B,

            });

            const road = new THREE.Mesh(roadGeo, roadMat);
            this.scene_.add(road);
            road.rotation.x = -Math.PI / 2;
            road.position.z = 5;
            road.receiveShadow = true;
            road.add(sound)


            const roadGeo1 = new THREE.BoxGeometry(300, 1, 1);
            const roadMat1 = new THREE.MeshPhongMaterial({
                color: 0XFFDD20,
            });
            const Yellow1 = new THREE.Mesh(roadGeo1, roadMat1);
            this.scene_.add(Yellow1);
            Yellow1.rotation.x = -Math.PI / 2;
            Yellow1.position.y = 0.2;
            Yellow1.position.z = 5;



            this.CarCenter = new CarCenter.CarCenter({
                scene: this.scene_,
                objects: this.objects_
            });


            this.tree1 = new tree1.tree1({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(-100, 0, -35)
            });
            this.tree2 = new tree2.tree2({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(0, 0, -35)
            });
            this.tree3 = new tree3.tree3({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(110, 0, -35)
            });

            this.tree4 = new tree3.tree3({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(-100, 0, 45)
            });
            this.tree5 = new tree1.tree1({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(0, 0, 45)
            });
            this.tree6 = new tree2.tree2({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(110, 0, 45)
            });
            this.Road = new Road.Road({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(0, 0, 47),
                rotation_right: false
            });
            this.Road1 = new Road.Road({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(0, 0, -35),
                rotation_right: true
            });

            this.Plant = new Plant2.Plant2({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(70, 0, 80),
                weight: 1
            });

            this.Plant2 = new Plant2.Plant2({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(20, 0, 135),
                weight: 2
            });

            this.Plant3 = new Plant2.Plant2({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(30, 0, 100),
                weight: 3
            });

            this.Plant4 = new Plant2.Plant2({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(45, 0, -110),
                weight: 3
            });

            this.Bench = new Bench.Bench({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(100, 0, 80),
            });

            this.Bench2 = new Bench.Bench({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(40, 0, 80),
            });

            this.Bench3 = new Bench.Bench({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(-40, 0, 80),
            });

            this.Bench4 = new Bench.Bench({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(-100, 0, 80),
            });

            this.Streetlamp = new StreetLamp.StreetLamp({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(-70, 0, 80),
            });

            this.Statue = new Statue.Statue({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(100, 0, 120),
                weight: 1
            });

            this.Statue2 = new Statue2.Statue2({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(-80, 0, 120),
                weight: 1
            });

            this.Streetlamp2 = new StreetLamp.StreetLamp({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(70, 0, 80),
            });





        }


        random_color() {
            // 위치 변경 함수
            let color = [0xAEDE24, 0xB0E712, 0xC6F04D];
            let min = Math.ceil(0);
            let max = Math.floor(2);
            return color[Math.floor(Math.random() * (max - min)) + min];
        }

        /* animation */
        Update(timeElapsed) {
            if (this.keys_.space && this.position_.y == 0.0) {
                this.velocity_ = 30;
            }

            const acceleration = -60 * timeElapsed;

            this.position_.y += timeElapsed * (this.velocity_ + acceleration * 0.5);
            this.position_.y = Math.max(this.position_.y, 0.0);

            this.velocity_ += acceleration;
            this.velocity_ = Math.max(this.velocity_, -100);

            if (this.mesh_) {
                this.mesh_.position.copy(this.position_);
            }
        }
    }



    return {
        ground: ground,
    };
})();