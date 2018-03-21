function resetCanvas(e) {
  e.preventDefault();
  signed = false;
  checked = false;
  context.clearRect(0, 0, 400, 400);
  drawBox();
  drawText();
  signaturePixels = 0;
  updatePixels();
  updateList();
}

function updateList() {
  itemA = document.getElementById("checkbox");
  itemB = document.getElementById("signature");

  if (checked) {
    itemA.className = "notification is-success";
  } else {
    itemA.className = "notification is-danger";
  }

  if (signed) {
    itemB.className = "notification is-success";
  } else {
    itemB.className = "notification is-danger";
  }
}

function updatePixels() {
  if (signaturePixels >= 1000) {
    signed = true;
  }

  itemC = document.getElementById("pixels");
  itemC.textContent = signaturePixels + " Pixels";
}

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

function drawText() {
  context.font = "1.1em Courier";
  context.fillStyle = "#222";
  context.fillText("Is required to check me", 120, 115);
  context.fillText("1000 pixels or more required for signature", 10, 350);
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
var signed = false;
var isDrawing = false;
var checkboxPos = { x: 90, y: 100 };
var signaturePixels = 0;

// Draw the checkbox
drawBox();
drawText();


var blankCanvas = context.getImageData(0, 0, canvas.height, canvas.width);

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
  var currentCanvas = context.getImageData(0, 0, canvas.height, canvas.width);
  var diff = false;

  for(var x=0; x < currentCanvas.data.length; x += 4) {
    diff = diff || currentCanvas.data[x] !== blankCanvas.data[x];
    diff = diff || currentCanvas.data[x+1] !== blankCanvas.data[x+1];
    diff = diff || currentCanvas.data[x+2] !== blankCanvas.data[x+2];
    diff = diff || currentCanvas.data[x+3] !== blankCanvas.data[x+3];

    if (diff) { signaturePixels++; }
    diff = false;
  }

  updatePixels();
  updateList();
});

canvas.addEventListener("mousemove", function(evt) {
  if (isDrawing) {
    var mousePos = getMousePos(canvas, evt);
    draw(mousePos);
  }
});

var resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetCanvas);
