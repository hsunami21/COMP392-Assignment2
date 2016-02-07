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
        public zoomIn(): void {
            camera.position.set(planets[1].position.x + 30, planets[1].position.y + 30, planets[1].position.z + 30);
            camera.lookAt(planets[1].position);
            zoom = true;
        }
        
        public zoomOut(): void {
            camera.position.set(-100, 100, 100);
            camera.lookAt(scene.position); 
            zoom = false;   
        }
        
        // show scene objects
        public outputObjects(): void {
            console.log(scene.children);
        }
    }
}
