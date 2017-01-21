# canvasPenJS
this is interface for drawing on target canvas tag.  
https://github.com/YujiSODE/canvasPenJS

>Copyright (c) 2016 Yuji SODE \<yuji.sode@gmail.com\>  
>This software is released under the MIT License.  
>See LICENSE or http://opensource.org/licenses/mit-license.php
______

##Script
* `canvasPenJS.js`
* `canvasPenJS_usingMDNCodeSamples.js`

##How to use
* Call "`_canvasPenJS(canvas,rgba,w,plot)`" in a html file with img/canvas tag.

###Parameters
* `canvas`: target canvas tag
* `rgba`: color
* `w`: line width
* `plot`: `true`|`false`; `true`=> plotting, `false`=> drawing.  
  `plot`\(=`true`\) can be a text: a pair of values with @, expressed as "_x_@_y_" e.g., "1@2", "10.5@100.31".

###Returned value
Function that removes set drawing/plotting interface, and returns log object.  
This log object has:
* `time`: timestamp
* `d`: an array of plots, expressed with _x_ and _y_ coordinates: "_x_@_y_".
* `canvasId`: id of canvas

>##ToDo
>- minimum version
