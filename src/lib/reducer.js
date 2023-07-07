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

  initialState.faceUpCards.push(deck.pop());
  initialState.faceUpCards.push(deck.pop());
  initialState.faceUpCards.push(deck.pop());
  for (const card of initialState.faceUpCards) {
    card.faceUp = true;
  }

  initialState.faceDownCards = deck;

  return initialState;
}

export function reducer(state, action) {
  switch (action.type) {
    case "REVEAL_CARDS":
      const nextThreeCards = state.faceDownCards.slice(0, 3).map((card) => {
        return { ...card, faceUp: true };
      });
      return {
        ...state,
        faceUpCards: [...state.faceUpCards, ...nextThreeCards],
        faceDownCards: state.faceDownCards.slice(3),
      };

    default:
      return stack;
  }
  return state;
}
