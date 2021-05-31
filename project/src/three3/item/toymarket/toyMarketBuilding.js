import * as THREE from '../../../../three/build/three.module.js';
import {
    FBXLoader
} from "../../../../three/examples/jsm/loaders/FBXLoader.js"
import {
    TGALoader
} from '../../../../three/examples/jsm/loaders/TGALoader.js';

import {
    LoadingManager
} from "../../../../../three/src/loaders/LoadingManager.js"

export const ToyMarket = (() => {

    let i = 0;
    class ToyMarket {
        constructor(params) {
            let {
                scene,
                objects,
                position,
            } = params;
            this.scene_ = scene;
            this.objects_ = objects;
            this.position_ = position;
            this.LoadModel_();
        }

        LoadModel_() {
            const manager = new LoadingManager();
            manager.addHandler(/\.tga$/i, new TGALoader());

            const loader = new FBXLoader(manager);
            loader.setPath('./src/three/fbx/building/');
            loader.load('Toymarket.fbx', (fbx) => {
                fbx.scale.setScalar(0.7);
                fbx.traverse(c => {
                    c.castShadow = true;
                });
                fbx.rotation.y = Math.PI / 2;
                fbx.position.copy(this.position_);
                this.scene_.add(fbx);
            });

            const color = 0xFFFFFF;
            const intensity = 0.5;

            const light = new THREE.SpotLight(color, intensity, 100, Math.PI / 5);
            this.scene_.add(light);
            this.scene_.add(light.target);
            light.position.set(100, 80, -30);
            light.target.position.set(100, 0, -90);
        }


        /* animation */
        Update(timeElapsed) { // 회전 시키기 `
        }
    }



    return {
        ToyMarket: ToyMarket,
    };
})();