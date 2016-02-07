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
        Commit #4: Added a ring structure, additional moons, and zoom to any planet functionality
        Commit #5: Modified moon orbit speeds
*/

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Mesh = THREE.Mesh;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var cube: Mesh;
var plane: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;

var sun: gameObject;
var planets: objects.planet[];
var moons: objects.planet[];
var ringMesh: Mesh;
var zoom: boolean[];

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
    sun = new gameObject(
        new THREE.SphereGeometry(6, 32, 32),
        new THREE.MeshLambertMaterial({map:  THREE.ImageUtils.loadTexture('../../Assets/Images/sun.jpg')}),
        0, 0, 0
    );
    scene.add(sun);
    
    var sunLight = new THREE.PointLight( 0xffffff, 2, 100 );
    sun.add(sunLight);
    
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-15, 10, 15);
    // spotLight.target.position.set(25, 0, -25);
    // console.log(spotLight.target.position);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");

    planets = new Array<objects.planet>();
    moons = new Array<objects.planet>();
    zoom = new Array<boolean>();
    
    // Planets
    planets.push(new objects.planet(
        new THREE.SphereGeometry(2, 32, 32),
        new THREE.MeshLambertMaterial({map:  THREE.ImageUtils.loadTexture('../../Assets/Images/p1.png')}),
        0, 0, 0, -0.05, 15, sun.position
    ));
    planets.push(new objects.planet(
        new THREE.SphereGeometry(4, 32, 32),
        new THREE.MeshLambertMaterial({map:  THREE.ImageUtils.loadTexture('../../Assets/Images/p2.jpeg')}),
        0, 0, 0, 0.025, 30, sun.position
    ));
    planets.push(new objects.planet(
        new THREE.SphereGeometry(2, 32, 32),
        new THREE.MeshLambertMaterial({map:  THREE.ImageUtils.loadTexture('../../Assets/Images/p3.jpeg')}),
        0, 0, 0, 0.01, 45, sun.position
    ));
    planets.push(new objects.planet(
        new THREE.SphereGeometry(3, 32, 32),
        new THREE.MeshLambertMaterial({map:  THREE.ImageUtils.loadTexture('../../Assets/Images/p4.jpg')}),
        0, 0, 0, -0.0075, 60, sun.position
    ));
    planets.push(new objects.planet(
        new THREE.SphereGeometry(2.5, 32, 32),
        new THREE.MeshLambertMaterial({map:  THREE.ImageUtils.loadTexture('../../Assets/Images/p5.jpg')}),
        0, 0, 0, 0.005, 75, sun.position
    ));
    moons.push(new objects.planet(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshLambertMaterial({map:  THREE.ImageUtils.loadTexture('../../Assets/Images/m1.jpeg')}),
        0, 0, 0, -0.025, 5, planets[1].position
    ));
    moons.push(new objects.planet(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshLambertMaterial({map:  THREE.ImageUtils.loadTexture('../../Assets/Images/m2.jpeg')}),
        0, 0, 0, 0.025, 4, planets[4].position
    ));
    moons.push(new objects.planet(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshLambertMaterial({map:  THREE.ImageUtils.loadTexture('../../Assets/Images/m3.jpeg')}),
        0, 0, 0, -0.01, 8, planets[4].position
    ));
    
    
    ringMesh = new THREE.Mesh(
        new THREE.RingGeometry(2.5, 4, 32), 
        new THREE.MeshLambertMaterial({map:  THREE.ImageUtils.loadTexture('../../Assets/Images/ring.jpg'), side: THREE.DoubleSide}));
    
    planets[2].add(ringMesh);
    
    for (var i = 0; i < planets.length; i++) {
        scene.add(planets[i]);
        console.log("Added planet " + i);
    };
    
    for (var i = 0; i < moons.length; i++) {
        scene.add(moons[i]);
        console.log("Added moon " + i);
    };
    
    for (var i = 0; i < planets.length; i++) {
        zoom[i] = false;
    };
    
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function addControl(controlObject: Control): void {
    gui.add(controlObject, "zoomPlanet1");
    gui.add(controlObject, "zoomPlanet2");
    gui.add(controlObject, "zoomPlanet3");
    gui.add(controlObject, "zoomPlanet4");
    gui.add(controlObject, "zoomPlanet5");
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
function gameLoop(): void {
    stats.update();
    
    sun.rotation.x += 0.01;
    sun.rotation.y += 0.01;
    
    // Update all planet and moon positions
    for (var i = 0; i < planets.length; i++) {
        planets[i].update();
    }
    
    for (var i = 0; i < moons.length; i++) {
        moons[i].update();
    }
    
    // Follow planet with moon when zoomed in
    for (var i = 0; i < zoom.length; i++) {
         if (zoom[i]) {
            control.zoomIn(i);
        }
    }
   
    
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0x1a1a1a, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -110;
    camera.position.y = 110;
    camera.position.z = 110;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
