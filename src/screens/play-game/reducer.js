export const initialPinState = {
  0: { score: 2, pressed: false, fixed: false },
  1: { score: 3, pressed: false, fixed: false },
  2: { score: 5, pressed: false, fixed: false },
  3: { score: 3, pressed: false, fixed: false },
  4: { score: 2, pressed: false, fixed: false }
};

// const initialStateCopy = JSON.parse(JSON.stringify(initialState));

export function Pins(state = { ...initialPinState }, action) {
  switch (action.type) {
    case "undoPins":
    case "updatePin": {
      return action.payload;
    }
    case "resetPin": {
      return initialPinState;
    }
    default:
      return state;
  }
}
