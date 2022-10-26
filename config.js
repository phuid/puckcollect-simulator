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
      maxspeed: 100,
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
        { x: -164, y: 50, size: 30 },
        { x: 168, y: 51, size: 30 },
      ],
      sensor: {
        x: -16,
        y: -71,
        precision: 1, //deg
        datatime: 150, //ms per rotation
        seesprofiles: [true, false, false], //booleans - [bottom(with pucks; index 0), mid, top]
        size: 50, //size, sensor body occupies
      },
      maxspeed: 300, // mm/s
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
