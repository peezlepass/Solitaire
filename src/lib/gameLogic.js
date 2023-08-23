export function isValidStackPlacement(stackCards, selectedCards) {
  if (stackCards.length === 0) {
    return selectedCards[0].value === 13;
  }

  const firstInSelected = selectedCards[0];
  const lastInStack = stackCards[stackCards.length - 1];

  return (
    firstInSelected.value === lastInStack.value - 1 &&
    oppositeColours(firstInSelected, lastInStack)
  );
}

const oppositeColourMap = {
  hearts: ["spades", "clubs"],
  diamonds: ["spades", "clubs"],
  spades: ["hearts", "diamonds"],
  clubs: ["hearts", "diamonds"],
};

function oppositeColours(cardA, cardB) {
  // if (cardA.suit === "hearts") {
  //   return cardB.suit === "clubs" || cardB.suit === "spades";
  // }
  return oppositeColourMap[cardA.suit].includes(cardB.suit);
}

export function isValidAceSpacePlacement(aceSpaceCards, selectedCards) {
  // It can't be a stack
  if (selectedCards.length > 1) {
    return false;
  }

  const card = selectedCards[0];
  // If it's empty it has to be an ace
  if (aceSpaceCards.length === 0) {
    if (card.value === 1) {
      return true;
    } else {
      return false;
    }
  }

  // Be the next number
  const lastCardInSpace = aceSpaceCards[aceSpaceCards.length - 1];
  if (
    lastCardInSpace.value === card.value - 1 &&
    lastCardInSpace.suit === card.suit
  ) {
    return true;
  } else {
    return false;
  }
}

export function hasWon(state) {
  return (
    state.spacesForAces[0].length +
      state.spacesForAces[1].length +
      state.spacesForAces[2].length +
      state.spacesForAces[3].length ===
    52
  );
}
