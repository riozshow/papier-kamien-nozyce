function useState(value) {
  const addListener = (listenerFunction) => {
    if (typeof listenerFunction !== "function") return;
    listeners.push(listenerFunction);
  };

  const removeListener = (listenerFunction) => {
    if (typeof listenerFunction !== "function") return;
    listeners = listeners.filter((listener) => listener !== listenerFunction);
  };

  const dispatch = () => {
    for (const listener of listeners) {
      listener();
    }
  };

  const setState = (value) => {
    stateObject.state = value;
    dispatch();
  };

  const listeners = [];
  const stateObject = { state: value, addListener, removeListener, setState };

  return stateObject;
}

const gameStarted = useState(false);
const totalRounds = useState(5);

const controlsReady = useState(false);

const computerBusy = useState(false);

const computerFigure = useState();
const selectedFigure = useState();

const score = useState({ computer: 0, player: 0 });
const round = useState(1);

const initialRoundTime = 5000;
const roundTime = useState(initialRoundTime);
const activeInterval = useState();
