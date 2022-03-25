import kaboom from "kaboom"
import patrol from "./patrol"


kaboom(
  {
    // Hintergrund der Welt: blau
    background: [166, 209, 247],
    burp: true
  }
);

const MOVE_SPEED = 400;
const GAME_OVER = 6 * 64;

//Sprites laden
loadSprite("bean", "sprites/bean.png");
loadSprite("grass", "sprites/grass.png");
loadSprite("ghosty", "sprites/ghosty.png");
loadSprite("coin", "sprites/coin.png")

//Szene erstellen: game
scene("game", ({score}) => {
  const levels = [
   [
      "                                        ",
      "      C        C              C         ",
      "      =      ==             ===         ",
      "                                        ",
      "    = =  =   G  =    ===    = G   =   G=",
      "=======  ========  =======  ============",
    ], 
  ];

  // Alle Objekte im Spiel konfigurieren
  const levelConfig = {
    width: 64,
    height: 64,
    "=": () => [
      sprite("grass"),
      area(), // erstmal weglassen und spieler durchfallen lassen
      solid(), // dito!
    ],
    "G": () => [
      sprite("ghosty"),
      area(),
      body(),
      "enemy",
      patrol(),
    ],
    "C": () => [
      sprite("coin"),
      area(),
      "coin",
    ]
  }

  //Level laden
  addLevel(levels[0], levelConfig);

  const player = add([
    sprite("bean"),
    pos(0,0),
    area(),
    body(),
    "player"
  ]);

  const scoreLabel = add([
    pos(0,0),
    fixed(),
    text("Score: " + score, {size: 40}),
  ])

  function increaseScore(point){
    score = score + point;
    scoreLabel.text = "Score: " + score;
  }

  keyDown("B", () => {
    burp()
  })

  keyDown("right", () => {
    player.move(MOVE_SPEED, 0)
  });

  keyDown("left", () => {
    player.move(-MOVE_SPEED, 0)
  });

  keyDown("up", () => {
    if(player.grounded()){
      player.jump();
    }
  })

  onUpdate(() => { // wo ist action() beschrieben?
    camPos(player.pos);
  })

  onUpdate("player", () => {
    if(player.pos.y > GAME_OVER){
      player.destroy();
      go("gameover");
    }
  })

  player.collides("enemy", (enemy) => {
    if(player.grounded()){
      player.destroy();
      go("gameover");
    } else {
      enemy.destroy();
      increaseScore(2);
    }
  })

  player.collides("coin", (coin) => {
    coin.destroy();
    increaseScore(1);
  });  
});

scene("gameover", () => {
  add([
    fixed(),
    pos(0,0),
    rect(width(), height()),
    color(0,0,0)
  ]),
  add([
    fixed(),
    pos(width()/2,height()/2),
    origin("center"),
    text("GAME OVER")
  ])
})

// Das Spiel starten
go("game", {score: 0});