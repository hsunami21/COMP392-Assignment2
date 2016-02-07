/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="gameobject.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var planet = (function (_super) {
        __extends(planet, _super);
        //CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        function planet(geometry, material, x, y, z, rotationSpeed, distance, parentPosition) {
            _super.call(this, geometry, material, x, y, z);
            this._rotationSpeed = rotationSpeed;
            this._distance = distance;
            this._rotation = 0;
            this._position = parentPosition;
        }
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++++++++++++
        planet.prototype.update = function () {
            this.rotation.x += 0.025;
            this.rotation.y += 0.025;
            // this.rotation.z += 0.025;
            this._rotation += this._rotationSpeed;
            var xPos = Math.cos(this._rotation);
            var zPos = Math.sin(this._rotation);
            this.position.set((this._position.x + xPos * this._distance), 0, (this._position.z + zPos * this._distance));
        };
        return planet;
    })(objects.gameObject);
    objects.planet = planet;
})(objects || (objects = {}));
//# sourceMappingURL=planet.js.map