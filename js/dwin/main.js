/* 
 * Copyright 2015 dwin.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var geometry;
var vertices;
var scene;
var scene2;
var camera;
var renderer;
var height;
var width;

function init() {
    mainInit();
    initGeometry();
}

function mainInit() {
    height = window.innerWidth;
    width = (window.innerHeight * 0.9).toFixed(0);
    //height = 640;
    //width = 480;
    scene = new THREE.Scene();
    scene2 = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1;
    renderer = new THREE.WebGLRenderer();
    if(typeof renderer === 'undefined')
    {
        addToConsole("ThreeJS or OpenGL Not Supported!");
    }
}

function initGeometry() {
    geometry = new THREE.BufferGeometry();

    var vertexPositions = [
        [-1.0, -1.0, 1.0],
        [1.0, -1.0, 1.0],
        [1.0, 1.0, 1.0],
        [1.0, 1.0, 1.0],
        [-1.0, 1.0, 1.0],
        [-1.0, -1.0, 1.0]
    ];
    vertices = new Float32Array(vertexPositions.length * 3); // three components per vertex

    // components of the position vector for each vertex are stored
    // contiguously in the buffer.
    for (var i = 0; i < vertexPositions.length; i++)
    {
        vertices[ i * 3 + 0 ] = vertexPositions[i][0];
        vertices[ i * 3 + 1 ] = vertexPositions[i][1];
        vertices[ i * 3 + 2 ] = vertexPositions[i][2];
    }

    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.addAttribute('aPosition', new THREE.BufferAttribute(vertices, 3));
}

function generateRandomNumber()
{
    var buf = new Uint8Array(1);
    window.crypto.getRandomValues(buf);
    return buf[0];
}

function generateRandomData()
{
    var d = new Date();
    var n = d.getTime();
    var size = height * width;
    var data = new Uint8Array(4 * size);
    for (var i = 0; i < (size * 4); i += 4)
    {
        data[i] = n / 255 * (i / 4);
        data[i + 1] = 0;
        data[i + 2] = 0;
        data[i + 3] = 255;
    }
    return data;
}