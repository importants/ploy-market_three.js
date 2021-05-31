import * as THREE from '../../../../three/build/three.module.js';
import {
    FBXLoader
} from "../../../../three/examples/jsm/loaders/FBXLoader.js"

export const Plant2 = (() => {

    let i = 0;
    class Plant2 {
        constructor(params) {
            let {
                scene,
                objects,
                position,
                weight
            } = params;
            this.scene_ = scene;
            this.objects_ = objects;
            this.position_ = position;
            this.weight_ = weight;
            this.LoadModel_();
        }

        LoadModel_() {
            // const manager = new LoadingManager();
            // manager.addHandler(/\.tga$/i, new TGALoader()); manager

            const loader = new FBXLoader();
            loader.setPath('./src/three/fbx/plaza/');
            loader.load('plant2.fbx', (fbx) => {
                fbx.traverse(c => {
                    c.castShadow = true;
                });
                this.fbx_ = fbx;
                switch (this.weight_) {
                    case 1:
                        this.fbx_.scale.setScalar(0.5);
                        break;
                    case 2:
                        this.fbx_.scale.setScalar(1);
                        break;
                    case 3:
                        this.fbx_.scale.setScalar(2);
                        break;
                }
                //fbx.rotation.y = Math.PI / 2;
                fbx.position.copy(this.position_);
                this.objects_.push(fbx)
                this.scene_.add(fbx);
                this.fbx = fbx
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
        Plant2: Plant2,
    };
})();