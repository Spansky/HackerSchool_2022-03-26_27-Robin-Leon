import kaboom from "kaboom"

kaboom(
  {
    // Hintergrund der Welt: blau
    background: [166, 209, 247],
  }
);

// ein paar Konstanten
const SPIELER_TEMPO = 400;

//Sprites laden
loadSprite("grass", "sprites/grass.png");
loadSprite("bean", "sprites/bean.png");

//Szene erstellen: game
scene("game", () => {
  const levels = [
   [
      "                                        ",
      "    =                                   ",
      "                                        ",
      "                                        ",
      "======================   ======   ======",
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
  
});

// Das Spiel starten
go("game");