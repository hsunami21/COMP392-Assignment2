/// <reference path="_reference.ts"/>

/*
    Source name: SolarSystem
    Author: Wendall Hsu 300739743
    Last Modified By: Wendall Hsu
    Date Last Modified: February 6, 2016
    Program Description: Creation of a solar system using THREEJS and TypeScript
    Revision History:
        Commit #1: Added sun and rotating planets
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
    sun = new gameObject(
        new THREE.SphereGeometry(4, 32, 32),
        new THREE.MeshLambertMaterial({color:0xffff00}),
        0, 0, 0
    );
    scene.add(sun);
    
    var pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
    sun.add( pointLight );

    planets = new Array<objects.planet>();
    
    // Planets
    planets.push(new objects.planet(
        new THREE.SphereGeometry(2, 32, 32),
        new THREE.MeshLambertMaterial({color:0xff0000}),
        0, 0, 0, 0.025, 30, sun.position
    ));
    planets.push(new objects.planet(
        new THREE.SphereGeometry(2, 32, 32),
        new THREE.MeshLambertMaterial({color:0x00ff00}),
        0, 0, 0, 0.05, 20, sun.position
    ));
    planets.push(new objects.planet(
        new THREE.SphereGeometry(2, 32, 32),
        new THREE.MeshLambertMaterial({color:0x0000ff}),
        0, 0, 0, 0.01, 45, sun.position
    ));
    planets.push(new objects.planet(
        new THREE.SphereGeometry(2, 32, 32),
        new THREE.MeshLambertMaterial({color:0xffffff}),
        0, 0, 0, 0.005, 55, sun.position
    ));
    
    for (var i = 0; i < planets.length; i++) {
        scene.add(planets[i]);
        console.log("Added planet " + i);
    }
    
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
    
    for (var i = 0; i < planets.length; i++) {
        planets[i].update();
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
    camera.position.x = -80;
    camera.position.y = 90;
    camera.position.z = 80;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
