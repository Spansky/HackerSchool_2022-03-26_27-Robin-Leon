import kaboom from "kaboom"

kaboom(
  {
    // Hintergrund der Welt: blau
    background: [166, 209, 247],
  }
);

// ein paar Konstanten
const SPIELER_TEMPO = 400;
const MAX_FREIER_FALL = 6 * 64;

//Sprites laden
loadSprite("grass", "sprites/grass.png");
loadSprite("bean", "sprites/bean.png");
loadSprite("ghosty", "sprites/ghosty.png");

//Szene erstellen: game
scene("game", () => {
  const levels = [
   [
      "                                        ",
      "    =                                   ",
      "                                        ",
      "                         =       G     =",
      "======================   ===============",
      "                                        ",
    ], 
  ];

  // Alle Objekte im Spiel konfigurieren
  const levelConfig = {
    width: 64,
    height: 64,
    "=": () => [
      sprite("grass"),
      area(),
      solid(),
    ],
    "G": () => [
      sprite("ghosty"),
      area(),
      body(),
      "enemy"
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
  ])

  keyDown("right", ()=>{
    player.move(SPIELER_TEMPO,0);
  });

  keyDown("left", ()=>{
    player.move(-SPIELER_TEMPO,0);
  });

  keyDown("space", () => {
    if(player.grounded()){
      player.jump();
    }
  });

  // Kamera auf Spielfigur ausrichten
  onUpdate(() => {
    camPos(player.pos);
  });

  onUpdate("player", () => {
    if(player.pos.y > MAX_FREIER_FALL) {
      player.destroy();
    }
  })
  
});

// Das Spiel starten
go("game");