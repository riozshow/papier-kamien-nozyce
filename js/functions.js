/* Start Screen */

function displayBoard() {
  const showContent = (boardContent) => {
    document.querySelectorAll(".board-content").forEach((board) => {
      board.classList.remove("show");
    });
    boardContent.classList.add("show");
    if (boardContent === game) {
      board.classList.add("full");
      topBar.classList.add("game");
    } else {
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
    div.style.left = `${
      elementPosition.left + element.offsetWidth / 2 - div.offsetWidth / 2 + 5
    }px`;
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
  document.querySelectorAll(".figure.player").forEach((figure) => {
    figure.remove();
  });

  FIGURES.map((figure) => {
    const figureElement = createFigureElement(figure);
    figureElement.classList.add("player");
    document.body.append(figureElement);
  });

  board.ontransitionend = () => {
    repositionFigures();
    controlsReady.setState(true);
    board.ontransitionend = null;
  };
}

function toggleFiguresVisibility(on) {
  document.querySelectorAll(".figure.player").forEach((figure) => {
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
}

/* Start Game */

function loadGame() {
  if (!gameStarted.state) {
    toggleFiguresVisibility(false);
    return;
  }

  loadControls();
  toggleFiguresVisibility(true);
}

/* Computer Move */
