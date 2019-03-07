
// 初始化数据
var using = false;
var lastPoint = {};
var brushEnable = 'false';
var context = canvas.getContext('2d');
var color = 'black';
// 控制窗口大小
autoSetSize();

// 定义监听事件
listenToUser();


// 工具函数
function autoSetSize() {
  setSize();
}


function setSize() {
  var width  = document.documentElement.clientWidth;
  var height = document.documentElement.clientHeight;
  canvas.width = width;
  canvas.height = height;
}
function listenToMouse() {
  document.onmousedown = function(data) {
    using = true;
    var x = data.clientX;
    var y = data.clientY;
    lastPoint.x = x;
    lastPoint.y = y;
  }
  document.onmousemove = function(data) {
    if (!using){
      return;
    }
    var x = data.clientX;
    var y = data.clientY;
    if (brushEnable){
      drawLine(lastPoint.x,lastPoint.y, x,y) 
      lastPoint.x = x;
      lastPoint.y = y; 
    } else {
      context.clearRect(x-4, y-4, 8, 8);  
    }

  }

  document.onmouseup = function() {
    using = false;
  }


}
function listenToTouch() {
  document.ontouchstart= function(data) {
    using = true;
    var x =  data.touches[0].clientX;
    var y = data.touches[0].clientY;
    lastPoint.x = x;
    lastPoint.y = y;
  }
  document.ontouchmove = function(data) {
    if (!using){
      return;
    }
    var x =  data.touches[0].clientX;
    var y = data.touches[0].clientY;
    if (brushEnable){
      drawLine(lastPoint.x,lastPoint.y, x,y) 
      lastPoint.x = x;
      lastPoint.y = y; 
    } else {
      context.clearRect(x-5, y-5, 10, 10);  
    }

  }
  document.ontouchend = function(data) {
    using = false;
  }
}
function listenToUser() {
  red.onclick = function(data) {
    color = 'red';
    red.classList.add('active');
    blue.classList.remove('active');
    black.classList.remove('active');
    green.classList.remove('active');
  }
  blue.onclick = function(data) {
    color = 'blue'; 
    red.classList.remove('active');
    blue.classList.add('active');
    black.classList.remove('active');
    green.classList.remove('active');
  }
  black.onclick = function(data) {
    color = 'black';
    red.classList.remove('active');
    blue.classList.remove('active');
    black.classList.add('active');
    green.classList.remove('active');
  }
  green.onclick = function(data) {
    color = 'green';
    red.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
    green.classList.add('active');  
  }   



  brush.onclick = function(data) {
    brushEnable = true;
    console.log(data);
    brush.classList.add('active');
    eraser.classList.remove('active');
  }
  eraser.onclick = function(data) {
    brushEnable = false;
    eraser.classList.add('active');
    brush.classList.remove('active');
  }
  clear.onclick = function(data) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  save.onclick = function ()
  {
    var image = canvas.toDataURL();

    var aLink = document.createElement('a');
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click");
    aLink.download = 'image.png';
    aLink.href = image;
    aLink.dispatchEvent(evt);
    aLink.click();
  }
  if ('ontouchstart' in document.body) {
    listenToTouch();
  }
  else {
    listenToMouse();
  }
}


function clearLine(x, y) {
  context.clearRect(x, y, 10, 10); 
}
function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineWidth = '4';
  context.lineTo(x2, y2);
  context.strokeStyle = color;
  context.stroke();
  context.closePath();
}
function drawCircle(x, y) {
  context.beginPath('');
  context.arc(x, y, 1, 0, 2*Math.PI);
  context.fill();
}
