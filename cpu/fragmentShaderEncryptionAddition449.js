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

document.write('\
        <script id="fragmentShaderEncryptionAddition449" type="x-shader/x-fragment">\
			uniform sampler2D sTexture;\
			uniform float message[449];\
					float modulus(float value, float modulus) {\
						float outputValue = mod(floor(value), floor(modulus));\
						if(outputValue < 0.0) {\
							outputValue += modulus;\
						}\
						return floor(outputValue);\
					}\
					void main() {\
						vec2 stCoord = vec2(gl_FragCoord.x,gl_FragCoord.y);\
						int coordInt = int(floor(stCoord.x));\
						vec4 inputTextureAtThisPixel = texture2D(sTexture,vec2(gl_FragCoord.x/449.0,0.5));\
						gl_FragColor.r = inputTextureAtThisPixel.r;\
						for(int i = 0; i < 449; i++) {\
							if(coordInt == i) {\
								gl_FragColor.r = inputTextureAtThisPixel.r;\
								gl_FragColor.g += float(int(floor(modulus(float(inputTextureAtThisPixel.r + message[i]),float(2048)))));\
								gl_FragColor.b = message[i];\
							}\
						}\
					}\
        </script>\
');
