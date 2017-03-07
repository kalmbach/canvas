function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}


function checkPos(pos) {
  if (pos.x >= checkboxPos.x && pos.x <= (checkboxPos.x + 20)) {
    if (pos.y >= checkboxPos.y && pos.y <= (checkboxPos.y + 20)) {
      checked = !checked;
      return true;
    }
  }

  return false;
}

function drawBox() {
  context.beginPath();
  context.rect(checkboxPos.x, checkboxPos.y, 20, 20);
  if (checked) {
    context.fillStyle = "#ff3860";
  } else {
    context.fillStyle = "white";
  }
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = 'black';
  context.stroke();
}

function drawSignature(pos) {
  context.beginPath();
  context.strokeStyle = "black";
  context.lineWidth = 1;
  context.moveTo(pos.x, pos.y);
}

function draw(pos) {
  context.lineTo(pos.x, pos.y);
  context.stroke();
}

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var checked = false;
var isDrawing = false;
var checkboxPos = { x: 90, y: 100 };

// Draw the checkbox
drawBox();
context.font = "1.1em Courier";
context.fillStyle = "#222";
context.fillText("Is required to check me", 120, 115);

canvas.addEventListener("mousedown", function(evt) {
  var mousePos = getMousePos(canvas, evt);
  if (checkPos(mousePos)) {
    isDrawing = false;
    drawBox();
  }
  else {
    isDrawing = true;
    drawSignature(mousePos);
  }
});

canvas.addEventListener("mouseup", function(evt) {
  isDrawing = false;
});

canvas.addEventListener("mousemove", function(evt) {
  if (isDrawing) {
    var mousePos = getMousePos(canvas, evt);
    draw(mousePos);
  }
});


