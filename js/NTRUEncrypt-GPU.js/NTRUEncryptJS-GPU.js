var geometry;
var vertices;
var scene;
var scene2;
var camera;
var renderer;
var height;
var width;
var startTime;
var endTime;
var dataTexture;
var convolutionTexture;
var additionTexture;

var myRxH;

function executeNTRUEncryptGPU()
{
	setupForGPUTest();
}

function init() {
    mainInit();
    initGeometry();
}

function mainInit() {
    //height = (window.innerWidth * 0.90).toFixed(0);
    //width = (window.innerHeight * 0.90).toFixed(0);
    height = 1;
    width = N;
    scene = new THREE.Scene();
    scene2 = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1;
    //renderer = new THREE.WebGLRenderer();
    //renderer = Detector.webgl? new THREE.WebGLRenderer(): new THREE.CanvasRenderer();
    //renderer = new THREE.CanvasRenderer();
    if ( webglAvailable() ) {
            renderer = new THREE.WebGLRenderer();
    } else {
            renderer = new THREE.CanvasRenderer();
    }
    renderer.setSize(width, height);
	renderer.domElement.id = "canvas";
	
    document.body.appendChild(renderer.domElement);

}

function shaderMaterial(uniforms, vertexShaderCode, fragmentShaderCode)
{
    return new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShaderCode,
        fragmentShader: fragmentShaderCode
    });
}

function renderTargetParams() {
    var renderTargetParams = {
            minFilter:THREE.LinearFilter,
            stencilBuffer:false,
            depthBuffer:false,
	    type: THREE.FloatType
    };
    return renderTargetParams;
}

