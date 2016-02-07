/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="gameobject.ts"/>

module objects {
    export class planet extends objects.gameObject {
        //PRIVATE INSTANCE VARIABLES +++++++++++++++++++++++++++++++++++++
        private _rotationSpeed: number;
        private _distance: number;
        private _rotation: number;
        
        private _position:Vector3;
        
        //CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(geometry: THREE.Geometry, material: THREE.Material, x:number, y:number, z:number, rotationSpeed:number, distance:number, parentPosition:Vector3) {
            super(geometry, material, x, y, z);
            this._rotationSpeed = rotationSpeed;
            this._distance = distance;
            this._rotation = 0;
            this._position = parentPosition;
            
        }
        
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++++++++++++
        public update(): void {
            this.rotation.x += 0.025;
            this.rotation.y += 0.025;
            // this.rotation.z += 0.025;
                        
            this._rotation += this._rotationSpeed;
            var xPos = Math.cos(this._rotation);
            var zPos = Math.sin(this._rotation);
            
            this.position.set((this._position.x + xPos * this._distance), 0, (this._position.z + zPos * this._distance));

        }
    }
}