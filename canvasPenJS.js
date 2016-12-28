/*canvasPenJS.js
*
*    Copyright (c) 2016 Yuji SODE <yuji.sode@gmail.com>
*
*    This software is released under the MIT License.
*    See LICENSE or http://opensource.org/licenses/mit-license.php
*/
//this is interface for drawing on target canvas tag.
/* === parameters ===
* canvas: target canvas tag
* rgba: color
* w: line width
* plot: true|false; true => plotting, false => drawing
<ToDo>
* - plot can be a text: csv formatted pairs of values with @.
* - a pair of values are expressed as x@y e.g., '1@2,10.5@100.31'.
- x and y coordinates modified for css etc.
- TouchEvent
</ToDo>
* === returned value ===
* function that removes the set drawing interface
*/
function _canvasPenJS_click(canvas,rgba,w,plot){
  //============================================================================
  var slf=window,cvs=slf.document.getElementById(canvas.id),I=0,n=0,c,x,y,Rect,
      evnt=[['mousedown','mouseup','mousemove','mouseout'],['click']];
  //relative position of the canvas to the viewport
  Rect=!!cvs.getBoundingClientRect()?cvs.getBoundingClientRect():{top:0,left:0};
  /* --- Reference ---
  * -"MDN: Element.getBoundingClientRect()" derived on 2016-12-28 and from:
  * https://developer.mozilla.org/en/docs/Web/API/Element/getBoundingClientRect
  */
  //============================================================================
  if(!plot){
    //drawing
    var dr=function(e){
      //e: event, dr.d[0]=flag:true|false, dr.d[1]=x0, dr.d[2]=y0
      if(!dr.d){dr.d=[false,0,0];}
      var D=dr.d;
      /*Event: mousedown*/
      if(!(e.type!='mousedown')){D[0]=true,D[1]=e.clientX-Rect.left,D[2]=e.clientY-Rect.top;}
      /*Event: mouseup*/
      else if(!(e.type!='mouseup')){D[0]=false;}
      /*Event: mousemove|mouseout*/
      else if(!(e.type!='mousemove')||!(e.type!='mouseout')){
        if(D[0]){
          x=e.clientX-Rect.left,y=e.clientY-Rect.top;
          c=cvs.getContext('2d'),c.strokeStyle=rgba,c.lineWidth=w;
          c.beginPath(),c.moveTo(D[1],D[2]),c.lineTo(x,y),c.stroke();
          D[1]=x,D[2]=y;
          //reset strokeStyle and lineWidth
          c.strokeStyle='rgba(0,0,0,1)',c.lineWidth=1;
          if(!(e.type!='mouseout')){D[0]=false;}
        }
      }
    };
  }else{
    //plotting
    var plt=function(e){
      //e: event
      c=cvs.getContext('2d'),c.strokeStyle=rgba,c.lineWidth=w;
      x=e.clientX-Rect.left,y=e.clientY-Rect.top;
      c.strokeRect(x,y,1,1);
      //reset strokeStyle and lineWidth
      c.strokeStyle='rgba(0,0,0,1)',c.lineWidth=1;
    };
  }
  //============================================================================
  if(!plot){
    //drawing
    n=evnt[0].length,I=0;
    while(I<n){cvs.addEventListener(evnt[0][I],dr,true),I+=1;}
    //returned function
    return function(){
      cvs=slf.document.getElementById(canvas.id),I=0;
      while(I<n){cvs.removeEventListener(evnt[0][I],dr,true),I+=1;}
      //reset strokeStyle and lineWidth
      c.strokeStyle='rgba(0,0,0,1)',c.lineWidth=1;
    };
  }else{
    //plotting
    n=evnt[1].length,I=0;
    cvs.addEventListener(evnt[1][0],plt,true);
    //returned function
    return function(){
      cvs=slf.document.getElementById(canvas.id);
      cvs.removeEventListener(evnt[1][0],plt,true);
      //reset strokeStyle and lineWidth
      c.strokeStyle='rgba(0,0,0,1)',c.lineWidth=1;
    };
  }
}
//=== test examples ===
//var d=window.document.getElementsByTagName('canvas')[0];
//var Y=_canvasPenJS_click(d,'rgba(255,0,0,1)',2,false);
//Y();
//var Y=_canvasPenJS_click(d,'rgba(0,0,255,1)',10,true);
//Y();
