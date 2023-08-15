import AceSpace from "../AceSpace";
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
    case "SELECT_CARDS_FROM_STACKS":
      return {
        ...state,
        stacks: state.stacks.map((stack, index) => {
          if (action.payload.stackIndex === index) {
            // Is the stack we selected from
            return stack.filter((card) => {
              return !action.payload.selected.includes(card);
            });
          } else {
            // Is not our stack
            return stack;
          }
        }),
        selected: action.payload.selected,
        mouse: action.payload.mouse,
        selectionOffset: action.payload.selectionOffset,
      };
    case "PLACE_CARDS_ON_STACK":
      const newStacks = state.stacks.map((stack, index) => {
        if (action.payload.stackIndex === index) {
          // Is the space we dropped on
          return [...stack, ...state.selected];
        } else {
          // Is not the space we dropped on
          return stack;
        }
      });
      return {
        ...state,
        selected: [],
        stacks: newStacks.map((stack) => {
          return stack.map((card, cardIndex) => {
            if (cardIndex === stack.length - 1) {
              return {
                ...card,
                faceUp: true,
              };
            } else {
              return card;
            }
          });
        }),
        mouse: {
          x: null,
          y: null,
        },
        selectionOffset: {
          x: 0,
          y: 0,
        },
      };
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

    case "PLACE_CARD_ON_ACE_SPACE":
      return {
        ...state,
        selected: [],
        spacesForAces: state.spacesForAces.map((aceSpace, index) => {
          if (action.payload.aceSpaceIndex === index) {
            // Is the space we dropped on
            return [...aceSpace, state.selected[0]];
          } else {
            // Is not the space we dropped on
            return aceSpace;
          }
        }),
        stacks: state.stacks.map((stack) => {
          return stack.map((card, cardIndex) => {
            if (cardIndex === stack.length - 1) {
              return {
                ...card,
                faceUp: true,
              };
            } else {
              return card;
            }
          });
        }),
        mouse: {
          x: null,
          y: null,
        },
        selectionOffset: {
          x: 0,
          y: 0,
        },
      };
    default:
      console.error("Received an unexpected action", error);
  }
  return state;
}
