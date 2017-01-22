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
* >- plot can be a text: a pair of values with @.
* >- this pair of values are expressed as "x@y" e.g., "1@2", "10.5@100.31".
<ToDo>
- minimum version
</ToDo>
* === returned value ===
* function that removes the set drawing/plotting interface
* and returns log object: {time:string,d:[],canvasId:id of canvas}.
*/
function _canvasPenJS(canvas,rgba,w,plot){
  //============================================================================
  var slf=window,cvs=slf.document.getElementById(canvas.id),I=0,n=0,c,x=0,y=0,Rect,
      log={time:0,d:[],canvasId:canvas.id},
      /*a pair of values are expressed as "x@y" e.g., "1@2,10.5@100.31".*/
      reg=/^(?:\+|\-)?[0-9]+(?:\.[0-9]+)?@(?:\+|\-)?[0-9]+(?:\.[0-9]+)?$/,
      plotFlg,
      evnt=[
        ['mousedown','mouseup','mousemove','mouseout'],
        ['mouseup'],
        ['touchstart','touchmove','touchend']
      ];
  plotFlg=reg.test(plot);
  //relative position of the canvas to the viewport
  Rect=!!cvs.getBoundingClientRect()?cvs.getBoundingClientRect():{top:0,left:0};
  /* --- Reference ---
  * -"MDN: Element.getBoundingClientRect()" derived on 2016-12-28 and from:
  * https://developer.mozilla.org/en/docs/Web/API/Element/getBoundingClientRect
  */
  //============================================================================
  //== <Handling clicks with touch event> ==
//this function simulates mouse event via touch event.
function touch2MouseEvt(e){
  //e is event object
  e.preventDefault();
  if(!!e.changedTouches&&e.changedTouches.length>0){
    var touch0=e.changedTouches[0],
        /*function simulates new mouse event*/
        newMEvt=function(EventName,tObj,tgt){
          //tObj and tgt are touch object and target element
          var E=new MouseEvent(EventName,{
            'view':window,
            'bubbles':true,
            'cancelable':true,
            'clientX':tObj.clientX,
            'clientY':tObj.clientY
          });
          tgt.dispatchEvent(E);
        };
    switch(e.type){
      case 'touchstart':
        newMEvt('mousedown',touch0,e.target);
        break;
      case 'touchmove':
        newMEvt('mousemove',touch0,e.target);
        break;
      case 'touchend':
        newMEvt('mouseup',touch0,e.target);
        break;
    }
  }else{return;}
}
  //== </Handling clicks with touch event> ==
  if(!plot){
    //=== drawing ===
    var dr=function(e){
      //e: event, dr.d[0]=flag:true|false, dr.d[1]=x0, dr.d[2]=y0
      if(!dr.d){dr.d=[false,0,0];}
      var D=dr.d;
      /*Event: mousedown*/
      if(!(e.type!='mousedown')){
        D[0]=true,D[1]=e.clientX-Rect.left,D[2]=e.clientY-Rect.top;
        //log.d is an array of plots, expressed with x and y coordinates: "x@y".
        log.d.push(D[1]+'@'+D[2]);
      }
      /*Event: mouseup*/
      else if(!(e.type!='mouseup')){
        D[0]=false,x=e.clientX-Rect.left,y=e.clientY-Rect.top;
        //log.d is an array of plots, expressed with x and y coordinates: "x@y".
        log.d.push(x+'@'+y);
      }
      /*Event: mousemove|mouseout*/
      else if(!(e.type!='mousemove')||!(e.type!='mouseout')){
        if(D[0]){
          x=e.clientX-Rect.left,y=e.clientY-Rect.top;
          c=cvs.getContext('2d'),c.strokeStyle=rgba,c.lineWidth=w;
          c.beginPath(),c.moveTo(D[1],D[2]),c.lineTo(x,y),c.stroke();
          D[1]=x,D[2]=y;
          //reset strokeStyle and lineWidth
          c.strokeStyle='rgba(0,0,0,1)',c.lineWidth=1;
          if(!(e.type!='mouseout')){
            D[0]=false;
            //log.d is an array of plots, expressed with x and y coordinates: "x@y".
            log.d.push(x+'@'+y);
          }
        }
      }
    };
  }else if(!!plotFlg){
    //=== plotting ===
    //plotting with data: x@y
    var pltData=function(cvsTg,data){
      //cvsTg: target canvas tag
      //data: a pair of values are expressed as "x@y" e.g., "1@2", "10.5@100.31".
      c=cvs.getContext('2d'),c.strokeStyle=rgba,c.lineWidth=w;
      x=+plot.split(/@/)[0],y=+plot.split(/@/)[1];
      c.strokeRect(x,y,1,1);
      //log.d is an array of plots, expressed with x and y coordinates: "x@y".
      log.d.push(plot);
      //reset strokeStyle and lineWidth
      c.strokeStyle='rgba(0,0,0,1)',c.lineWidth=1;
    };
  }else{
    //plotting
    var plt=function(e){
      //e: event
      c=cvs.getContext('2d'),c.strokeStyle=rgba,c.lineWidth=w;
      x=e.clientX-Rect.left,y=e.clientY-Rect.top;
      c.strokeRect(x,y,1,1);
      //log.d is an array of plots, expressed with x and y coordinates: "x@y".
      log.d.push(x+'@'+y);
      //reset strokeStyle and lineWidth
      c.strokeStyle='rgba(0,0,0,1)',c.lineWidth=1;
    };
  }
  //============================================================================
  //Handling clicks with touch event
  cvs=slf.document.getElementById(canvas.id),n=evnt[2].length,I=0;
  while(I<n){cvs.addEventListener(evnt[2][I],touch2MouseEvt,true),I+=1;}
  if(!plot){
    //=== drawing ===
    n=evnt[0].length,I=0;
    log.d=[],log.time='drawing:'+slf.Date().replace(/\s/g,'_')+' to ';
    while(I<n){cvs.addEventListener(evnt[0][I],dr,true),I+=1;}
    //returned function
    return function(){
      cvs=slf.document.getElementById(canvas.id),I=0;
      log.time+=slf.Date().replace(/\s/g,'_');
      while(I<n){cvs.removeEventListener(evnt[0][I],dr,true),I+=1;}
      //reset strokeStyle and lineWidth
      if(!c){c=cvs.getContext('2d');}
      c.strokeStyle='rgba(0,0,0,1)',c.lineWidth=1;
      //it returns log object.
      return log;
    };
  }else if(!!plotFlg){
    //=== plotting ===
    //plotting with data: x@y
    log.d=[],log.time='plotting with data (x@y):'+slf.Date().replace(/\s/g,'_');
    pltData('tgtcvas,data');
    //returned function
    return function(){
      //reset strokeStyle and lineWidth
      if(!c){c=cvs.getContext('2d');}
      c.strokeStyle='rgba(0,0,0,1)',c.lineWidth=1;
      //it returns log object.
      return log;
    };
  }else{
    //plotting
    log.d=[],log.time='plotting:'+slf.Date().replace(/\s/g,'_')+' to ';
    cvs.addEventListener(evnt[1][0],plt,true);
    //returned function
    return function(){
      cvs=slf.document.getElementById(canvas.id);
      log.time+=slf.Date().replace(/\s/g,'_');
      cvs.removeEventListener(evnt[1][0],plt,true);
      //reset strokeStyle and lineWidth
      if(!c){c=cvs.getContext('2d');}
      c.strokeStyle='rgba(0,0,0,1)',c.lineWidth=1;
      //it returns log object.
      return log;
    };
  }
}
//=== examples ===
//var d=window.document.getElementsByTagName('canvas')[0];
//var Y=_canvasPenJS(d,'rgba(255,0,0,1)',2,false);
//Y();
//var Y=_canvasPenJS(d,'rgba(0,0,255,1)',10,true);
//Y();
//var Y=_canvasPenJS(d,'rgba(255,0,255,1)',10,"20@+13.14");
//Y();
