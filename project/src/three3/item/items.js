import * as THREE from '../../../three/build/three.module.js';


import {
    Bus,
}
from './car/Bus.js';
import {
    YellowTruck,
}
from './car/YelloTruck.js';
import {
    Truck,
}
from './car/Truck.js';

import {
    Purple,
}
from './car/Purple.js';

import {
    Orange,
}
from './car/Orange.js';
import {
    Blue,
}
from './car/Blue.js';

import {
    item7,
} from './item7.js';

import {
    SpaceShip
} from "./car/SpaceShip.js";

import {
    Bench
} from "./cafe/Bench.js";

import {
    Chair
} from "./cafe/Chair.js";

import {
    Chair2
} from "./cafe/Chair2.js";

import {
    ToyMarket
}
from './toymarket/ToymarketBuilding.js';

import {
    Person
} from "./person/Person.js";
import {
    Cafe,
}
from './cafe/Cafe.js';
import {
    item1_3,
}
from './item1_3.js';
import {
    Pavilion,
}
from './plaza/Pavilion.js';

import {
    Plant,
}
from './plaza/Plant.js';

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

            this.Bus = new Bus.Bus({
                scene: this.scene_,
                objects: this.objects_
            });

            this.YellowTruck = new YellowTruck.YellowTruck({
                scene: this.scene_,
                objects: this.objects_
            });

            this.Truck = new Truck.Truck({
                scene: this.scene_,
                objects: this.objects_
            });

            this.Purple = new Purple.Purple({
                scene: this.scene_,
                objects: this.objects_
            });

            this.Orange = new Orange.Orange({
                scene: this.scene_,
                objects: this.objects_
            });

            this.Blue = new Blue.Blue({
                scene: this.scene_,
                objects: this.objects_
            });

            this.item7 = new item7.item7({
                scene: this.scene_,
                objects: this.objects_
            });

            this.SpaceShip = new SpaceShip.SpaceShip({
                scene: this.scene_,
                objects: this.objects_
            });

            this.Bench = new Bench.Bench({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(20, 3, -70)
            });

            this.Bench2 = new Bench.Bench({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(-20, 3, -70)
            });

            this.ToyMarket = new ToyMarket.ToyMarket({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(104, -1, -113)
            })

            this.Plant = new Plant.Plant({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(-70, 0, 65)
            })

            this.Plant2 = new Plant.Plant({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(70, 0, 65)
            })

            this.Pavilion = new Pavilion.Pavilion({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(0, 0, 120)
            })

            this.Person = new Person.Person({
                scene: this.scene_,
                objects: this.objects_,
                position: new THREE.Vector3(100, 0, 120)
            })

            // this.Chair = new Chair.Chair({
            //     scene: this.scene_,
            //     objects: this.objects_
            // });

            // this.Chair2 = new Chair2.Chair2({
            //     scene: this.scene_,
            //     objects: this.objects_
            // });


            const Geo = new THREE.BoxGeometry(10, 10, 10);
            const Mat = new THREE.MeshPhongMaterial({
                color: 0XFFDD20,
            });
            this.rotationbox = new THREE.Mesh(Geo, Mat);
            this.oneClick = false;


            this.Cafe = new Cafe.Cafe({
                scene: this.scene_,
                objects: this.objects_,

            });

            this.InitInput_();
        }
        InitInput_() {


            document.addEventListener("keydown", (e) => this.OnKeyDown_(e), false);
            document.addEventListener("keyup", (e) => this.OnKeyUp_(e), false);
            document.addEventListener("pointermove", (e) => this.onDocumentMouseMove_(e), false);
            document.addEventListener("pointerdown", (e) => this.onDocumentMouseDown_(e), false);
            document.addEventListener("pointerup", (e) => this.onDocumentMouseUp_(e), false);
            this.active_ = document.getElementsByClassName("click")[0];
            this.title_ = document.getElementsByClassName("title")[0];
            let exit = document.getElementsByClassName("exit")[0];
            exit.addEventListener("click", () => this.onClickExit_(), false);
            this.hoverNotice_ = document.getElementsByClassName("hoverNotice")[0];
            this.btnBox = document.getElementsByClassName("btnBox2")[0]
            this.btnBox.classList.add("active")

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
            event.preventDefault();
            this.mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);

            this.raycaster.setFromCamera(this.mouse, this.camera_);
            const intersects = this.raycaster.intersectObjects(this.objects_, true);

            if (intersects.length > 0) {
                if (!this.oneClick) {
                    this.hoverNotice_.classList.add("active")
                } else {
                    console.log("click")
                }
            } else {
                this.hoverNotice_.classList.remove("active")
            }

            // oneclick이 종료가 되면 active 될 수 있게
        }

        onDocumentMouseDown_(event) {
            event.preventDefault();

            this.mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);

            this.raycaster.setFromCamera(this.mouse, this.camera_);

            const intersects = this.raycaster.intersectObjects(this.objects_, true);


            if (intersects.length > 0) {
                if (!this.oneClick && intersects[0].object) { //한번만 클릭
                    this.oneClick = true; // 클릭 되었을 때
                    this.hoverNotice_.classList.remove("active")
                    this.cameraP = intersects[0].object;
                    this.num = 1;
                    this.center = intersects[0].object;
                    this.btnBox.classList.remove("active")
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
                    this.cameraP.position.y += 70;
                    this.position = new THREE.Vector3().copy(this.cameraP.position);
                }
            }

        }

        onDocumentMouseUp_(event) {}

        onClickExit_() {
            this.active_.classList.remove("active");
            this.btnBox.classList.add("active")
            if (this.cameraP) {
                this.cameraP.quaternion.copy(this.rotationbox.quaternion)
                if (this.oneClick) {
                    this.cameraP.position.y -= 70;
                    this.oneClick = false;
                }
                //this.cameraP.rotation.y = -Math.PI / 2;
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