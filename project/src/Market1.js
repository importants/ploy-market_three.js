import * as THREE from '../three/build/three.module.js';
import {
    MarketPlace1
} from "./three3/item/market1/MarketPlace1.js";


export const Market1 = (() => {

    let i = 0;
    class Market1 {
        constructor(params) {
            let {
                scene,
                objects,
                camera
            } = params;
            this.scene_ = scene;
            this.camera_ = camera;
            this.objects_ = objects;
            this.velocity_ = 0.0;
            this.LoadModel_();
        }
        LoadModel_() {
            /*right*/
            this.Market = new MarketPlace1.MarketPlace1({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(2500, 0, -2500)
            });

            // const listener = new THREE.AudioListener();
            // this.camera_.add(listener);
            // const audioLoader = new THREE.AudioLoader();
            // const sound = new THREE.PositionalAudio(listener);
            // audioLoader.load('./src/sounds/traffic.mp3', function (buffer) {
            //     sound.setBuffer(buffer);
            //     sound.setRefDistance(40);
            //     sound.play();
            // });



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
        Market1: Market1,
    };
})();