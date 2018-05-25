
$(document).ready(() => {

  let socket = io();
  let clic = false;
  let canvas = document.getElementById('can');
  let con = canvas.getContext('2d');
  let current = {
    color: 'white'
  };

  con.strokeStyle = current.color;
  con.lineWidth = 6;
  con.lineCap = "round";
  con.fillStyle = "#333";
  con.fillRect(0,0,canvas.width,canvas.height);



  socket.on('drawing', onDrawingEvent);


  function drawLine(x0, y0, x1, y1, color, emit){
      con.beginPath();
      con.moveTo(x0, y0);
      con.lineTo(x1, y1);
      con.stroke();
      con.closePath();

    if(!emit){ return; }

    socket.emit('drawing', {
      x0,
      y0,
      x1,
      y1,
      color
    });
  }



  $("#can").mousedown((e) => {
    clic = true;
    current.x = e.clientX;
    current.y = e.clientY;
  });

  $(document).mouseup((e) => {
    clic = false;
    drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
  });

  $(document).click(() => {
    if(!clic) { return; }
    clic = false;
  });

  $("#can").mousemove(function(e) { //don't know why arrow functions here aren't working
    if(!clic) { return; }
    drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
    current.x = e.clientX;
    current.y = e.clientY;
  });

  function throttle(callback, delay) {
    let previousCall = new Date().getTime();
    return function(){
      let time = new Date().getTime();

      if((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    }
  }

  function onDrawingEvent(data){
    drawLine(data.x0, data.y0, data.x1, data.y1, data.color);
  }

});
