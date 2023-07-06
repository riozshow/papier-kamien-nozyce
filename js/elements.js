const topBar = document.querySelector(".top-bar");

const board = document.querySelector(".board");
const welcome = document.querySelector(".welcome");
const game = document.querySelector(".game");

const roundsBox = document.querySelector("input");

const startGameButton = document.querySelector("#start-game");
const exitGameButton = document.querySelector("#exit-game");

const playerSlots = [...document.querySelectorAll("[class^=slot-]")].filter((slot) =>
  slot.classList.contains("player")
);

const computerSlots = [...document.querySelectorAll("[class^=slot-]")].filter((slot) =>
  slot.classList.contains("computer")
);

const playerBattleSlot = document.querySelector(".battle-slot.player");
const computerBattleSlot = document.querySelector(".battle-slot.computer");

const timerBox = document.querySelector(".timer");

const playerScore = document.querySelector("#player-score");
const computerScore = document.querySelector("#computer-score");
const roundInfo = document.querySelector("#round");

const finalScreen = document.querySelector(".final-screen");
const finalHeader = document.querySelector(".final-header");
