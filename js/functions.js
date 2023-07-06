/* Start Screen */

function displayBoard() {
  const showContent = (boardContent) => {
    document.querySelectorAll(".board-content").forEach((board) => {
      board.classList.remove("show");
    });
    boardContent.classList.add("show");
    if (boardContent === game) {
      board.classList.add("full");
      title.classList.add("small");
    } else {
      board.classList.remove("full");
      title.classList.remove("small");
      controlsReady.setState(false);
    }
  };
  gameStarted.state ? showContent(game) : showContent(welcome);
}

/* Controls */

function createFigureElement(figure) {
  const moveTo = (element) => {
    setTimeout(() => {
      const elementPosition = element.getBoundingClientRect();
      div.style.left = `${elementPosition.left + element.offsetWidth / 2 - div.offsetWidth / 2}px`;
      div.style.top = `${elementPosition.top + element.offsetHeight / 2 - div.offsetHeight / 4}px`;
    }, timeOffset)
  };

  const view = (show) => {
    setTimeout(() => {
      show ? div.classList.add("loaded") : div.classList.remove("loaded");
    }, timeOffset);
  };

  const div = document.createElement("div");
  const timeOffset = 10;
  
  Object.assign(div, figure);
  div.className = "figure";
  div.innerHTML = figure.icon;
  div.moveTo = moveTo;
  div.view = view;
  return div;
}

function selectFigure(e) {
  if (!controlsReady.state) return;
  selectedFigure.setState(e.target);
}

function loadControls() {
  document.querySelectorAll(".figure").forEach((figure) => {
    figure.remove();
  });

  FIGURES.map((figure) => {
    const figureElement = createFigureElement(figure);
    figureElement.onclick = (e) => {
      selectFigure(e);
    };
    document.body.append(figureElement);
  });

  board.ontransitionend = () => {
    repositionFigures();
  }

  controlsReady.setState(true);
}

function toggleFiguresVisibility(on) {
  document.querySelectorAll(".figure").forEach((figure) => {
    figure.view(on);
  });
}

function repositionFigures() {
  document.querySelectorAll(".figure").forEach((figure) => {
    const slot = document.querySelector(`.slot-${figure.code}`);
    figure.classList.remove('selected')
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
