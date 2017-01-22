# canvasPenJS
this is interface for drawing on target canvas tag.  
https://github.com/YujiSODE/canvasPenJS

>Copyright (c) 2016 Yuji SODE \<yuji.sode@gmail.com\>  
>This software is released under the MIT License.  
>See LICENSE or http://opensource.org/licenses/mit-license.php
______

##Script
* `canvasPenJS.js`
* `canvasPenJS_min.js`  
  this is minimum white spaces and comments version of `canvasPenJS.js`
* `canvasPenJS_usingMDNCodeSamples.js`  
  if `canvasPenJS.js` does not work, please try to use this instead.

##How to use
* Call "`_canvasPenJS(canvas,rgba,w,plot)`" in a html file with img/canvas tag.

__Examples__  
0) `var y,d=window.document.getElementsByTagName('canvas')[0];`

1) \[Set __drawing__\]:`y=_canvasPenJS(d,'rgba(255,0,0,1)',2,false);`  
2) \[Remove set interface for __drawing__, and get log\]:`y();`

1) \[Set __plotting__\]:`y=_canvasPenJS(d,'rgba(0,0,255,1)',10,true);`  
2) \[Remove set interface for __plotting__, and get log\]:`y();`  

1) \[Set __plotting with data__\]:`y=_canvasPenJS(d,'rgba(255,0,255,1)',10,"20@+13.14");`  
2) \[Get log\]:`y();`

##Parameters
* `canvas`: target canvas tag
* `rgba`: color
* `w`: line width
* `plot`: `true`|`false`; `true`=> plotting, `false`=> drawing.  
  `plot`\(=`true`\) can be a text: a pair of values with @, expressed as "_x_@_y_" e.g., "1@2", "10.5@100.31".

##Returned value
Function that removes set drawing/plotting interface, and returns log object.  
This log object has:
* `time`: timestamp
* `d`: an array of plots, expressed with _x_ and _y_ coordinates: "_x_@_y_".
* `canvasId`: id of canvas
