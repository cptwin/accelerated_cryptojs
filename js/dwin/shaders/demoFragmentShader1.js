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
        <script id="demoFragmentShader1" type="x-shader/x-fragment">\
            uniform sampler2D sTexture;\
                    void main() {\
                        vec2 stCoord = vec2(gl_FragCoord.x,gl_FragCoord.y);\
                        gl_FragColor = texture2D(sTexture,stCoord);\
                        if(gl_FragCoord.x < 200.0)\
                        {\
                            gl_FragColor.b = 0.5;\
                        } else if(gl_FragCoord.x > 200.0 && gl_FragCoord.x < 400.0) {\
                            gl_FragColor.r = 0.5;\
                        } else {\
                            gl_FragColor.g = 0.5;\
                        }\
                    }\
        </script>\
');
