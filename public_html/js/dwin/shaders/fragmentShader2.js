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
<script id="fragmentShader2" type="x-shader/x-fragment">\
            uniform sampler2D sTexture;\
            uniform sampler2D sTexture2;\
                    void main() {\
                        vec2 stCoord = vec2(gl_FragCoord.x/640.0,gl_FragCoord.y/480.0);\
                        gl_FragColor = texture2D(sTexture,stCoord);\
                        vec4 originalTex = texture2D(sTexture2,stCoord);\
                        if(gl_FragColor.g > 0.8)\
                        {\
                            gl_FragColor.r = 0.0;\
                        }\
                        if(gl_FragCoord.x > 320.0 && gl_FragCoord.y > 240.0)\
                        {   gl_FragColor = vec4(0.0,0.0,1.0,1.0);\
                        }\
                        if(gl_FragCoord.x < 320.0 && gl_FragCoord.y > 240.0 && originalTex.r > 0.5)\
                        {   gl_FragColor.b = 1.0;\
                            gl_FragColor.r = 0.0;\
                        }\
                    }\
        </script>\
');
