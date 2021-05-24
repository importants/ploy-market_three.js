import * as THREE from '../../../three/build/three.module.js';
import {
    FBXLoader
} from "../../../three/examples/jsm/loaders/FBXLoader.js"
import {
    OBJLoader
} from "../../../three/examples/jsm/loaders/OBJLoader.js"
import {
    MTLLoader
} from "../../../three/examples/jsm/loaders/MTLLoader.js"

import {
    TGALoader
} from '../../../three/examples/jsm/loaders/TGALoader.js';

import {
    LoadingManager
} from "../../../three/src/loaders/LoadingManager.js"
import {
    RectAreaLightUniformsLib
} from "../../../three/examples/jsm/lights/RectAreaLightUniformsLib.js"
import {
    RectAreaLightHelper
} from "../../../three/examples/jsm/helpers/RectAreaLightHelper.js"
export const item1 = (() => {

    let i = 0;
    class item1 {
        constructor(params) {
            let {
                scene,
                objects,
                camera
            } = params;
            this.scene_ = scene;
            this.camera_ = camera;
            this.objects_ = objects;
            this.raycaster = new THREE.Raycaster();
            this.mouse = new THREE.Vector2();
            this.LoadModel_();

        }

        LoadModel_() {
            const manager = new LoadingManager();
            manager.addHandler(/\.tga$/i, new TGALoader());

            const loader = new FBXLoader(manager);
            loader.setPath('./src/three/fbx/');
            loader.load('final.fbx', (fbx) => {
                fbx.scale.setScalar(0.5);
                fbx.traverse(c => {
                    c.castShadow = true;
                });
                fbx.rotation.y = -Math.PI / 2;

                this.scene_.add(fbx);
            });

            const exGeo = new THREE.BoxGeometry(200, 100, 2);
            const exMat = new THREE.MeshPhongMaterial({
                color: 0x121113,

            });

            const ex = new THREE.Mesh(exGeo, exMat);
            this.scene_.add(ex);
            ex.rotation.x = -Math.PI / 2;
            ex.position.y = -2;
            ex.position.x = 50;

            const exGeo1 = new THREE.BoxGeometry(101, 1, .7);
            const exMat1 = new THREE.MeshPhongMaterial({
                color: 0x4b433e,

            });

            const ex1 = new THREE.Mesh(exGeo1, exMat1);
            this.scene_.add(ex1);
            ex1.position.x = 99;
            ex1.position.z = -3.8;
            ex1.position.y = 0;

            const ex2 = new THREE.Mesh(exGeo1, exMat1);
            this.scene_.add(ex2);
            ex2.position.x = 99;
            ex2.position.z = 38.5;
            ex2.position.y = 0;

            const roadGeo = new THREE.BoxGeometry(20, 2, 0.2);
            const roadMat = new THREE.MeshPhongMaterial({
                color: 0xbbbbbb,

            });
            // const road = new THREE.Mesh(roadGeo, roadMat);
            // this.scene_.add(road);
            // road.rotation.x = -Math.PI / 2;
            // road.position.x = 30;
            // road.position.z = 18;

            const road1 = new THREE.Mesh(roadGeo, roadMat);
            this.scene_.add(road1);
            road1.rotation.x = -Math.PI / 2;
            road1.position.x = 60;
            road1.position.z = 18;

            const road2 = new THREE.Mesh(roadGeo, roadMat);
            this.scene_.add(road2);
            road2.rotation.x = -Math.PI / 2;
            road2.position.x = 90;
            road2.position.z = 18;

            const road3 = new THREE.Mesh(roadGeo, roadMat);
            this.scene_.add(road3);
            road3.rotation.x = -Math.PI / 2;
            road3.position.x = 120;
            road3.position.z = 18;

            const road4 = new THREE.Mesh(roadGeo, roadMat);
            this.scene_.add(road4);
            road4.rotation.x = -Math.PI / 2;
            road4.position.x = 145;
            road4.position.z = 18;
            road4.scale.x = 0.5

            RectAreaLightUniformsLib.init();

            const color = 0xff0000;
            const intensity = 5;
            const width = 12;
            const height = 5;
            const light = new THREE.RectAreaLight(color, intensity, width, height);
            light.position.set(-22, 30, 45);
            light.rotation.x = THREE.MathUtils.degToRad(180);
            light.rotation.y = THREE.MathUtils.degToRad(-90);
            this.scene_.add(light);
            const helper = new RectAreaLightHelper(light);
            light.add(helper);
            this.scene_.add(helper)

            const color1 = 0x00ffff;
            const intensity1 = 5;
            const width1 = 35;
            const height1 = 3;
            const light1_1 = new THREE.RectAreaLight(color1, intensity1, width1, height1);
            light1_1.position.set(24, 40, -10);
            light1_1.rotation.x = THREE.MathUtils.degToRad(180);
            this.scene_.add(light1_1);
            const helper1_1 = new RectAreaLightHelper(light1_1);

            const light1_2 = new THREE.RectAreaLight(color1, intensity1, width1, height1);
            light1_2.position.set(24, 35, -10);
            light1_2.rotation.x = THREE.MathUtils.degToRad(180);

            this.scene_.add(light1_2);
            const helper1_2 = new RectAreaLightHelper(light1_2);

            const light1_3 = new THREE.RectAreaLight(color1, intensity1, width1, height1);
            light1_3.position.set(24, 30, -10);
            light1_3.rotation.x = THREE.MathUtils.degToRad(180);

            this.scene_.add(light1_3);
            const helper1_3 = new RectAreaLightHelper(light1_3);
            this.scene_.add(helper1_1)
            this.scene_.add(helper1_2)
            this.scene_.add(helper1_3)

            const color2 = 0xFF6600;
            const intensity2 = 5;
            const width2 = 30;
            const height2 = 10;
            const light2 = new THREE.RectAreaLight(color2, intensity2, width2, height2);
            light2.position.set(-20, 55, 20);
            light2.rotation.x = THREE.MathUtils.degToRad(180);
            light2.rotation.y = THREE.MathUtils.degToRad(-90);
            this.scene_.add(light2);
            const helper2 = new RectAreaLightHelper(light2);
            this.scene_.add(helper2)

            const color3 = 0x0033FF;
            const intensity3 = 5;
            const width3 = 25;
            const height3 = 8;
            const light3 = new THREE.RectAreaLight(color3, intensity3, width3, height3);
            light3.position.set(4, 50, -2);
            light3.rotation.x = THREE.MathUtils.degToRad(90);
            light3.rotation.y = THREE.MathUtils.degToRad(-90);
            this.scene_.add(light3);
            const helper3 = new RectAreaLightHelper(light3);
            this.scene_.add(helper3)


        }



    }


    return {
        item1: item1,
    };
})();