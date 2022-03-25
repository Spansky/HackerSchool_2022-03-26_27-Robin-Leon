import kaboom from "kaboom"

kaboom(
  {
    // Hintergrund der Welt: blau
    background: [166, 209, 247],
  }
);

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
      "    ==================   ======   ======",
      "                                        ",
    ], 
  ];

  // Alle Objekte im Spiel konfigurieren
  const levelConfig = {
    width: 64,
    height: 64,
    "=": () => [
      sprite("grass")
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
});

// Das Spiel starten
go("game");