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

export const MarketPlace1 = (() => {

    let i = 0;
    class MarketPlace1 {
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
            loader.setPath('./src/three/fbx/back/');
            loader.load('building_new.fbx', (fbx) => {
                fbx.scale.setScalar(1);
                fbx.traverse(c => {
                    c.castShadow = true;
                    c.receiveShadow = true;
                });
                fbx.rotation.y = -Math.PI / 2;
                fbx.position.copy(this.position_);
                fbx.position.y -= 200;
                fbx.position.x -= 300;
                fbx.position.z -= 100;
                this.scene_.add(fbx);
            });
            const charGeo = new THREE.BoxGeometry(5, 5, 5);
            const charMat = new THREE.MeshPhongMaterial({
                color: 0xff11ff
            });
            const char = new THREE.Mesh(charGeo, charMat);
            char.position.set(20, 0, 20)
            this.scene_.add(char);
            char.position.copy(this.position_);
            this.char = char;
        }

        /* animation */
        Update(timeElapsed) { // 회전 시키기 `
        }
    }

    return {
        MarketPlace1: MarketPlace1,
    };
})();