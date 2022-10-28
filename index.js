function checkJoystickVisibility() {
  for (let num = 0; num < TEAMS.length; num++) {
    if (document.getElementsByClassName("movement" + num)[0].checked) {
      document.getElementsByClassName("joystick-container")[num].style.display =
        "grid";
    } else {
      document.getElementsByClassName("joystick-container")[num].style.display =
        "none";
    }
  }
}

document
  .getElementById("movement-select")
  .addEventListener("click", checkJoystickVisibility);

checkJoystickVisibility();

var mousePos = { x: 0, y: 0 };
document.addEventListener("mousemove", (e) => {
  mousePos = { x: e.clientX, y: e.clientY };
  // console.log(mousePos); //debug
});

//color the html elements based on team they belong to
for (let i = 0; i < TEAMS.length; i++) {
  var joystick = document.getElementsByClassName("joystick")[i];
  joystick.style.borderColor = blend_colors(
    TEAMS[i].color,
    getComputedStyle(document.documentElement).getPropertyValue("--fore")
  );
  joystick.style.backgroundColor = blend_colors(
    TEAMS[i].color,
    getComputedStyle(document.documentElement).getPropertyValue("--back")
  );

  var tracker = document.getElementsByClassName("tracker")[i];
  tracker.style.backgroundColor = blend_colors(
    TEAMS[i].color,
    getComputedStyle(document.documentElement).getPropertyValue("--fore")
  );

  var group = document.getElementsByClassName("movement-group")[i];
  group.style.borderColor = blend_colors(
    TEAMS[i].color,
    getComputedStyle(document.documentElement).getPropertyValue("--fore")
  );
}

function DEGtoRAD(deg) {
  return (deg * Math.PI) / 180;
}

function readJoystick(botnum) {
  var rect = document
    .getElementsByClassName("joystick")
    [botnum].getBoundingClientRect();
  var rectCoords = {
    x: mousePos.x - (rect.x + rect.width / 2),
    y: mousePos.y - (rect.y + rect.height / 2),
  };

  if (rectCoords.x > rect.width / 2) {
    rectCoords.x = rect.width / 2;
  }
  if (rectCoords.x < rect.width / -2) {
    rectCoords.x = rect.width / -2;
  }
  if (rectCoords.y > rect.height / 2) {
    rectCoords.y = rect.height / 2;
  }
  if (rectCoords.y < rect.height / -2) {
    rectCoords.y = rect.height / -2;
  }

  // morph square (x,y) to circle (x,y)
  var xx, yy, a;
  xx = Math.abs(rectCoords.x);
  yy = Math.abs(rectCoords.y);
  if (xx + yy <= 1e-10) a = 0.0;
  else if (xx >= yy) a = Math.cos(Math.atan(yy / xx));
  else a = Math.cos(Math.atan(xx / yy));
  rectCoords.x *= a;
  rectCoords.y *= a;

  // console.log(rectCoords); // debug

  return {
    x: (rectCoords.x * 2) / rect.width,
    y: (rectCoords.y * 2) / rect.height,
  };
}

function showTracker(MoveAmount, botnum) {
  var tracker = document.getElementsByClassName("tracker")[botnum];
  var trackerRect = tracker.getBoundingClientRect();
  var joystickRect = document
    .getElementsByClassName("joystick")
    [botnum].getBoundingClientRect();

  realMoveAmount = {
    x: MoveAmount.x * (joystickRect.width / 2),
    y: MoveAmount.y * (joystickRect.height / 2),
  };

  trackerHeight = document
    .getElementsByClassName("tracker")
    [botnum].getBoundingClientRect().height;

  tracker.style.position = "fixed";
  tracker.style.height = trackerHeight.toString() + "px";
  tracker.style.left =
    (
      joystickRect.x -
      trackerRect.width / 2 +
      joystickRect.width / 2 +
      realMoveAmount.x
    ).toString() + "px";
  tracker.style.top =
    (
      joystickRect.y -
      trackerRect.height / 2 +
      joystickRect.height / 2 +
      realMoveAmount.y
    ).toString() + "px";
}

