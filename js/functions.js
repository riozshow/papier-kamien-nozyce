/* Start Screen */

function displayBoard() {
  const showContent = (boardContent) => {
    document.querySelectorAll(".board-content").forEach((board) => {
      board.classList.remove("show");
    });
    boardContent.classList.add("show");
    if (boardContent === game) {
      exitGameButton.classList.remove("hidden");
      board.classList.add("full");
      topBar.classList.add("game");
    } else {
      exitGameButton.classList.add("hidden");
      board.classList.remove("full");
      topBar.classList.remove("game");
      controlsReady.setState(false);
    }
  };
  gameStarted.state ? showContent(game) : showContent(welcome);
}

/* Controls */

function createFigureElement(figure) {
  const moveTo = (element) => {
    const elementPosition = element.getBoundingClientRect();
    div.style.left = `${elementPosition.left + element.offsetWidth / 2 - div.offsetWidth / 2}px`;
    div.style.top = `${elementPosition.top + element.offsetHeight / 2 - div.offsetHeight / 2}px`;
  };

  const view = (show) => {
    setTimeout(() => {
      show ? div.classList.add("loaded") : div.classList.remove("loaded");
    }, timeOffset);
  };

  const div = document.createElement("div");
  const timeOffset = 10;

  Object.assign(div, figure);
  div.moveTo = moveTo;
  div.view = view;
  return div;
}

function selectFigure(figure) {
  if (!controlsReady.state) return;
  selectedFigure.setState(figure);
}

function loadControls() {
  document.querySelectorAll(`.figure`).forEach((figure) => {
    figure.remove();
  });

  FIGURES.map((figure) => {
    const playerFigureElement = createFigureElement(figure);
    const computerFigureElement = createFigureElement(figure);
    playerFigureElement.classList.add("player");
    computerFigureElement.classList.add("computer");
    document.body.append(playerFigureElement);
    document.body.append(computerFigureElement);
  });

  board.ontransitionend = () => {
    repositionFigures();
    controlsReady.setState(true);
    board.ontransitionend = null;
  };
}

function toggleFiguresVisibility(on) {
  document.querySelectorAll(".figure").forEach((figure) => {
    figure.view(on);
  });
}

function repositionFigures() {
  document.querySelectorAll(".figure.player").forEach((figure) => {
    if (figure === selectedFigure.state) {
      figure.moveTo(playerBattleSlot);
      return;
    }
    const slot = playerSlots.find((slot) => slot.classList.contains(`slot-${figure.code}`));
    figure.classList.remove("selected");
    figure.moveTo(slot);
  });

  document.querySelectorAll(".figure.computer").forEach((figure) => {
    if (figure === computerFigure.state) {
      figure.moveTo(computerBattleSlot);
      return;
    }
    const slot = computerSlots.find((slot) => slot.classList.contains(`slot-${figure.code}`));
    figure.classList.remove("selected");
    figure.moveTo(slot);
  });
}

/* Start Game */

function loadGame() {
  if (!gameStarted.state) {
    toggleFiguresVisibility(false);
    return;
  }

  resetTimer();
  loadControls();
  toggleFiguresVisibility(true);
}

/* Computer Move */

function getReactionTime() {
  return Math.random() * 1000 + 1000;
}

function triggerComputerMoves() {
  if (computerBusy.state) return;

  computerBusy.setState(true);

  let reactionTime = getReactionTime();
  if (reactionTime < roundTime.state) {
    setTimeout(() => {
      [computerBleef, computerAttack][Math.floor(Math.random() * 2)]();
    }, reactionTime);
  } else {
    let reactionTime = getReactionTime();
    setTimeout(() => {
      computerAttack();
    }, reactionTime);
  }
}

function computerBleef() {
  const playerFigure = FIGURES.find((figure) => figure.code == selectedFigure.state.code);
  const bleefFigure = FIGURES.find((figure) => figure.code === playerFigure.beats);
  const bleefElement = [...document.querySelectorAll(".figure.computer")].find(
    (figure) => figure.code == bleefFigure.code
  );
  if (bleefElement) {
    computerFigure.setState(bleefElement);
  }
  const reactionTime = getReactionTime();
  setTimeout(() => {
    computerAttack();
  }, roundTime.state - reactionTime);
}

function computerAttack() {
  if (roundTime.state === 0) {
    computerBusy.setState(false);
    return;
  }
  const attackFigure = FIGURES.find((figure) => figure.beats === selectedFigure.state.code);
  const attackElement = [...document.querySelectorAll(".figure.computer")].find(
    (figure) => figure.code == attackFigure.code
  );
  if (attackElement) {
    computerFigure.setState(attackElement);
  }
  computerBusy.setState(false);
}

/* Timer */

function startTimer() {
  activeInterval.setState(
    setInterval(() => {
      roundTime.setState(roundTime.state - 50);
      triggerComputerMoves();
    }, 50)
  );
}

function resetTimer() {
  if (activeInterval.state) {
    selectedFigure.setState();
    computerFigure.setState();
    clearInterval(activeInterval.state);
  }
  roundTime.setState(initialRoundTime);
}

function finishRound() {
  controlsReady.setState(false);
}
