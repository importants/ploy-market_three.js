import * as THREE from '../../../three/build/three.module.js';
import {
    item1,
}
from './item1.js';
import {
    item2,
}
from './item2.js';
import {
    item3,
}
from './item3.js';

import {
    item4,
}
from './item4.js';

import {
    item5,
}
from './item5.js';
import {
    item6,
}
from './item6.js';

export const items = (() => {

    let i = 0;
    class items {
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
            this.center = null;
            this.num = 0;
            this.LoadModel_();

        }

        LoadModel_() {
            this.item1 = new item1.item1({
                scene: this.scene_,
                objects: this.objects_
            });

            this.item2 = new item2.item2({
                scene: this.scene_,
                objects: this.objects_
            });

            this.item3 = new item3.item3({
                scene: this.scene_,
                objects: this.objects_
            });

            this.item4 = new item4.item4({
                scene: this.scene_,
                objects: this.objects_
            });

            this.item5 = new item5.item5({
                scene: this.scene_,
                objects: this.objects_
            });

            this.item6 = new item6.item6({
                scene: this.scene_,
                objects: this.objects_
            });

            this.InitInput_();
        }
        InitInput_() {


            document.addEventListener("keydown", (e) => this.OnKeyDown_(e), false);
            document.addEventListener("keyup", (e) => this.OnKeyUp_(e), false);
            document.addEventListener("pointermove", (e) => this.onDocumentMouseMove_(e), false);
            document.addEventListener("pointerdown", (e) => this.onDocumentMouseDown_(e), false);
            document.addEventListener("pointerup", (e) => this.onDocumentMouseUp_(e), false);
            let active = document.getElementsByClassName("click")[0];
            this.active_ = active;
            let title = document.getElementsByClassName("title")[0];
            this.title_ = title;
            let exit = document.getElementsByClassName("exit")[0];
            exit.addEventListener("click", () => this.onClickExit_(), false);
        }


        OnKeyDown_(event) {
            switch (event.keyCode) {
                case 49:
                    break;
                case 50:
                    break;
            }
        }

        OnKeyUp_(event) {
            switch (event.keyCode) {
                case 65:
                    break;
                case 68:
                    break;
            }
        }

        onDocumentMouseMove_(event) {
            // event.preventDefault();
            // this.mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);

            // this.raycaster.setFromCamera(this.mouse, this.camera_);

            // const intersects = this.raycaster.intersectObjects(this.objects_);
            // if (intersects.length > 0)
            //     console.log(intersects[0].object.name)
        }

        onDocumentMouseDown_(event) {
            event.preventDefault();
            this.mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);

            this.raycaster.setFromCamera(this.mouse, this.camera_);

            const intersects = this.raycaster.intersectObjects(this.objects_, true);

            if (intersects.length > 0) {

                this.cameraP = intersects[0].object;
                if (this.center != this.cameraP && this.num == 1) {
                    this.center.rotation.y = -Math.PI / 2;
                }
                this.num = 1;
                this.center = intersects[0].object;

                this.active_.classList.add("active");
                if (intersects[0].object.parent.type == "Group") {
                    this.cameraP = intersects[0].object.parent;
                    this.center = intersects[0].object.parent;
                    this.title_.innerHTML = `${intersects[0].object.parent.name}`;
                } else {
                    this.cameraP = intersects[0].object;
                    this.center = intersects[0].object;
                    this.title_.innerHTML = `${intersects[0].object.name}`;
                }
                this.position = new THREE.Vector3().copy(this.cameraP.position);

            }
        }

        onDocumentMouseUp_(event) {}

        onClickExit_() {
            this.active_.classList.remove("active");
            if (this.cameraP) {
                this.cameraP.rotation.y = -Math.PI / 2;
            }

            this.cameraP = null;
        }

        getHeigt() {
            if (this.cameraP) {
                var box = new THREE.Box3().setFromObject(this.cameraP);
                var yH = (box.min.y + box.max.y) / 2;
                return yH;
            }
        }

        /* animation */
        Update(timeElapsed) {
            //if ()
            if (this.cameraP) {
                this.cameraP.rotation.y += 0.01;
                return this.position;
            }
            // 회전 시키기 `
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
            return 0;
        }
    }

    return {
        items: items,
    };
})();