/**
*	Copyright 2016 Dajne Win
*
*	Licensed under the Apache License, Version 2.0 (the "License");
*	you may not use this file except in compliance with the License.
*	You may obtain a copy of the License at
*
*	    http://www.apache.org/licenses/LICENSE-2.0
*
*	Unless required by applicable law or agreed to in writing, software
*	distributed under the License is distributed on an "AS IS" BASIS,
*	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*	See the License for the specific language governing permissions and
*	limitations under the License.
*/

/**
 * @author Dajne Win
 */

var N, q, p; //NTRUEncrypt Parameters
var df, dg; //number of coefficients
var f, g; //main polynomials
var fp, fq; //inverse polynomials
var h; //public key
var startTime;
var tmpf, tmpg;
var randomPolynomialR;
var rTimesHPolynomial;
var plainTextMessage;
var messageSizeString;
var cipherText;

var DEBUG = true;

function main() {
	console.log("Loading NTRUEncryptJS...");

	//Params	N		q		p
	/*small 	11, 	32,		3
	moderate	167, 	128, 	3
	standard	251,	128,	3
	high		347,	128,	3
	highest		503,	256,	3
	ees401ep1	401,	2048,	3		
	ees449ep1	449,	2048,	3
	ees677ep1	677,	2048,	3
	ees1087ep2	1087,	2048,	3
	ees541ep1	541,	2048,	3
	ees613ep1	613,	2048,	3
	ees887ep1	887,	2048,	3
	ees1499ep1	1499,	2048,	3*/
	
	//Message Sizes for Testing
	/*
	"10KB"
	"500KB"
	"1MB"
	"10MB"
	*/

	//messageSizeString = "10KB";
	writeToDiv('<strong>Message Size = ' + messageSizeString + '</strong>');
	runSeriesOfTests();
	
	/*messageSizeString = "100KB";
	writeToDiv('<strong>Message Size = ' + messageSizeString + '</strong>');
	runSeriesOfTests();*/
	
	/*messageSizeString = "1MB";
	writeToDiv('<strong>Message Size = ' + messageSizeString + '</strong>');
	runSeriesOfTests();*/
	
	/*messageSizeString = "10MB";
	writeToDiv('<strong>Message Size = ' + messageSizeString + '</strong>');
	runSeriesOfTests();*/

	/*messageSizeString = "1GB";
	writeToDiv('<strong>Message Size = ' + messageSizeString + '</strong>');
	runSeriesOfTests();*/
}

function runSeriesOfTests()
{
	/*writeToDiv('NTRU = 11, 32, 3');
	runTests(11, 32, 3);*/
	/*writeToDiv('NTRU = 167, 128, 3');
	runTests(167, 128, 3);
	writeToDiv('NTRU = 251, 128, 3');
	runTests(251, 128, 3);
	writeToDiv('NTRU = 347, 128, 3');
	runTests(347, 128, 3);*/
	/*writeToDiv('NTRU = 503, 256, 3');
	runTests(503, 256, 3);*/
	/*writeToDiv('NTRU = ees401ep1');
	runTests(401, 2048, 3);*/
	/*writeToDiv('NTRU = ees449ep1');
	runTests(449, 2048, 3);*/
	/*writeToDiv('NTRU = ees677ep1');
	runTests(677, 2048, 3);*/
	/*writeToDiv('NTRU = ees1087ep2');
	runTests(1087, 2048, 3);
	//writeToDiv('NTRU = ees541ep1');
	runTests(541, 2048, 3);
	//writeToDiv('NTRU = ees613ep1');
	runTests(613, 2048, 3);	
	//writeToDiv('NTRU = ees887ep1');
	runTests(887, 2048, 3);*/
	//writeToDiv('NTRU = ees1499ep1');
	//runTests(1499, 2048, 3);
}

function writeToDiv(message)
{
	var outputDiv = document.getElementById('outputDiv');
	if(!(typeof outputDiv === 'undefined'))
    {
        outputDiv.innerHTML = outputDiv.innerHTML + '<p>' + message + '</p>';
    }
}

function startTimeTaken()
{
	//startTime = new Date().getTime();
	startTime = performance.now();
	//startTime = d.getMilliseconds();
}

function endTimeTaken(operation)
{
	//var currentTime = new Date().getTime();
	var currentTime = performance.now();
	//var currentTime = d.getMilliseconds();
	var outputDiv = document.getElementById('outputDiv');
	var output = "> #### " + operation + " took " + (currentTime - startTime) + "ms";
	//var output = (currentTime - startTime);
	console.log(output);
	writeToDiv(output);
}

