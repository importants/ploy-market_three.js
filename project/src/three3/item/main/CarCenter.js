import * as THREE from '../../../../three/build/three.module.js';
import {
    FBXLoader
} from "../../../../three/examples/jsm/loaders/FBXLoader.js"
import {
    TGALoader
} from '../../../../three/examples/jsm/loaders/TGALoader.js';

import {
    LoadingManager
} from "../../../../three/src/loaders/LoadingManager.js"
import {
    RectAreaLightUniformsLib
} from "../../../../three/examples/jsm/lights/RectAreaLightUniformsLib.js"
import {
    RectAreaLightHelper
} from "../../../../three/examples/jsm/helpers/RectAreaLightHelper.js"
export const CarCenter = (() => {

    let i = 0;
    class CarCenter {
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
            loader.load('building.fbx', (fbx) => {
                fbx.scale.setScalar(0.5);
                fbx.traverse(c => {
                    c.castShadow = true;
                });
                fbx.rotation.y = -Math.PI / 2;
                fbx.position.x -= 95;
                fbx.position.z -= 95;
                this.scene_.add(fbx);
            });

            RectAreaLightUniformsLib.init();

            const color = 0xff0000;
            const intensity = 5;
            const width = 8;
            const height = 15;
            const light = new THREE.RectAreaLight(color, intensity, width, height);
            light.position.set(-115, 10, -75);
            light.rotation.x = THREE.MathUtils.degToRad(180);
            light.rotation.y = THREE.MathUtils.degToRad(-90);
            this.scene_.add(light);
            const helper = new RectAreaLightHelper(light);
            light.add(helper);
            this.scene_.add(helper)

            const color1 = 0x00ffff;
            const light1_1 = new THREE.RectAreaLight(color1, intensity, width, height);
            light1_1.position.set(-55, 10, -115);
            light1_1.rotation.x = THREE.MathUtils.degToRad(180);
            this.scene_.add(light1_1);
            const helper1_1 = new RectAreaLightHelper(light1_1);
            this.scene_.add(helper1_1)



        }



    }


    return {
        CarCenter: CarCenter,
    };
})();