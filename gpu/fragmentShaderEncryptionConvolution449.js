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
        <script id="fragmentShaderEncryptionConvolution449" type="x-shader/x-fragment">\
			uniform float publicKeyH[449];\
			uniform float randomPolynomialR[449];\
					void main() {\
						vec2 stCoord = vec2(gl_FragCoord.x,gl_FragCoord.y);\
						int coordInt = int(floor(stCoord.x));\
						for(int i = 0; i < 449; i++) {\
							for(int j = 0; j < 449; j++) {\
								if(int(floor(mod(float(i+j),float(449)))) == coordInt) {\
									gl_FragColor.r += publicKeyH[i] * randomPolynomialR[j];\
								}\
							}\
						}\
					}\
        </script>\
');
