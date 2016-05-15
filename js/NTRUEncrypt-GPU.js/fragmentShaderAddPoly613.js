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
        <script id="fragmentShaderAddPoly613" type="x-shader/x-fragment">\
            	uniform sampler2D sTexture;\
				uniform float message[613];\
				uniform float message2[613];\
					float modulus(float value, float modulus) {\
						float outputValue = mod(floor(value), floor(modulus));\
						if(outputValue < 0.0) {\
							outputValue += modulus;\
						}\
						return floor(outputValue);\
					}\
                    void main() {\
                        vec2 stCoord = vec2(gl_FragCoord.x,0.5);\
						vec4 RxH = texture2D(sTexture,stCoord);\
						int coordInt = int(floor(stCoord.x));\
						for(int i = 0; i < 613; i++) {\
							if(coordInt == i) {\
								gl_FragColor.r += float(int(floor(modulus(float(message[i]),float(2048)))));\
								gl_FragColor.g += float(int(floor(modulus(float(message2[i]),float(2048)))));\
							}\
						}\
                    }\
        </script>\
');
