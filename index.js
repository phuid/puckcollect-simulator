// const puck_width = 40;
// const puck_height = 20;
// const

//fill polys
// ctx.fillStyle = '#f00';
// ctx.beginPath();
// ctx.moveTo(0, 0);
// ctx.lineTo(100,50);
// ctx.lineTo(50, 100);
// ctx.lineTo(0, 90);
// ctx.closePath();
// ctx.fill();´

//field
// ctx.fillStyle = "#FF000033";
// ctx.fillRect(0, 0, 500, 500);
// ctx.fillStyle = "#00006533";
// ctx.fillRect(2000, 2000, 500, 500);
// ctx.stroke();

var c = document.getElementById("fieldcanvas");
var ctx = c.getContext("2d");

var GamePiece;

function startGame() {
  GamePiece = new component(30, 30, "red", 10, 120);
  GameArea.start();
}

var GameArea = {
  canvas: document.getElementById("fieldcanvas"),
  start: function () {
    this.canvas.width = 2500;
    this.canvas.height = 2500;
    this.context = this.canvas.getContext("2d");
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  drawStationary: function() {
    this.context.fillStyle = "#FF000033";
    this.context.fillRect(0, 0, 500, 500);
    this.context.fillStyle = "#00006533";
    this.context.fillRect(2000, 2000, 500, 500);
    console.log("draw");
  },
};

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = GameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;
  };
}

function updateGameArea() {
  GameArea.clear();
  GameArea.drawStationary();
  // GamePiece.newPos();
  // GamePiece.update();
}

function moveup() {
  GamePiece.speedY = -1;
}

function movedown() {
  GamePiece.speedY = 1;
}

function moveleft() {
  GamePiece.speedX = -1;
}

function moveright() {
  GamePiece.speedX = 1;
}

function clearmove() {
  GamePiece.speedX = 0;
  GamePiece.speedY = 0;
}

startGame()