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

export const Purple = (() => {

    let i = 0;
    class Purple {
        constructor(params) {
            let {
                scene,
                objects
            } = params;
            this.scene_ = scene;
            this.objects_ = objects;
            this.LoadModel_();
        }

        LoadModel_() {
            const manager = new LoadingManager();
            manager.addHandler(/\.tga$/i, new TGALoader());

            const loader = new FBXLoader(manager);
            loader.setPath('./src/three/fbx/');
            loader.load('4.fbx', (fbx) => {
                fbx.scale.setScalar(1.5);
                fbx.traverse(c => {
                    c.castShadow = true;
                });
                // fbx.rotation.y = -Math.PI / 2;
                fbx.position.x = -90;
                fbx.position.z = 23;
                fbx.position.y = 2;

                this.objects_.push(fbx);
                this.scene_.add(fbx);
                fbx.name = "Purple_Car"
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
        Purple: Purple,
    };
})();