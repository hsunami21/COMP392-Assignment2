/// <reference path="_reference.ts"/>
/*
    Source name: CubeMan
    Author: Wendall Hsu 300739743
    Last Modified By: Wendall Hsu
    Date Last Modified: February 1, 2016
    Program Description: Creation of a humanoid figure using THREEJS and TypeScript
    Revision History:
        Commit #1: Added cube man
        Commit #2: Added rotation along each axis
        Commit #3: Added color changing
        Commit #4: Added textures
        Commit #5: Added reset scene function
        Commit #6: Added plane texture and moved spotlight
        Commit #7: Fixed gitignore file to use on Azure
        Commit #8: Changed body part object types
        Commit #9: Added header information to files
        Commit #10: Fixed reset scene function
        Commit #11: Fixed GUI scroll values
*/
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Mesh = THREE.Mesh;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var cube;
var plane;
var sphere;
var ambientLight;
var spotLight;
var control;
var gui;
var stats;
var step = 0;
var sun;
var planets;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    //scene.fog=new THREE.FogExp2( 0xffffff, 0.015 );
    // scene.fog=new THREE.Fog( 0xffffff, 0.015, 100 );
    // console.log("Added Fog to scene...");
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    //Add a Plane to the Scene
    // plane = new gameObject(
    //     new PlaneGeometry(60, 40, 1, 1),
    //     new LambertMaterial({ map:  THREE.ImageUtils.loadTexture('../../Assets/Images/grass.jpg')}),
    //     0, 0, 0);
    // plane.rotation.x = -0.5 * Math.PI;
    // scene.add(plane);
    // console.log("Added Plane Primitive to scene...");
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x0c0c0c);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-10, 10, 10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    // add controls
    gui = new GUI();
    control = new Control(0.01, 0.01, 0.01, 60, 40);
    addControl(control);
    console.log("Added Control to scene...");
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    // Sun
    sun = new gameObject(new THREE.SphereGeometry(4, 32, 32), new THREE.MeshLambertMaterial({ color: 0xffff00 }), 0, 0, 0);
    scene.add(sun);
    var pointLight = new THREE.PointLight(0xffffff, 1, 100);
    sun.add(pointLight);
    planets = new Array();
    // Planets
    planets.push(new objects.planet(new THREE.SphereGeometry(2, 32, 32), new THREE.MeshLambertMaterial({ color: 0xff0000 }), 0, 0, 0, 0.025, 30, sun.position));
    planets.push(new objects.planet(new THREE.SphereGeometry(2, 32, 32), new THREE.MeshLambertMaterial({ color: 0x00ff00 }), 0, 0, 0, 0.05, 15, sun.position));
    planets.push(new objects.planet(new THREE.SphereGeometry(2, 32, 32), new THREE.MeshLambertMaterial({ color: 0x0000ff }), 0, 0, 0, 0.01, 45, sun.position));
    planets.push(new objects.planet(new THREE.SphereGeometry(2, 32, 32), new THREE.MeshLambertMaterial({ color: 0xffffff }), 0, 0, 0, 0.005, 55, sun.position));
    for (var i = 0; i < planets.length; i++) {
        scene.add(planets[i]);
        console.log("Added planet " + i);
    }
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
}
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
// Setup main game loop
function gameLoop() {
    stats.update();
    // // rotate the cubes around its axes
    // scene.traverse(function(threeObject:THREE.Mesh) {
    //     if (threeObject == sun) {
    //         // threeObject.rotation.x += control.rotationSpeedX;
    //         threeObject.rotation.y += 0.005;
    //         // threeObject.rotation.z += control.rotationSpeedZ;
    //     }
    // });
    for (var i = 0; i < planets.length; i++) {
        planets[i].update();
    }
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0x1a1a1a, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -80;
    camera.position.y = 90;
    camera.position.z = 80;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map