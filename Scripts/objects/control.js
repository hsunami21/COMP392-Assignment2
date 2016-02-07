/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeedX, rotationSpeedY, rotationSpeedZ, planeWidth, planeHeight) {
            this.rotationSpeedX = rotationSpeedX;
            this.rotationSpeedY = rotationSpeedY;
            this.rotationSpeedZ = rotationSpeedZ;
            this.numberOfObjects = scene.children.length;
            this._planeWidth = planeWidth;
            this._planeHeight = planeHeight;
        }
        //PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++
        // Change camera view
        Control.prototype.zoomPlanet1 = function () {
            for (var i = 0; i < zoom.length; i++) {
                zoom[i] = false;
            }
            this.zoomIn(0);
            zoom[0] = true;
        };
        Control.prototype.zoomPlanet2 = function () {
            for (var i = 0; i < zoom.length; i++) {
                zoom[i] = false;
            }
            this.zoomIn(1);
            zoom[1] = true;
        };
        Control.prototype.zoomPlanet3 = function () {
            for (var i = 0; i < zoom.length; i++) {
                zoom[i] = false;
            }
            this.zoomIn(2);
            zoom[2] = true;
        };
        Control.prototype.zoomPlanet4 = function () {
            for (var i = 0; i < zoom.length; i++) {
                zoom[i] = false;
            }
            this.zoomIn(3);
            zoom[3] = true;
        };
        Control.prototype.zoomPlanet5 = function () {
            for (var i = 0; i < zoom.length; i++) {
                zoom[i] = false;
            }
            this.zoomIn(4);
            zoom[4] = true;
        };
        Control.prototype.zoomIn = function (num) {
            camera.position.set(planets[num].position.x - 25, planets[num].position.y + 25, planets[num].position.z + 25);
            camera.lookAt(planets[num].position);
        };
        Control.prototype.zoomOut = function () {
            camera.position.set(-110, 110, 110);
            camera.lookAt(scene.position);
            for (var i = 0; i < zoom.length; i++) {
                zoom[i] = false;
            }
        };
        // show scene objects
        Control.prototype.outputObjects = function () {
            console.log(scene.children);
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map