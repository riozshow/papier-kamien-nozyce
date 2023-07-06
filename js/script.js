gameStarted.addListener(displayBoard);
gameStarted.addListener(loadGame);

gameStarted.setState(false);

startGameButton.onclick = () => {
  gameStarted.setState(true);
};

exitGameButton.onclick = () => {
  gameStarted.setState(false);
};

playerSlots.forEach((slot) => {
  slot.onclick = () => {
    const code = slot.className.split("-")[1][0];
    const figure = [...document.querySelectorAll(".figure.player")].find(
      (figure) => figure.code == code
    );
    if (figure) {
      selectFigure(figure);
    }
  };
});

selectedFigure.addListener(() => {
  repositionFigures();
  const figure = [...document.querySelectorAll(".figure.player")].find(
    (figure) => figure.code === selectedFigure.state.code
  );

  if (figure) {
    figure.classList.add("selected");
    figure.moveTo(playerBattleSlot);
  }
});

window.onresize = () => {
  repositionFigures();
};

controlsReady.addListener(() => {
  if (controlsReady.state) {
    playerSlots.forEach((slot) => slot.classList.add("ready"));
  } else {
    playerSlots.forEach((slot) => slot.classList.remove("ready"));
  }
});

score.addListener(() => {
  playerScore.innerHTML = score.state.player;
  computerScore.innerHTML = score.state.computer;
});

round.addListener(() => {
  roundInfo.innerHTML = round.state;
});
