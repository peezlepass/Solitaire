import { createDeck, revealCards, hideCards } from "./deck";
import { isValidAceSpacePlacement, isValidStackPlacement } from "./gameLogic";

export function init() {
  const initialState = {
    faceDownCards: [],
    faceUpCards: [],
    hiddenCards: [],
    spacesForAces: [[], [], [], []],
    stacks: [[], [], [], [], [], [], []],

    selected: [],
    selectionSource: null,
    selectionSourceIndex: null,

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
        selectionSource: "stacks",
        selectionSourceIndex: action.payload.stackIndex,
      };
    case "SELECT_CARD_FROM_ACE_SPACE":
      return {
        ...state,
        spacesForAces: state.spacesForAces.map((aceSpace, index) => {
          if (action.payload.aceSpaceIndex === index) {
            return aceSpace.filter((card) => {
              return card !== action.payload.selected;
            });
          } else {
            return aceSpace;
          }
        }),
        selected: [action.payload.selected],
        selectionSource: "aceSpace",
        selectionSourceIndex: action.payload.aceSpaceIndex,
        mouse: action.payload.mouse,
        selectionOffset: action.payload.selectionOffset,
      };
    case "PLACE_CARDS_ON_STACK":
      const isValidPlacement = true;
      if (
        isValidStackPlacement(
          state.stacks[action.payload.stackIndex],
          state.selected
        )
      ) {
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
          selectionSource: null,
          selectionSourceIndex: null,
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
      } else {
        return state;
      }

    case "RETURN_SELECTED_CARDS":
      if (state.selectionSource === "faceUpRow") {
        return {
          ...state,
          selected: [],
          selectionSource: null,
          faceUpCards: [...state.faceUpCards, state.selected[0]],
        };
      } else if (state.selectionSource === "stacks") {
        return {
          ...state,
          selected: [],
          selectionSource: null,
          selectionSourceIndex: null,
          mouse: {
            x: null,
            y: null,
          },
          selectionOffset: {
            x: 0,
            y: 0,
          },
          stacks: state.stacks.map((stack, index) => {
            if (state.selectionSourceIndex === index) {
              return [...stack, ...state.selected];
            } else {
              return stack;
            }
          }),
        };
      } else if (state.selectionSource === "aceSpace") {
        return {
          ...state,
          selected: [],
          selectionSource: null,
          selectionSourceIndex: null,
          spacesForAces: state.spacesForAces.map((aceSpace, index) => {
            if (state.selectionSourceIndex === index) {
              return [...aceSpace, ...state.selected];
            } else {
              return aceSpace;
            }
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
      } else {
        return state;
      }
    case "RIGHT_CLICK_LAST_CARD_IN_COLUMN":
      // Figure out the stack
      const stack = state.stacks[action.payload.stackIndex];
      // Figure out the last card they clicked on
      const card = stack[stack.length - 1];
      // Loop over ace spaces to find a valid place to put the card
      for (let i = 0; i < state.spacesForAces.length; i++) {
        // use our game logic to test if it's valid
        if (isValidAceSpacePlacement([state.spacesForAces[i]], [card])) {
          return {
            ...state,
            spacesForAces: state.spacesForAces.map((aceSpace, index) => {
              if (i === index) {
                // Is the valid space, add it
                return [...aceSpace, card];
              } else {
                // Is not the space we are jumping to
                return aceSpace;
              }
            }),
            // Remove the card from the stack, and make sure the last card is face up
            stacks: state.stacks.map((stack, index) => {
              // If it's the stack we care about
              if (index === action.payload.stackIndex) {
                // Take away the card
                const newStack = stack.slice(0, stack.length - 1);
                // Set last card to face up
                return newStack.map((card, cardIndex) => {
                  if (cardIndex === newStack.length - 1) {
                    return {
                      ...card,
                      faceUp: true,
                    };
                  } else {
                    return card;
                  }
                });
              } else {
                // not a stack we care about, do nothing.
                return stack;
              }
            }),
          };
        } else {
          // if it's not valid in this ace space, 'continue' so we do try the next one.
          continue;
        }
      }

      return {
        ...state,
      };

    case "REVEAL_CARDS":
      const nextThreeCards = revealCards(state.faceDownCards.slice(0, 3));

      return {
        ...state,
        faceUpCards: nextThreeCards,
        hiddenCards: [...state.hiddenCards, ...state.faceUpCards],
        faceDownCards: state.faceDownCards.slice(3),
      };

    case "RESET_DECK":
      const hiddenCards = [...state.hiddenCards, ...state.faceUpCards];
      const newFaceDownCards = hideCards(hiddenCards);
      return {
        ...state,
        faceUpCards: [],
        faceDownCards: newFaceDownCards,
        hiddenCards: [],
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
        selectionSource: "faceUpRow",
        selectionSourceIndex: null,
      };

    case "PLACE_CARD_ON_ACE_SPACE":
      if (
        isValidAceSpacePlacement(
          state.spacesForAces[action.payload.aceSpaceIndex],
          state.selected
        )
      ) {
        return {
          ...state,
          selected: [],
          selectionSource: null,
          selectionSourceIndex: null,
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
      } else {
        return state;
      }

    default:
      console.error("Received an unexpected action", error);
  }
  return state;
}