function webglAvailable() {
        try {
                var canvas = document.createElement( 'canvas' );
				canvas.id = "canvas";
                return !!( window.WebGLRenderingContext && (
                        canvas.getContext( 'webgl' ) ||
                        canvas.getContext( 'experimental-webgl' ) )
                );
        } catch ( e ) {
                return false;
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

/*function dataTexture(somevalues) {
    var dataTexture = new THREE.DataTexture(somevalues,width,height,THREE.RGBAFormat, THREE.FloatType);
    dataTexture.needsUpdate = true;
    return dataTexture;
}*/

function encryptionUniform()
{
	var publicKeyH = new Float32Array(h);
	var randomPolyR = new Float32Array(randomPolynomialR);
	dataTexture = new THREE.DataTexture(new Uint8Array(4 * (height * width)),height,width,THREE.RGBAFormat);
    	dataTexture.needsUpdate = true;
	consoleMessage("publicKeyH: " + publicKeyH);
	consoleMessage("randomPolynomialR: " + randomPolyR);
    	var uniforms = {
        	publicKeyH: { type: "fv1", value: publicKeyH },
		randomPolynomialR  : { type: "fv1", value: randomPolynomialR }
    	};
    return uniforms;
}

function encryptionUniform2(somevalues)
{
	var publicKeyH = new Float32Array(h);
	var randomPolyR = new Float32Array(randomPolynomialR);
	consoleMessage("publicKeyH: " + publicKeyH);
	consoleMessage("randomPolynomialR: " + randomPolyR);
    	var uniforms = {
        	publicKeyH: { type: "fv1", value: publicKeyH },
		randomPolynomialR  : { type: "fv1", value: randomPolynomialR }
    	};
    	return uniforms;
}

/*function generateRandomData(someData)
{
    var d = new Date();
    var n = d.getTime();
    var size = height * width;
    var data = new Float32Array(4 * size);
	var messageData = someData;
    for (var i = 0; i < (size * 4); i += 4)
    {
        data[i] = messageData[i % messageData.length]; //red
        data[i + 1] = messageData[(i+1) % messageData.length]; //green
        data[i + 2] = messageData[(i+2) % messageData.length]; //blue
        data[i + 3] = messageData[(i+3) % messageData.length]; //alpha
    }
    return data;
}*/

function create()
{
    //var inputData = new Float32Array(4 * (height * width));
    //inputData = generateRandomData();
    /*for (var i = 0; i < height * width; i+=4)
    {
        inputData[i] = 1.0;
        inputData[i+1] = 0.0;
        inputData[i+2] = 0.0;
        inputData[i+3] = 1.0;
    }*/
    /*for (var i = 0; i < 5; i++)
    {
        consoleMessage(inputData[i]);
    }*/

    var attributes = {  
        aPosition: { type: 'v4', value: new THREE.Vector4() }
      };
      
    //var material_FS = shaderMaterial(uniform(inputData), document.getElementById('vertexShader').textContent, document.getElementById('demoFragmentShader1').textContent);
    //var material_FS = shaderMaterial(uniform(inputData), document.getElementById('vertexShader').textContent, document.getElementById('randomNumberGeneratorFragmentShader').textContent);

    var material_FS = new THREE.ShaderMaterial({
        uniforms: encryptionUniform(),
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShaderMultPoly' + N).textContent
    });

    var mesh = new THREE.Mesh(geometry, material_FS);
    scene.add(mesh);

    convolutionTexture = new THREE.WebGLRenderTarget( width, height, renderTargetParams() );
	
	//consoleMessage(renderer.info);
	
	//var canvo = document.getElementById("canvas");
	//var ctx = renderer.domElement.getContext("webgl");
	//var imageData2 = renderer.domElement.data;
	//var imgData = renderer.domElement.getImageData(0, 0, width, height).data;
	/*var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("experimental-webgl");
	var pixels = new Float32Array(ctx.drawingBufferWidth * ctx.drawingBufferHeight * 4);
	ctx.readPixels(0, 0, width, height, ctx.RGBA, ctx.FLOAT, pixels);
	//var returnedArray = pixels.slice((0+N),(N*2));
	
	//var returnedArray = pixels.slice(0,N*4);
	var returnedArray = pixels;
	
	/*if(N == 11)
	{
		returnedArray = pixels.slice((0+N),(N*2));
	} 
	else if(N == 25)
	{
		returnedArray = pixels.slice((0+N),(N*2));
	}
	else
	{
		returnedArray = pixels.slice((0+N),(N*2));
	}

	var processedArray = returnedArray;*/
	
	/*var processedArray = [];
	for(i = 0; i < returnedArray.length; i++)
	{
		processedArray[i] = returnedArray[i];
		while(processedArray[i] > 63.5)
		{
			processedArray[i] -= 127;
		}
	}*/
	
	//multipoly what is should output
	//-6,1,-1,5,-9,-18,15,-4,-25,18,24

	//when N = 11
	//what it should output
	//14,5,7,2,10,27,6,6,28,31,20
	
	//when N = 167
	//what it should output
	//28,7,9,28,26,18,6,2,11,13,12,1,29,12,1,14,3,11,0,24,15,12,30,15,9,21,4,3,0,6,24,18,6,25,30,2,9,13,7,23,4,5,0,30,29,25,14,10,24,14,30,27,17,6,24,31,25,23,9,31,11,30,1,14,6,25,26,30,5,19,21,20,12,1,2,9,24,10,29,6,31,5,18,8,6,22,26,0,7,22,11,5,15,27,4,23,21,11,11,22,23,14,21,5,26,6,7,9,3,11,23,0,7,23,20,9,14,11,17,23,16,19,26,23,9,11,8,20,30,22,23,20,2,17,26,23,26,22,2,16,8,11,25,3,18,18,28,28,31,21,19,2,24,19,19,11,8,4,16,14,4,25,18,6,20,4,16

	//28,7,9,28,26,18,6,2,11,13,12,1,29,12,1,14,3,11,0,24,15,12,30,15,9,21,4,3,0,6,24,18,6,25,30,2,9,13,7,23,4,5,0,30,29,25,14,10,24,14,30,27,17,6,24,31,25,23,9,31,11,30,1,14,6,25,26,30,5,19,21,20,12,1,2,9,24,10,29,6,31,5,18,8,6,22,26,0,7,22,11,5,15,27,4,23,21,11,11,22,23,14,21,5,26,6,7,9,3,11,23,0,7,23,20,9,14,11,17,23,16,19,26,23,9,11,8,20,30,22,23,20,2,17,26,23,26,22,2,16,8,11,25,3,18,18,28,28,31,21,19,2,24,19,19,11,8,4,16,14,4,25,18,6,20,4,16
	
	//consoleMessage("Data Output: " + processedArray);

	startTimeTaken();
    renderer.render(scene, camera, convolutionTexture, true);
	endTimeTaken("GPU-Polynomial-Convolution-Encryption");


	startTimeTaken();
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("experimental-webgl");
	var pixels = new Float32Array(ctx.drawingBufferWidth * ctx.drawingBufferHeight * 4);
	var timeTaken = 0;
	var gpuCipherText = [];
	var chunkedArray = [];
	for(i = 0; i < Math.ceil(plainTextMessage.length/(N*2)); i++)
	{
		chunkedArray[i] = plainTextMessage.slice((i*N),(i*N)+(N));
	}
	var messageOne = new Float32Array(N);
	var messageTwo = new Float32Array(N);
	var uniforms2 = {
			sTexture: { type: "t", value: dataTexture },
			message: { type: "fv1", value: messageOne },
			message2: { type: "fv1", value: messageTwo }
	};

	var material = new THREE.ShaderMaterial({
		uniforms: uniforms2,
		vertexShader: document.getElementById('vertexShader').textContent,
		fragmentShader: document.getElementById('fragmentShaderAddPoly' + N).textContent
	});

	mesh = new THREE.Mesh(geometry, material);
	chunkedArray.forEach(function(messageChunk) {
		
		messageOne = messageChunk.slice(0, N);
		//console.log("messageOne: " + messageOne);
		//messageTwo = messageChunk.slice(N+1, (N*2));
		messageTwo = messageOne;

		var currentTime = performance.now();
		scene2.add(mesh);
		//endTimeTaken("GPU-Polynomial-Addition-Encryption");
		timeTaken += (performance.now() - currentTime);

		
		ctx.readPixels(0, 0, width, height, ctx.RGBA, ctx.FLOAT, pixels);

		var outputRxH = [];
		var counter = 0;
		for(var i = 0; i < N*4; i+=4)
		{
			outputRxH[counter] = pixels[i];
			counter++;
		}

		for(var i = 1; i < N*4; i+=4)
		{
			outputRxH[counter] = pixels[i];
			counter++;
		}

		//consoleMessage("RxH Output: " + outputRxH);

		var e = modPolynomial(outputRxH, q);
		//console.log(e);
		//consoleMessage("GPU-e = " + e);
		gpuCipherText = gpuCipherText.concat(e);
	});
	
	for(var i = 0; i < plainTextMessage.length; i++)
	{
		gpuCipherText[i] = gpuCipherText[i] + plainTextMessage[i];
	}
	
	additionTexture = new THREE.WebGLRenderTarget( width, height, renderTargetParams() );
	
	renderer.render(scene, camera, additionTexture);

	var currentTime = performance.now();
	//var currentTime = d.getMilliseconds();
	var outputDiv = document.getElementById('outputDiv');
	var output = "> #### " + "GPU-Addition" + " took " + timeTaken + "ms";
	console.log(output);
	writeToDiv(output);

	console.log("GPU-e:");
	console.log(gpuCipherText);
	
	//console.log("Pixels: " + pixels);

	endTimeTaken("GPU-Encryption");
	
	//getResults();
	
	/*if(arraysEqual(randTimesPublicPoly, outputRxH))
	{
		consoleMessage("IT WORKS MOFO!");
	}
	else
	{
		consoleMessage("NOPE");
	}*/
	
	//consoleMessage("Encrypted Data Output: " + processedArray);

	//consoleMessage("Encrypted Data Output: " + modPolynomial(processedArray, 32));
	
	/*for(i = 0; i < ctx.getImageData.length; i++)
	{
		consoleMessage(ctx.getImageData[i]);
	}*/

    /*var uniforms2 = {
        sTexture: { type: "t", value: myTexture },
        sTexture2: { type: "t", value: dataTexture }
    };
    
	var material = shaderMaterial(uniforms2, document.getElementById('vertexShader').textContent, document.getElementById('fragmentShader').textContent);

    var material = new THREE.ShaderMaterial({
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    });

    var mesh2 = new THREE.Mesh(geometry, material);
    scene2.add(mesh2);
	myTexture = new THREE.WebGLRenderTarget( width, height, renderTargetParams() );
	renderer.render(scene2, camera, myTexture, true);*/
}

function getResults() {
	/*var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("webgl");
	var pixels = new Float32Array(ctx.drawingBufferWidth * ctx.drawingBufferHeight * 4);*/
	/*var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("webgl");
	var pixels2 = new Float32Array(ctx.drawingBufferWidth * ctx.drawingBufferHeight * 4);
	renderer.readRenderTargetPixels(additionTexture, 0, 0, width, height, pixels2);
	console.log("Pixels: " + pixels2);*/
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function secureRandomNumber() {
	var buf = new Uint8Array(1);
  	window.crypto.getRandomValues(buf);
  	return buf[0];
}

function generatePolynomialR() {
	var output = [];
	var positive = secureRandomNumber() % Math.floor(N/3);
	var negative = positive;
	var zero = N - (positive + negative);
	for(i = 0; i < N; i++) {
		var temp = secureRandomNumber() % 3;
		if(temp == 0)
		{
			if(positive != 0)
			{
				output[i] = 1;
				positive--;
			}
			else if(negative != 0)
			{
				output[i] = -1;
				negative--;
			}
			else if(zero != 0)
			{
				output[i] = 0;
				zero--;
			}
		} 
		else if(temp == 1)
		{
			if(negative != 0)
			{
				output[i] = -1;
				negative--;
			}
			else if(positive != 0)
			{
				output[i] = 1;
				positive--;
			}
			else if(zero != 0)
			{
				output[i] = 0;
				zero--;
			}
		}
		else if(temp == 2)
		{
			if(zero != 0)
			{
				output[i] = 0;
				zero--;
			}
			else if(positive != 0)
			{
				output[i] = 1;
				positive--;
			}
			else if(negative != 0)
			{
				output[i] = -1;
				negative--;
			}
		}
	}
	return output;
}

function modPolynomial(polyA, modulus) {
	var output = polyA;
	for(i = 0; i < output.length; i++)
	{
		output[i] = polyA[i] % modulus;
		while(output[i] < 0)
			output[i] += modulus;
	}
	return output;
}
        
        
/*function render() {
    requestAnimationFrame(render);
    renderer.render(scene2, camera, additionTexture);
}*/
