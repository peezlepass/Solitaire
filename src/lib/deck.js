const suits = ["hearts", "diamonds", "clubs", "spades"];

export function createDeck() {
  const cards = [];
  for (const suit of suits) {
    for (let j = 1; j < 14; j++) {
      cards.push({ suit, value: j, faceUp: false });
    }
  }

  return shuffle(cards);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let t = array[i];
    array[i] = array[j];
    array[j] = t;
  }

  return array;
}

export function revealCards(array) {
  return array.map((card) => {
    return { ...card, faceUp: true };
  });
}

export function hideCards(array) {
  return array.map((card) => {
    return { ...card, faceUp: false };
  });
}
