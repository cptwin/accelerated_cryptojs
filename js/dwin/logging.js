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

var loggingDiv;

function initLogging()
{
    loggingDiv = document.getElementById('logging');
    addButtonsToConsole("Console:");
}

function addButtonsToConsole(message)
{
    if(!(typeof loggingDiv === 'undefined'))
    {
        loggingDiv.innerHTML = loggingDiv.innerHTML + " " + message;
    }
}

function addToConsole(message)
{
    if(!(typeof loggingDiv === 'undefined'))
    {
        loggingDiv.innerHTML = loggingDiv.innerHTML + "<p>" + message + "</p>";
    }
}