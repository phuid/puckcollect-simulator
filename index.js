//fill polys
// ctx.fillStyle = '#f00';
// ctx.beginPath();
// ctx.moveTo(0, 0);
// ctx.lineTo(100,50);
// ctx.lineTo(50, 100);
// ctx.lineTo(0, 90);
// ctx.closePath();
// ctx.fill();´

function DEGtoRAD(deg) {
  return (deg * Math.PI) / 180;
}

var c = document.getElementById("fieldcanvas");
var ctx = c.getContext("2d");

var GamePiece;

function startGame() {
  robots = new Array(2);
  robots[0] = new component(
    TEAMS[0].bot.profiles,
    TEAMS[0].color,
    TEAMS[0].base.x + TEAMS[0].base.width / 2,
    TEAMS[0].base.y + TEAMS[0].base.height / 2
  );
  robots[1] = new component(
    TEAMS[1].bot.profiles,
    TEAMS[1].color,
    TEAMS[1].base.x + TEAMS[1].base.width / 2,
    TEAMS[1].base.y + TEAMS[1].base.height / 2
  );
  GameArea.start();
}

var GameArea = {
  canvas: document.getElementById("fieldcanvas"),
  start: function () {
    this.canvas.width = FIELDSIZE.x;
    this.canvas.height = FIELDSIZE.y;
    this.context = this.canvas.getContext("2d");
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  drawStationary: function () {
    TEAMS.forEach((team) => {
      this.context.fillStyle = team.color + BASESHADE;
      this.context.fillRect(
        team.base.x,
        team.base.y,
        team.base.width,
        team.base.height
      );
    });

    console.log("draw");
  },
};

function component(profiles, color, x, y) {
  this.profiles = profiles;
  // this.speedX = 0;
  // this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = GameArea.context;
    for (let index = 0; index < profiles.length; index++) {
      const profile = profiles[index];
      ctx.fillStyle = color + PROFILESHADE;

      ctx.translate(this.x, this.y);
      // ctx.rotate(DEGtoRAD(45));

      ctx.beginPath();
      // ctx.moveTo(0, 0);
      // ctx.lineTo(100, 50);
      // ctx.lineTo(50, 100);
      // ctx.lineTo(0, 90);

      ctx.moveTo(profile[0].x, profile[0].x);

      for (let i = 1; i < profile.length; i++) {
        const point = profile[i];
        ctx.lineTo(point.x, point.y);
      }

      ctx.closePath();
      ctx.fill();

      ctx.translate(-this.x, -this.y);
      // ctx.rotate(DEGtoRAD(31));
    }
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  // this.newPos = function () {
  //   this.x += this.speedX;
  //   this.y += this.speedY;
  // };
}

function updateGameArea() {
  GameArea.clear();
  GameArea.drawStationary();
  robots.forEach((bot) => {
    // bot.newPos();
    bot.update();
  });
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

startGame();
