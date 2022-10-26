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
    TEAMS[0].bot, // details
    TEAMS[0].color, // color
    TEAMS[0].base.x + TEAMS[0].base.width / 2, //x pos
    TEAMS[0].base.y + TEAMS[0].base.height / 2, //y pos
    180 //rotation
  );
  robots[1] = new component(
    TEAMS[1].bot, // details
    TEAMS[1].color, // color
    TEAMS[1].base.x + TEAMS[1].base.width / 2, //x pos
    TEAMS[1].base.y + TEAMS[1].base.height / 2, //y pos
    0 //rotation
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

    // console.log("drawstat"); //debug
  },
};

function component(bot, color, x, y, rot) {
  this.profiles = bot.profiles;
  this.motorpoints = bot.motorpoints;
  this.sensor = bot.sensor;
  this.rotation = rot;
  // this.speedX = 0;
  // this.speedY = 0;
  this.x = x;
  this.y = y;

  this.draw = function () {
    ctx = GameArea.context;
    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(DEGtoRAD(this.rotation));
    //draw polygonal profiles
    for (let index = 0; index < this.profiles.length; index++) {
      const profile = this.profiles[index];
      ctx.fillStyle = color + PROFILESHADE;

      // console.log(DEGtoRAD(this.rotation)); //debug

      ctx.beginPath();
      ctx.moveTo(profile[0].x, profile[0].x);
      for (let i = 1; i < profile.length; i++) {
        const point = profile[i];
        ctx.lineTo(point.x, point.y);
      }
      ctx.closePath();
      ctx.fill();
    }
    //draw sensor and motorpoint on screen
    this.motorpoints.forEach((motorpoint) => {
      ctx.beginPath();
      ctx.arc(
        motorpoint.x,
        motorpoint.y,
        motorpoint.size,
        0,
        DEGtoRAD(360)
      );
      ctx.closePath();
      ctx.fillStyle = MOTORFILL;
      ctx.fill();
    });

    ctx.beginPath();
    ctx.arc(
      this.sensor.x,
      this.sensor.y,
      this.sensor.size,
      0,
      DEGtoRAD(360)
    );
    ctx.closePath();
    ctx.fillStyle = SENSORFILL;
    ctx.fill();

    // ctx.translate(-this.x, -this.y);
    ctx.restore();
    // console.log("drawcomp"); //debug
  };

  this.update = function () {
    this.draw();
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
