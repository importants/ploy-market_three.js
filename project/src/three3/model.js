import * as THREE from '../../three/build/three.module.js';

export const model = (() => {

    let i = 0;
    class model {
        constructor(params) {
            let {
                scene,
                camera,
            } = params;
            this.scene_ = scene;
            this.camera_ = camera;
            this._deccelerationz = new THREE.Vector3(-0.0005, -0.0001, -5.0);
            this._accelerationz = new THREE.Vector3(1, 0.25, 50.0);
            this._deccelerationx = new THREE.Vector3(-5.0, -0.0001, -0.0005);
            this._accelerationx = new THREE.Vector3(50.0, 0.25, 1);
            this._velocity = new THREE.Vector3(0, 0, 0);
            this._position = new THREE.Vector3();

            this.LoadModel_();
            this.InitInput_();
        }

        LoadModel_() {

            const charGeo = new THREE.BoxGeometry(5, 5, 5);
            const charMat = new THREE.MeshPhongMaterial({
                visible: false
            });
            const char = new THREE.Mesh(charGeo, charMat);
            char.position.set(20, 0, 20)
            this.scene_.add(char);
            char.position.y = 10;
            this.char = char;

        }

        InitInput_() {
            document.addEventListener("keydown", (e) => this.OnKeyDown_(e), false);
            document.addEventListener("keyup", (e) => this.OnKeyUp_(e), false);
            this._keys = {
                forward: false,
                backward: false,
                left: false,
                right: false,
            };
        }

        OnKeyDown_(event) {
            switch (event.keyCode) {
                case 38:
                    console.log("up")
                    this._keys.forward = true;
                    break;
                case 37:
                    console.log("left")
                    this._keys.left = true;
                    break;
                case 39:
                    console.log("right")
                    this._keys.right = true;
                    break;
                case 40:
                    this._keys.backward = true;
                    break;
            }
        }

        OnKeyUp_(event) {
            switch (event.keyCode) {
                case 38:
                    console.log("up")
                    this._keys.forward = false;
                    break;
                case 37:
                    console.log("left")
                    this._keys.left = false;
                    break;
                case 39:
                    console.log("right")
                    this._keys.right = false;
                    break;
                case 40:
                    console.log("down")
                    this._keys.backward = false;
                    break;
            }
        }

        /* animation */
        Update(Xposition, yH) {
            const timeElapsedS = 0.05;
            const velocityz = this._velocity;
            const velocityx = this._velocity;
            const frameDeccelerationz = new THREE.Vector3(
                velocityz.x * this._deccelerationz.x,
                velocityz.y * this._deccelerationz.y,
                velocityz.z * this._deccelerationz.z
            );
            const frameDeccelerationx = new THREE.Vector3(
                velocityx.x * this._deccelerationx.x,
                velocityx.y * this._deccelerationx.y,
                velocityx.z * this._deccelerationx.z
            );
            frameDeccelerationz.multiplyScalar(timeElapsedS);
            frameDeccelerationz.z =
                Math.sign(frameDeccelerationz.z) *
                Math.min(Math.abs(frameDeccelerationz.z), Math.abs(velocityz.z));
            frameDeccelerationx.multiplyScalar(timeElapsedS);
            frameDeccelerationx.x =
                Math.sign(frameDeccelerationx.x) *
                Math.min(Math.abs(frameDeccelerationx.x), Math.abs(velocityx.x));
            velocityz.add(frameDeccelerationz);
            velocityx.add(frameDeccelerationx);

            const controlObject = this.char;
            const _Q = new THREE.Quaternion();
            const _A = new THREE.Vector3();
            const _R = controlObject.quaternion.clone();

            const accz = this._accelerationz.clone();
            const accx = this._accelerationx.clone();


            if (this._keys.forward) {

                velocityz.z += accz.z * timeElapsedS;
            }
            if (this._keys.backward) {
                velocityz.z -= accz.z * timeElapsedS;
            }
            if (this._keys.left) {
                velocityx.x -= accx.x * timeElapsedS;
            }
            if (this._keys.right) {
                velocityx.x += accx.x * timeElapsedS;
            }
            // if (this._keys.left) {
            //     _A.set(0, 1, 0);
            //     _Q.setFromAxisAngle(
            //         _A,
            //         0.5 * Math.PI * timeElapsedS * this._acceleration.y
            //     );
            //     _R.multiply(_Q);
            // }
            // if (this._keys.right) {
            //     _A.set(0, 1, 0);
            //     _Q.setFromAxisAngle(
            //         _A,
            //         0.5 * -Math.PI * timeElapsedS * this._acceleration.y
            //     );
            //     _R.multiply(_Q);
            // }

            controlObject.quaternion.copy(_R);

            const oldPosition = new THREE.Vector3();
            oldPosition.copy(controlObject.position);

            const forward = new THREE.Vector3(-1, 0, -1);
            forward.applyQuaternion(controlObject.quaternion);
            forward.normalize();

            // const forward = new THREE.Vector3(0, 0, 1);
            // forward.applyQuaternion(controlObject.quaternion);
            // forward.normalize();
            // const forward = new THREE.Vector3(0, 0, 1);
            // forward.applyQuaternion(controlObject.quaternion);
            // forward.normalize();
            // const forward = new THREE.Vector3(0, 0, 1);
            // forward.applyQuaternion(controlObject.quaternion);
            // forward.normalize();

            const sideways = new THREE.Vector3(1, 0, -1);
            sideways.applyQuaternion(controlObject.quaternion);
            sideways.normalize();

            sideways.multiplyScalar(velocityx.x * timeElapsedS);
            forward.multiplyScalar(velocityz.z * timeElapsedS);

            controlObject.position.add(forward);
            controlObject.position.add(sideways);

            this._position.copy(controlObject.position);

            if (controlObject.position.x < -80) {
                console.log("warning")
                controlObject.position.x = -79.9
            } else if (controlObject.position.x > 80) {
                console.log("warning")
                controlObject.position.x = 79.9
            }
            if (controlObject.position.z < -110) {
                console.log("warning")
                controlObject.position.z = -109.9
            } else if (controlObject.position.z > 110) {
                console.log("warning")
                controlObject.position.z = 109.9
            }

            if (Xposition) {
                let box = new THREE.Vector3().copy(Xposition)
                box.y = yH;
                this.camera_.position.copy(Xposition) /*copy(this.char.position)*/ ;
                this.camera_.position.y = 70;
                this.camera_.position.x += 60;
                this.camera_.position.z += 60;
                this.camera_.lookAt(box);
                //console.log(Xposition)
            } else {
                this.camera_.position.copy(this.char.position) /*copy(this.char.position)*/ ;
                // this.camera_.position.y = 130;
                // this.camera_.position.x += 60;
                // this.camera_.position.z += 60;
                this.camera_.position.y = 110;
                this.camera_.position.x += 100;
                this.camera_.position.z += 100;
                this.camera_.lookAt(this.char.position);

            }


        }
    }



    return {
        model: model,
    };
})();