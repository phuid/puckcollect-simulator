const PUCK_WIDTH = 40;
const PUCK_HEIGHT = 20;

//field
const FIELDSIZE = {
  x: 2500,
  y: 2500,
};

const TEAMS = [
  {
    color: "#FF0000", //hex mandatory
    bot: {
      profiles: [
        [
          { x: -360 + 150, y: -253 + 150 },
          { x: 102 + 150, y: -200 + 150 },
          { x: -63 + 150, y: 83 + 150 },
          { x: -336 + 150, y: 83 + 150 },
        ],
        [
          { x: -171 + 150, y: -174 + 150 },
          { x: -85 + 150, y: -164 + 150 },
          { x: -63 + 150, y: -75 + 150 },
          { x: -129 + 150, y: -22 + 150 },
          { x: -260 + 150, y: -24 + 150 },
          { x: -296 + 150, y: -120 + 150 },
        ],
        [
          { x: -159 + 150, y: -120 + 150 },
          { x: -128 + 150, y: -59 + 150 },
          { x: -225 + 150, y: -100 + 150 },
        ],
      ],
      motorpoints: [
        { x: -164, y: -50, size: 30 },
        { x: 168, y: -51, size: 30 },
      ],
      sensor: {
        x: -16,
        y: 150,
        precision: 1, //deg
        datatime: 150, //ms per rotation
        seesprofiles: [true, false, false], //booleans - [bottom(with pucks; index 0), mid, top]
        size: 50,
      },
      maxspeed: 100, // mm/s
      maxrotationspeed: 3, // rotations/s
    },
    base: {
      x: 0,
      y: 0,
      width: 500,
      height: 500,
    },
  },
  {
    color: "#000065", //hex mandatory
    bot: {
      profiles: [
        [
          { x: -250 + 115.122, y: -250 + 40.125 },
          { x: -250 + 250, y: -250 + 0.521109 },
          { x: -250 + 384.879, y: -250 + 40.125 },
          { x: -250 + 476.934, y: -250 + 146.363 },
          { x: -250 + 496.94, y: -250 + 285.505 },
          { x: -250 + 438.544, y: -250 + 413.374 },
          { x: -250 + 320.286, y: -250 + 489.373 },
          { x: -250 + 179.714, y: -250 + 489.373 },
          { x: -250 + 61.4564, y: -250 + 413.374 },
          { x: -250 + 3.06044, y: -250 + 285.505 },
          { x: -250 + 23.066, y: -250 + 146.363 },
          { x: -250 + 115.122, y: -250 + 40.125 },
        ],
        [
          { x: -250 + 0.706394, y: -250 + 250 },
          { x: -250 + 248.5, y: -250 + 1.70782 },
          { x: -250 + 496.294, y: -250 + 250 },
          { x: -250 + 248.5, y: -250 + 498.292 },
          { x: -250 + 0.706394, y: -250 + 250 },
        ],
        [
          { x: -250 + 224.722, y: -250 + 274.5 },
          { x: -250 + 250, y: -250 + 201.528 },
          { x: -250 + 275.278, y: -250 + 274.5 },
          { x: -250 + 224.722, y: -250 + 274.5 },
        ],
      ],
      motorpoints: [
        { x: -250 + 50, y: 0, size: 30 },
        { x: 250 - 50, y: 0, size: 30 },
      ],
      sensor: {
        x: -0,
        y: -170,
        precision: 1, //deg
        datatime: 150, //ms per rotation
        seesprofiles: [true, false, false], //booleans - [bottom(with pucks; index 0), mid, top]
        size: 50, //size, sensor body occupies
      },
      maxspeed: 50, // mm/s
      maxrotationspeed: 3, // rotations/s
    },
    base: {
      x: 2000,
      y: 2000,
      width: 500,
      height: 500,
    },
  },
];

const PROFILESHADE = "55";
const BASESHADE = "33";
const MOTORFILL = "#FFFF00";
const SENSORFILL = "#55DFDF";
