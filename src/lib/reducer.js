import { createDeck } from "./deck";

export function init() {
  const initialState = {
    faceDownCards: [],
    faceUpCards: [],
    visibleFaceUpCards: 3,
    spacesForAces: [[], [], [], []],
    stacks: [[], [], [], [], [], [], []],
  };

  const deck = createDeck();
  for (let i = 0; i < initialState.stacks.length; i++) {
    for (let j = 0; j < i + 1; j++) {
      initialState.stacks[i].push(deck.pop());
    }
    initialState.stacks[i][initialState.stacks[i].length - 1].faceUp = true;
  }

  initialState.spacesForAces[1].push(deck.pop());

  return initialState;
}

export function reducer(state, action) {
  return state;
}
