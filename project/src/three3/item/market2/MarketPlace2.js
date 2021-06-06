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

export const MarketPlace2 = (() => {

    let i = 0;
    class MarketPlace2 {
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
            loader.setPath('./src/three/fbx/market2/');
            loader.load('market2.fbx', (fbx) => {
                fbx.scale.setScalar(0.005);
                fbx.traverse(c => {
                    c.castShadow = true;
                    c.receiveShadow = true;
                });
                //fbx.rotation.y = Math.PI / 2;
                fbx.position.copy(this.position_);
                fbx.position.y -= 50;
                this.scene_.add(fbx);
            });

        }


        /* animation */
        Update(timeElapsed) { // 회전 시키기 `
        }
    }



    return {
        MarketPlace2: MarketPlace2,
    };
})();