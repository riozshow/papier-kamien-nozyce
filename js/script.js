window.onresize = () => {
  repositionFigures();
};

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

selectedFigure.addListener(repositionFigures);
selectedFigure.addListener(() => {
  if (selectedFigure.state && roundTime.state === initialRoundTime) {
    startTimer();
  }
});
selectedFigure.addListener(() => {
  if (!selectedFigure.state) return;
  const figure = [...document.querySelectorAll(".figure.player")].find(
    (figure) => figure.code === selectedFigure.state.code
  );
  if (figure) {
    figure.classList.add("selected");
  }
});

computerFigure.addListener(() => repositionFigures(true));
computerFigure.addListener(() => {
  if (!computerFigure.state) return;
  const figure = [...document.querySelectorAll(".figure.computer")].find(
    (figure) => figure.code === computerFigure.state.code
  );
  if (figure) {
    figure.classList.add("selected");
  }
});

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

roundTime.addListener(() => {
  timerBox.innerHTML = (Math.floor(roundTime.state / 100) / 10).toFixed(1);
});

roundTime.addListener(() => {
  if (roundTime.state <= 0 && activeInterval.state) {
    clearInterval(activeInterval.state);
    finishRound();
  }
});

roundsBox.onchange = (e) => {
  totalRounds.setState(e.target.value);
};