function getMovementType(botnum) {
  if (document.getElementsByClassName("simple-movement")[botnum].checked) {
    return 0;
  } else if (
    document.getElementsByClassName("advanced-movement")[botnum].checked
  ) {
    return 1;
  } else {
    return 2;
  }
}

function getMoveAmount(type, botnum) {
  if (type == 0) {
    // simple movement
    if (bots[botnum].istracking) {
      var moveAmount = readJoystick(botnum);
      showTracker(moveAmount, botnum);
    } else {
      var moveAmount = { x: 0, y: 0 };
      showTracker(moveAmount, botnum);
    }
    return moveAmount;
  } else if (type == 1) {
    //advanced movement
    //TODO
  } else {
    //code movement
    //TODO
  }
}

function checkColisions(botnum, wannaberot, wannabeX, wannabeY) {
  var colisions = { rot: false, x: false, y: false };

  Object.values(colisions).forEach((val) => {
    // calculate colisions for each movement (asuming calculation for combination would wield different result in minority of cases)
    // use checkPointInPoly([{}], x, y)
  });

  return colisions;
}

var c = document.getElementById("fieldcanvas");
var ctx = c.getContext("2d");

var GamePiece;

function startGame() {
  bots = new Array(2);
  bots[0] = new bot(
    TEAMS[0].bot, // details
    TEAMS[0].color, // color
    TEAMS[0].base.x + TEAMS[0].base.width / 2, //x pos
    TEAMS[0].base.y + TEAMS[0].base.height / 2, //y pos
    180 //rotation
  );
  bots[1] = new bot(
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

function bot(bot, color, x, y, rot) {
  this.profiles = bot.profiles;
  this.color = color;
  this.motorpoints = bot.motorpoints;
  this.sensor = bot.sensor;
  this.rotation = rot;
  this.x = x;
  this.y = y;

  this.istracking = 0;

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

      ctx.moveTo(profile[0].x, profile[0].x);
      ctx.beginPath();
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
      ctx.arc(motorpoint.x, motorpoint.y, motorpoint.size, 0, DEGtoRAD(360));
      ctx.closePath();
      ctx.fillStyle = MOTORFILL;
      ctx.fill();
    });

    ctx.beginPath();
    ctx.arc(this.sensor.x, this.sensor.y, this.sensor.size, 0, DEGtoRAD(360));
    ctx.closePath();
    ctx.fillStyle = SENSORFILL;
    ctx.fill();

    // ctx.translate(-this.x, -this.y);
    ctx.restore();
    // console.log("drawcomp"); //debug
  };

  this.move = function (moveType, moveAmount, botnum) {
    if (moveType == 0) {
      //simple movement
      var wannaberot =
        this.rotation + moveAmount.x * TEAMS[botnum].bot.maxrotationspeed;
      if (wannaberot > 360) {
        wannaberot -= 360;
      } else if (wannaberot < 0) {
        wannaberot += 360;
      }

      var speed = -moveAmount.y * TEAMS[botnum].bot.maxspeed;
      var wannabeX = this.x + speed * Math.sin(DEGtoRAD(this.rotation));
      var wannabeY = this.y - speed * Math.cos(DEGtoRAD(this.rotation));

      //check colisions
      if (!checkColisions(botnum, wannaberot, wannabeX, wannabeY)) {
        this.rotation = wannaberot;
        this.x = wannabeX;
        this.y = wannabeY;
      }
    } else if (moveType == 1) {
      //advanced movement
      //TODO
    } else {
      //code movement
      //TODO
    }
  };

  this.update = function (botnum) {
    this.move(
      getMovementType(botnum),
      getMoveAmount(getMovementType(botnum), botnum),
      botnum
    );
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
  for (let botnum = 0; botnum < bots.length; botnum++) {
    const bot = bots[botnum];
    bot.update(botnum);
  }
}

function track(index) {
  for (let botnum = 0; botnum < bots.length; botnum++) {
    const bot = bots[botnum];
    if (bot.istracking) {
      bot.istracking = 0;
      return;
    }
  }

  bots[index].istracking = !bots[index].istracking;
}

startGame();