function runTests(newN, newq, newp)
{
	N = newN;
	q = newq;
	p = newp;
	consoleMessage("N = " + N);
	consoleMessage("q = " + q);
	consoleMessage("p = " + p);

	var invModPrime = generateInvModPrime();
	var invMod2 = generateInvMod2();

	startTimeTaken();

	setupNumberCoefficients();
	calculatePolynomialF();
	calculatePolynomialG();
	//f = [-1,1,1,0,-1,0,1,0,0,1,-1];
	//g = [-1,0,1,1,0,1,0,0,-1,0,-1];
	fp = calculatePolynomialInverse(f, p, invModPrime);
	fq = calculatePowerPolynomialInverse(f, invMod2);
	computeProductH();

	consoleMessage("fp = " + fp);
	consoleMessage("fq = " + fq);

	endTimeTaken("Key Generation");

	//var plainText = [-1, 0, 0, 1, -1, 0, 0, 0, -1, 1, 1];
	var plainText = generateMessage();
	plainTextMessage = plainText;
	console.log("plainText " + plainText.length);
	console.log("plainTextMessage " + plainTextMessage.length);

	consoleMessage("Encrypting Message: " + plainText + " | " + plainText.length);

	startTimeTaken();
	var chunkedArray = [];
	for(i = 0; i < Math.ceil(plainText.length/N); i++)
	{
		chunkedArray[i] = plainText.slice((i*N),(i*N)+(N));
	}
	cipherText = [];
	randomPolynomialR = generatePolynomialR();
	consoleMessage("r = " + randomPolynomialR);
	endTimeTaken("Encryption Setup");
	startTimeTaken();
	rTimesHPolynomial = convolution(randomPolynomialR, h);
	endTimeTaken("Encryption Convolution");
	consoleMessage("r*h = " + rTimesHPolynomial);
	startTimeTaken();
	chunkedArray.forEach(function(messageChunk) {
		cipherText = cipherText.concat(encrypt(messageChunk));
	});
	endTimeTaken("Encryption Addition");
	console.log("CPU-e");
	console.log(cipherText);

	consoleMessage("Decrypting Message: " + cipherText);

	startTimeTaken();

	chunkedArray = [];
	for(i = 0; i < Math.ceil(cipherText.length/N); i++)
	{
		chunkedArray[i] = cipherText.slice((i*N),(i*N)+(N));
	}
	var decrypted = [];
	chunkedArray.forEach(function(messageChunk) {
		decrypted = decrypted.concat(decrypt(messageChunk));
	});
	endTimeTaken("Decryption");
	
	consoleMessage("Decrypted Message: " + decrypted);
}

function consoleMessage(message)
{
	if(DEBUG)
	{
		console.log(message);
	}
}

function encrypt(messagePolynomial)
{
	var plainText = messagePolynomial;
	var e = addPolynomials(rTimesHPolynomial, plainText);
	consoleMessage("e = " + e);
	e = modPolynomial(e, q);
	return e;
}

function decrypt(e) {
	var a = convolution(f, e);	
	for(i = 0; i < a.length; i++)
        {
		
            while(a[i] < (0-Math.floor((q-1)/2)) || a[i] > (q/2))
            {
		if(a[i] < (0-Math.floor((q-1)/2)))
		{
			a[i] = a[i] + q;
		}
		else if(a[i] > (q/2))
		{
                	a[i] = a[i] - q;
		}
            }
        }
	consoleMessage("a = " + a);
	var b = a;
	for(i = 0; i < b.length; i++)
        {
            while(b[i] < -1 || b[i] > 1)
            {
                b[i] = b[i] % p;
                if(b[i] < -1)
                {
                    b[i] += p;
                }
                else if(b[i] > 1)
                {
                    b[i] -= p;
                }
            }
        }
	consoleMessage("b = " + b);
	var c = convolution(fp, b);
	for(i = 0; i < c.length; i++)
        {
            while(c[i] < -1 || c[i] > 1)
            {
                c[i] = c[i] % p;
                if(c[i] < -1)
                {
                    c[i] += p;
                }
                else if(c[i] > 1)
                {
                    c[i] -= p;
                }
            }
        }
	return c;
}

