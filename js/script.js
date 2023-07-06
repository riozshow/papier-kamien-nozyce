gameStarted.addListener(displayBoard);
gameStarted.addListener(loadGame);

gameStarted.setState(false);

startGameButton.onclick = () => {
  gameStarted.setState(true);
};

exitGameButton.onclick = () => {
  gameStarted.setState(false);
};

selectedFigure.addListener(() => {
  repositionFigures();
  const figure = [...document.querySelectorAll(".figure")].find(
    (figure) => figure.code === selectedFigure.state.code
  );

  if (figure) {
    figure.moveTo(playerBattleSlot);
  }
});

window.onresize = () => {
  repositionFigures();
};
