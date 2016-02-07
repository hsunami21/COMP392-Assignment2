/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        // PRIVATE INSTANCE VARIABLES
        private _planeWidth: number;
        private _planeHeight: number;
        
        // PUBLIC INSTANCE VARIABLES
        public rotationSpeedX: number;
        public rotationSpeedY: number;
        public rotationSpeedZ: number;
        public numberOfObjects: number;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotationSpeedX: number, rotationSpeedY: number, rotationSpeedZ: number, planeWidth: number, planeHeight: number) {
            this.rotationSpeedX = rotationSpeedX;
            this.rotationSpeedY = rotationSpeedY;
            this.rotationSpeedZ = rotationSpeedZ;
            this.numberOfObjects = scene.children.length;
            this._planeWidth = planeWidth;
            this._planeHeight = planeHeight;
        }


        //PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++
        
        // Change camera view
        public zoomPlanet1(): void {
            for (var i = 0; i < zoom.length; i++) {
                zoom[i] = false;
            }
            this.zoomIn(0);
            zoom[0] = true;

        }
        
        public zoomPlanet2(): void {
            for (var i = 0; i < zoom.length; i++) {
                zoom[i] = false;
            }
            this.zoomIn(1);
            zoom[1] = true;
        }
        
        public zoomPlanet3(): void {
            for (var i = 0; i < zoom.length; i++) {
                zoom[i] = false;
            }
            this.zoomIn(2);
            zoom[2] = true;
        }
        
        public zoomPlanet4(): void {
            for (var i = 0; i < zoom.length; i++) {
                zoom[i] = false;
            }
            this.zoomIn(3);
            zoom[3] = true;
        }
        
        public zoomPlanet5(): void {
            for (var i = 0; i < zoom.length; i++) {
                zoom[i] = false;
            }
            this.zoomIn(4);
            zoom[4] = true;
        }
        
        public zoomIn(num: number): void {
            camera.position.set(planets[num].position.x - 25, planets[num].position.y + 25, planets[num].position.z + 25);
            camera.lookAt(planets[num].position);
        }
        
        public zoomOut(): void {
            camera.position.set(-110, 110, 110);
            camera.lookAt(scene.position);
            for (var i = 0; i < zoom.length; i++) {
                zoom[i] = false;   
            } 
        }
        
        // show scene objects
        public outputObjects(): void {
            console.log(scene.children);
        }
    }
}