function computeProductH()
{
	consoleMessage("Computing Public Polynomial h...");
	h = convolution(fq, g);
	h = multiplyPolynomialByInt(h, p);
	h = modPolynomial(h, q);
	consoleMessage("h = " + h);
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

function addPolynomials(polyA, polyB) {
	var output = polyA;
	for(i = 0; i < polyA.length; i++) {
		output[i] = polyA[i] + polyB[i];
	}
	return output;
}

function multiplyPolynomialByInt(a, b) {
	var output = [];
	for(i = 0; i < N; i++) {
		output[i] = a[i] * b;
	}
	return output;
}

function modConvolution(polyA, polyB, comodulus) {
	var c = convolution(polyA, polyB);
	c = recenterPolynomial(c, comodulus, 0);
	return c;
}

function recenterPolynomial(polyA, comodulus, lowerLimit) {
	var output = [];
	var upperlimit = lowerLimit + comodulus;
	for(i = 0; i < polyA.length; i++)
	{
		output[i] = (polyA[i] % comodulus);
		if(output[i] >= upperlimit)
		{
			output[i] -= comodulus;
		}
		if(output[i] < lowerLimit)
		{
			output[i] += comodulus;
		}
	}
	return output;
}

function convolution(polyA, polyB) {
	var c = [];
	for(i = 0; i < N; i++) {
		c[i] = 0;
	}
	for(i = 0; i < polyA.length; i++)
	{
		for(j = 0; j < polyB.length; j++)
		{
			
			c[(i+j) % c.length] += (polyA[i] * polyB[j]);
		}
	}
	return c;
}

function setupNumberCoefficients() {
	consoleMessage("Setting number of coefficients...");
	dg = 0;
	while(df == 0 || dg == 0)
	{
		df = secureRandomNumber() % Math.floor(N/2);
		dg = secureRandomNumber() % Math.floor(N/2);
	}
	consoleMessage("df = " + df);
	consoleMessage("dg = " + dg);
}

function calculatePolynomialF() {
	consoleMessage("Calculating Polynomial f...");
	var F = [];
	var positive = df;
	var negative = df - 1;
	var zero = N - (positive + negative);
	for(i = 0; i < N; i++) {
		var temp = secureRandomNumber() % 3;
		if(temp == 0)
		{
			if(positive != 0)
			{
				F[i] = 1;
				positive--;
			}
			else if(negative != 0)
			{
				F[i] = -1;
				negative--;
			}
			else if(zero != 0)
			{
				F[i] = 0;
				zero--;
			}
		} 
		else if(temp == 1)
		{
			if(negative != 0)
			{
				F[i] = -1;
				negative--;
			}
			else if(positive != 0)
			{
				F[i] = 1;
				positive--;
			}
			else if(zero != 0)
			{
				F[i] = 0;
				zero--;
			}
		}
		else if(temp == 2)
		{
			if(zero != 0)
			{
				F[i] = 0;
				zero--;
			}
			else if(positive != 0)
			{
				F[i] = 1;
				positive--;
			}
			else if(negative != 0)
			{
				F[i] = -1;
				negative--;
			}
		}
	}
	f = F;
	consoleMessage("f = " + f);
}

function generateMessage() {
	//var messageSize = N;
	var messageSize;
	var messageSize = N;
	if(messageSizeString == "10KB")
	{
		messageSize = 10000;
	}
	else if(messageSizeString == "100KB")
	{
		messageSize = 100000;
	}
	else if(messageSizeString == "500KB")
	{
		messageSize = 500000;
	}
	else if(messageSizeString == "1MB")
	{
		messageSize = 1000000;
	}
	else if(messageSizeString == "10MB")
	{
		messageSize = 10000000;
	}
	else if(messageSizeString == "1GB")
	{
		messageSize = 1000000000;
		//messageSize = 1000;
	}
	//var messageSize = 10000; //10KB
	//var messageSize = 1000000; //1MB
	//var messageSize = 500000; //500KB
	//var messageSize = 250000; //250KB
	var output = [];
	var positive = secureRandomNumber() % Math.floor(messageSize/2);
	var negative = secureRandomNumber() % Math.floor(messageSize/2);
	var zero = messageSize - (positive + negative);
	for(i = 0; i < messageSize; i++) {
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
	while(output.length % N != 0)
	{
		//output[output.length] = (secureRandomNumber() % 2); //how would we know the end message is padded?
		output[output.length] = 0;
	}
	return output;
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

function calculatePolynomialG() {
	consoleMessage("Calculating Polynomial g...");
	g = [];
	var positive = dg;
	var negative = dg;
	var zero = N - (positive + negative);
	for(i = 0; i < N; i++) {
		var temp = secureRandomNumber() % 3;
		if(temp == 0)
		{
			if(positive != 0)
			{
				g[i] = 1;
				positive--;
			}
			else if(negative != 0)
			{
				g[i] = -1;
				negative--;
			}
			else if(zero != 0)
			{
				g[i] = 0;
				zero--;
			}
		} 
		else if(temp == 1)
		{
			if(negative != 0)
			{
				g[i] = -1;
				negative--;
			}
			else if(positive != 0)
			{
				g[i] = 1;
				positive--;
			}
			else if(zero != 0)
			{
				g[i] = 0;
				zero--;
			}
		}
		else if(temp == 2)
		{
			if(zero != 0)
			{
				g[i] = 0;
				zero--;
			}
			else if(positive != 0)
			{
				g[i] = 1;
				positive--;
			}
			else if(negative != 0)
			{
				g[i] = -1;
				negative--;
			}
		}
	}
	consoleMessage("g = " + g);
}

function calculatePowerPolynomialInverse(polyA, invModArray)
{
	consoleMessage("Computing Polynomial Inverse fq...");
	var tmpq = p-1;
	var b = calculatePolynomialInverse(polyA, 2, invModArray);
	while(tmpq < q) {
		tmpq *= tmpq;
		var c = modConvolution(f, b, tmpq);
		c[0] = 2 - c[0];
		if(c[0] < 0)
		{
			c[0] += tmpq;
		}
		for(i = 1; i < b.length; i++) {
			c[i] = (tmpq - c[i]);
		}
		b = modConvolution(b, c, tmpq);
	}
	for(i = 0; i < b.length; i++)
        {
            b[i] = b[i] % q;
        }
	return b;
}

function calculatePolynomialInverse(polyF, prime, invModArray) {
	var k = 0;
	var b = [];
	var c = [];
	tmpf = [];
	tmpg = [];

	for(i = 0; i < N + 1; i++) {
		b[i] = 0;
		c[i] = 0;
		tmpf[i] = 0;
		tmpg[i] = 0;
	}
	b[0] = 1;
	for(i = 0; i < N; i++) {
		tmpf[i] = modPrime(f[i], prime);
	}
	tmpg[N] = 1;
	tmpg[0] = (prime - 1);
	var degreeF = getDegree(polyF);
	var degreeG = N;
	while(true) {
		while((tmpf[0] == 0) && (degreeF > 0))
		{
			degreeF--;
			tmpf = divideByX(tmpf);
			c = multiplyByX(c);
			k++;
		}
		if(degreeF == 0) {
			var f0Inv = invModArray[tmpf[0]];
			if(f0Inv == 0) {
				return null;
			}
			var shifty = N - k;
			shifty = shifty % N;
			if(shifty < N) {
				shifty = shifty + N;
			}
			var inversePoly = [];
			for(i = 0; i < N; i++) {
				inversePoly[(i+shifty) % N] = modPrime(f0Inv * b[i], prime);
			}
			return inversePoly;
		}
		if(degreeF < degreeG) {
			
			var tmpSwap1;

			tmpSwap1 = tmpf;
			tmpf = tmpg;
			tmpg = tmpSwap1;

			var tmpSwap2;
			tmpSwap2 = b;
			b = c;
			c = tmpSwap2;

			var tmpSwap3;
			tmpSwap3 = degreeF;
			degreeF = degreeG;
			degreeG = tmpSwap3;
		}
		var u = modPrime(tmpf[0] * invModArray[tmpg[0]], prime);
		for(i = 0; i < tmpf.length; i++) {
			tmpf[i] = modPrime((tmpf[i] - (u*tmpg[i])), prime);
		}
		for(i = 0; i < b.length; i++) {
			b[i] = modPrime(b[i] - (u*c[i]), prime);
		}
	}
}

function generateInvModPrime() {
	invModPrime = [];
	for(i = 0; i < N; i++) {
		invModPrime[i] = modInverse(i, p);
	}
	return invModPrime;
}

function generateInvMod2() {
	invModPrime = [];
	for(i = 0; i < N; i++) {
		invModPrime[i] = modInverse(i, 2);
	}
	return invModPrime;
}

function modInverse(a, p) {
	var tmpA = a % p;
	for(x = 1; x < p; x++) {
		if((a * x) % p == 1) {
			return x;
		}
	}
	return 0;
}

function secureRandomNumber() {
	var buf = new Uint8Array(1);
  	window.crypto.getRandomValues(buf);
  	return buf[0];
}

function divideByX(somePolynomial) {
	var tempFirst = somePolynomial[0];
	for(i = 0; i < somePolynomial.length; i++)
	{
		somePolynomial[i] = somePolynomial[i+1];
	}
	somePolynomial[somePolynomial.length-1] = tempFirst;
	return somePolynomial;
}

function multiplyByX(somePolynomial) {
	var tempLast = somePolynomial[somePolynomial.length-1];
	for(i = somePolynomial.length-1; i > 0; i--)
	{
		somePolynomial[i] = somePolynomial[i-1];
	}
	somePolynomial[0] = tempLast;
	return somePolynomial;
}

function positiveMod(x, y) {
	var tmp = x % y;
	if(tmp < 0) {
		tmp += y;
	}
	return tmp;
}

function modPrime(someValue, somePrime) {
	var tmp = someValue % somePrime;
	if(tmp < 0) {
		tmp += somePrime;
	}
	return tmp;
}

function getDegree(f) {
	var tempDf = f.length - 1;
	while((tempDf > 0) && f[tempDf] == 0)
	{
		tempDf--;
	}
	return tempDf;
}
