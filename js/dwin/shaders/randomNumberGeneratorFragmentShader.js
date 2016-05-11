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
        <script id="randomNumberGeneratorFragmentShader" type="x-shader/x-fragment">\
            uniform sampler2D sTexture;\
                    float rand(vec2 co){\
						const vec2 r = vec2(23.1406926327792690, 2.6651441426902251);\
                        return fract(sin(dot(co.xy ,vec2(23.1406926327792690,2.6651441426902251))) * 43758.5453);\
                    }\
                    void main() {\
                        vec2 stCoord = vec2(gl_FragCoord.x,gl_FragCoord.y);\
                        gl_FragColor = texture2D(sTexture,stCoord);\
                        gl_FragColor.r = rand(stCoord);\
                        gl_FragColor.g = rand(stCoord);\
                        gl_FragColor.b = rand(stCoord);\
                    }\
        </script>\
');
