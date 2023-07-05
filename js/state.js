function useState(value) {
  const addListener = (listenerFunction) => {
    if (typeof listenerFunction !== "function") return;
    listeners.push(listenerFunction);
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
  const stateObject = { state: value, addListener, setState };
  
  return stateObject;
}

const gameStarted = useState(false);
