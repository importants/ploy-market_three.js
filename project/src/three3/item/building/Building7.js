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

export const Building7 = (() => {

    let i = 0;
    class Building7 {
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
            loader.load('building7.fbx', (fbx) => {
                fbx.scale.setScalar(0.05);
                fbx.traverse(c => {
                    c.castShadow = true;
                    c.receiveShadow = true;
                });
                fbx.rotation.y = Math.PI / 2;
                fbx.position.copy(this.position_);
                this.scene_.add(fbx);
            });

        }


        /* animation */
        Update(timeElapsed) { // 회전 시키기 `
            // if (this.keys_.space && this.position_.y == 0.0) {
            //     this.velocity_ = 30;
            // }

            // const acceleration = -60 * timeElapsed;

            // this.position_.y += timeElapsed * (this.velocity_ + acceleration * 0.5);
            // this.position_.y = Math.max(this.position_.y, 0.0);

            // this.velocity_ += acceleration;
            // this.velocity_ = Math.max(this.velocity_, -100);

            // if (this.mesh_) {
            //     this.mesh_.position.copy(this.position_);
            // }
        }
    }



    return {
        Building7: Building7,
    };
})();