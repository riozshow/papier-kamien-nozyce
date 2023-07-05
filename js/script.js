gameStarted.addListener(displayBoard);

startGameButton.onclick = () => {
  gameStarted.setState(!gameStarted.state);
};
