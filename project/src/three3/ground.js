import * as THREE from '../../three/build/three.module.js';

export const ground = (() => {

    let i = 0;
    class ground {
        constructor(params) {
            let {
                scene,


            } = params;
            this.scene_ = scene;
            // new THREE.Vector3(10, 10, 10);
            this.velocity_ = 0.0;

            this.LoadModel_();

        }

        LoadModel_() {
            const groundGeo = new THREE.BoxGeometry(300, 300, 4);
            const groundMat = new THREE.MeshPhongMaterial({
                color: 0xdddddd,
            });
            const ground = new THREE.Mesh(groundGeo, groundMat);
            this.scene_.add(ground);
            ground.rotation.x = Math.PI / -2;
            ground.position.y = -2;
            ground.receiveShadow = true;
            this.ground_ = ground;
            this.ground_.name = "floor";

            const leftGeo = new THREE.BoxGeometry(300, 50, 4);
            const leftMat = new THREE.MeshPhongMaterial({
                color: 0xdddddd,
            });
            const left = new THREE.Mesh(leftGeo, leftMat);
            this.scene_.add(left);
            //left.rotation.x = Math.PI / -2;
            left.position.y = 21;
            left.position.z = -150;
            left.receiveShadow = true;
            this.left_ = left;
            this.left_.name = "left";

            const rightGeo = new THREE.BoxGeometry(300, 50, 4);
            const rightMat = new THREE.MeshPhongMaterial({
                color: 0xdddddd,
            });
            const right = new THREE.Mesh(rightGeo, rightMat);
            this.scene_.add(right);
            right.rotation.y = Math.PI / -2;
            right.position.y = 21;
            right.position.x = -150;
            right.receiveShadow = true;
            this.right_ = right;
            this.right_.name = "right";


            const pointLight1 = new THREE.SpotLight(0xffffff, 1, 60, 6, 0);
            pointLight1.position.set(-60, 60, 0);
            this.scene_.add(pointLight1);
            this.scene_.add(pointLight1.target);
            pointLight1.target.position.set(-70, 0, 0)

            const pointLight2 = new THREE.SpotLight(0xffffff, 1, 60, 6, 0);
            pointLight2.position.set(-60, 60, -60);
            this.scene_.add(pointLight2);
            this.scene_.add(pointLight2.target);
            pointLight2.target.position.set(-70, 0, -60)

            const pointLight3 = new THREE.SpotLight(0xffffff, 1, 60, 6, 0);
            pointLight3.position.set(-60, 60, 60);
            this.scene_.add(pointLight3);
            this.scene_.add(pointLight3.target);
            pointLight3.target.position.set(-70, 0, 60)

            const pointLight4 = new THREE.SpotLight(0xffffff, 1, 60, 6, 0);
            pointLight4.position.set(-30, 60, -80);
            this.scene_.add(pointLight4);
            this.scene_.add(pointLight4.target);
            pointLight4.target.position.set(-30, 0, -90)

            const pointLight5 = new THREE.SpotLight(0xffffff, 1, 60, 6, 0);
            pointLight5.position.set(30, 60, -80);
            this.scene_.add(pointLight5);
            this.scene_.add(pointLight5.target);
            pointLight5.target.position.set(30, 0, -90)


        }


        random_color() {
            // 위치 변경 함수
            let color = [0xAEDE24, 0xB0E712, 0xC6F04D];
            let min = Math.ceil(0);
            let max = Math.floor(2);
            return color[Math.floor(Math.random() * (max - min)) + min];
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
        ground: ground,
    };
})();