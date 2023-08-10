import { createDeck, revealCards, hideCards } from "./deck";

export function init() {
  const initialState = {
    faceDownCards: [],
    faceUpCards: [],
    visibleFaceUpCards: 3,
    spacesForAces: [[], [], [], []],
    stacks: [[], [], [], [], [], [], []],

    selected: [],
    mouse: {
      x: null,
      y: null,
    },
    selectionOffset: {
      x: 0,
      y: 0,
    },
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

    case "RESET_DECK":
      const newFaceDownCards = hideCards(state.faceUpCards);
      return {
        ...state,
        faceUpCards: revealCards(newFaceDownCards.slice(0, 3)),
        faceDownCards: newFaceDownCards.slice(3),
      };

    case "MOVE_MOUSE":
      return {
        ...state,
        mouse: {
          x: action.payload.x,
          y: action.payload.y,
        },
      };

    case "SELECT_CARD_FROM_FACE_UP_ROW":
      return {
        ...state,
        faceUpCards: state.faceUpCards.slice(0, -1),
        selected: action.payload.selected,
        mouse: action.payload.mouse,
        selectionOffset: action.payload.selectionOffset,
      };
    default:
      console.error("Received an unexpected action", error);
  }
  return state;
}
