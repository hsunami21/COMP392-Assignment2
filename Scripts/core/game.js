/// <reference path="_reference.ts"/>
/*
    Source name: SolarSystem
    Author: Wendall Hsu 300739743
    Last Modified By: Wendall Hsu
    Date Last Modified: February 6, 2016
    Program Description: Creation of a solar system using THREEJS and TypeScript
    Revision History:
        Commit #1: Added sun and rotating planets
        Commit #2: Added 5th planet and moved objects to fit on screen
        Commit #3: Reset sun and planet positions and added zoom control

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
var zoom;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    // Add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x0c0c0c);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    // add controls
    gui = new GUI();
    control = new Control(0.01, 0.01, 0.01, 60, 40);
    addControl(control);
    console.log("Added Control to scene...");
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    // Sun
    sun = new gameObject(new THREE.SphereGeometry(6, 32, 32), new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('../../Assets/Images/sun.jpg') }), 0, 0, 0);
    scene.add(sun);
    var sunLight = new THREE.PointLight(0xffffff, 2, 100);
    sun.add(sunLight);
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-15, 10, 15);
    // spotLight.target.position.set(25, 0, -25);
    // console.log(spotLight.target.position);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    planets = new Array();
    // Planets
    planets.push(new objects.planet(new THREE.SphereGeometry(2, 32, 32), new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('../../Assets/Images/p1.png') }), 0, 0, 0, -0.05, 15, sun.position));
    planets.push(new objects.planet(new THREE.SphereGeometry(4, 32, 32), new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('../../Assets/Images/p2.jpeg') }), 0, 0, 0, 0.025, 30, sun.position));
    planets.push(new objects.planet(new THREE.SphereGeometry(2, 32, 32), new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('../../Assets/Images/p3.jpeg') }), 0, 0, 0, 0.01, 45, sun.position));
    planets.push(new objects.planet(new THREE.SphereGeometry(3, 32, 32), new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('../../Assets/Images/p4.jpg') }), 0, 0, 0, -0.0075, 60, sun.position));
    planets.push(new objects.planet(new THREE.SphereGeometry(2.5, 32, 32), new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('../../Assets/Images/p5.jpg') }), 0, 0, 0, 0.005, 70, sun.position));
    planets.push(new objects.planet(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture('../../Assets/Images/moon.jpeg') }), 0, 0, 0, -0.025, 5, planets[1].position));
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
    gui.add(controlObject, "zoomIn");
    gui.add(controlObject, "zoomOut");
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
    sun.rotation.x += 0.01;
    sun.rotation.y += 0.01;
    // Update all planet positions
    for (var i = 0; i < planets.length; i++) {
        planets[i].update();
    }
    // Follow planet with moon when zoomed in
    if (zoom) {
        control.zoomIn();
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
    camera.position.x = -100;
    camera.position.y = 100;
    camera.position.z = 100;
    camera.lookAt(scene.position);
    zoom = false;
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map