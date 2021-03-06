var firstCardClicked;
var secondCardClicked;
var firstCardMergedItems;
var secondCardMergedItems;
var maxMatches = 9;
var matches = 0;
var attempts = 0;
var gamesPlayed = 0;
var hiddenCards = null;
var storeHiddenClasses = [];
var removeItemsArray = [];

const gameCards = document.getElementById('gameCards');
const container = document.getElementById('container');
const pokemonAgain = document.getElementById('pokemon-again');
const spongeAgain = document.getElementById('sponge-again');
const dinoAgain = document.getElementById('dino-again');
const thomasAgain = document.getElementById('thomas-again');
const youWin = document.querySelector('.you-win');
const pokemonButton = document.getElementById('pokemon');
const spongebobButton = document.getElementById('spongebob');
const thomasButton = document.getElementById('thomas');
const dinoButton = document.getElementById('dino');
const smallPokemonButton = document.getElementById('toPokemon');
const smallSpongebobButton = document.getElementById('toSpongebob');
const smallDinoButton = document.getElementById('toDino');
const smallThomasButton = document.getElementById('toThomas');
const startScreen = document.querySelector('.start-screen');
const winGif = document.getElementById('win-gif');
const playAgain = document.querySelector('.play-again-container');
const spongebobStyle = document.getElementById('spongebob-style');
const dinoStyle = document.getElementById('dino-style');
const thomasStyle = document.getElementById('thomas-style');
const pokemonStyle = document.getElementById('pokemon-style');

const card1 = {
  firstItem: 'backpack',
  secondItem: 'books',
  mergedItems: 'backpack_books'
};
const card2 = {
  firstItem: 'baseball',
  secondItem: 'bat',
  mergedItems: 'baseball_bat'
};
const card3 = {
  firstItem: 'burger',
  secondItem: 'fries',
  mergedItems: 'burger_fries'
};
const card4 = {
  firstItem: 'milk',
  secondItem: 'cup',
  mergedItems: 'milk_cup'
};
const card5 = {
  firstItem: 'eyes',
  secondItem: 'glasses',
  mergedItems: 'eyes_glasses'
};
const card6 = {
  firstItem: 'pants',
  secondItem: 'shirt',
  mergedItems: 'pants_shirt'
};
const card7 = {
  firstItem: 'paper',
  secondItem: 'pencil',
  mergedItems: 'paper_pencil'
};
const card8 = {
  firstItem: 'tv',
  secondItem: 'remote',
  mergedItems: 'tv_remote'
};
const card9 = {
  firstItem: 'shoes',
  secondItem: 'socks',
  mergedItems: 'shoes_socks'
};
// const card10 = {
//   firstItem: 'car',
//   secondItem: 'street',
//   mergedItems: 'car_street'
// };
const card11 = {
  firstItem: 'hair',
  secondItem: 'brush',
  mergedItems: 'hair_brush'
};
const card12 = {
  firstItem: 'hotdog',
  secondItem: 'bun',
  mergedItems: 'hotdog_bun'
};
const card13 = {
  firstItem: 'keyboard',
  secondItem: 'mouse',
  mergedItems: 'keyboard_mouse'
};
// const card14 = {
//   firstItem: 'lake',
//   secondItem: 'boat',
//   mergedItems: 'lake_boat'
// };
const card15 = {
  firstItem: 'pool',
  secondItem: 'trunks',
  mergedItems: 'pool_trunks'
};
const card16 = {
  firstItem: 'soap',
  secondItem: 'hands',
  mergedItems: 'soap_hands'
};
const card17 = {
  firstItem: 'trash',
  secondItem: 'trashcan',
  mergedItems: 'trash_trashcan'
};
const card18 = {
  firstItem: 'toothbrush',
  secondItem: 'toothpaste',
  mergedItems: 'toothpaste_toothbrush'
};
const allCards = [
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
  card7,
  card8,
  card9,
  // card10,
  card11,
  card12,
  card13,
  // card14,
  card15,
  card16,
  card17,
  card18
];

createCards();
addToRemoveItemsArray();
gameCards.addEventListener('click', handleClick);
spongeAgain.addEventListener('click', resetGameSponge);
thomasAgain.addEventListener('click', resetGameThomas);
dinoAgain.addEventListener('click', resetGameDino);
pokemonAgain.addEventListener('click', resetGamePokemon);
spongebobButton.addEventListener('click', spongebobTheme);
thomasButton.addEventListener('click', thomasTheme);
dinoButton.addEventListener('click', dinoTheme);
pokemonButton.addEventListener('click', pokemonTheme);
smallDinoButton.addEventListener('click', dinoTheme);
smallSpongebobButton.addEventListener('click', spongebobTheme);
smallThomasButton.addEventListener('click', thomasTheme);
smallPokemonButton.addEventListener('click', pokemonTheme);

function clearHidden() {
  for (let i = 0; i < 18; i++) {
    gameCards.children[i].lastElementChild.classList.remove('hidden');
  }
}

function resetGameSponge() {
  resetGame();
  spongebobTheme();
}
function resetGameThomas() {
  resetGame();
  thomasTheme();
}
function resetGameDino() {
  resetGame();
  dinoTheme();
}
function resetGamePokemon() {
  resetGame();
  pokemonTheme();
}

function dinoTheme() {
  isStartScreenHidden();
  spongebobStyle.disabled = true;
  dinoStyle.disabled = false;
  thomasStyle.disabled = true;
  pokemonStyle.disabled = true;
}
function pokemonTheme() {
  isStartScreenHidden();
  spongebobStyle.disabled = true;
  dinoStyle.disabled = true;
  thomasStyle.disabled = true;
  pokemonStyle.disabled = false;
}
function spongebobTheme() {
  isStartScreenHidden();
  spongebobStyle.disabled = false;
  dinoStyle.disabled = true;
  thomasStyle.disabled = true;
  pokemonStyle.disabled = true;
}
function thomasTheme() {
  isStartScreenHidden();
  spongebobStyle.disabled = true;
  dinoStyle.disabled = true;
  thomasStyle.disabled = false;
  pokemonStyle.disabled = true;
}

function isStartScreenHidden() {
  if (startScreen.className != 'hidden') { //checks if start screen is hidden
    startScreen.className = 'hidden'; //if start screen is not hidden, sets to hidden
  }
}

function handleClick(event) {
  if (event.target.className.indexOf('card-back') === -1) {
    return;
  }
  event.target.className += ' hidden';
  if (!firstCardClicked) {
    firstCardClicked = event.target;
  } else {
    secondCardClicked = event.target;
    gameCards.removeEventListener('click', handleClick);
    firstCardMergedItems = firstCardClicked.previousElementSibling.classList[1];  // 2nd index of classlist is merged_items property
    secondCardMergedItems = secondCardClicked.previousElementSibling.classList[1];
    if (firstCardMergedItems === secondCardMergedItems) {
      storeHiddenClasses.push(firstCardMergedItems);
      setTimeout(function () {
        for (let i = 0; i < removeItemsArray.length; i++) { //this loops through the removeItemsArray to remove first/secondItem properties from classlist
          firstCardClicked.previousElementSibling.classList.remove(removeItemsArray[i]);
          secondCardClicked.previousElementSibling.classList.remove(removeItemsArray[i]);
        }
        gameCards.addEventListener('click', handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
        matches++;
        attempts++;
        displayStats();
        if (matches === maxMatches) {
          setTimeout(function () {
            youWin.classList.remove('hidden');
            winGif.classList.remove('hidden');
            setTimeout(function () {
              playAgain.classList.remove('hidden');
            }, 3000);
          }, 2000);
          container.classList.add('hiddenFade');
          clearHidden();
        }
      }, 1000);
    } else {
      setTimeout(function () {
        firstCardClicked.classList.remove('hidden');
        secondCardClicked.classList.remove('hidden');
        gameCards.addEventListener('click', handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
        attempts++;
        displayStats();
      }, 1000);
    }
  }
}

function displayStats() {
  document.getElementById('games').textContent = gamesPlayed;
  document.getElementById('attempts').textContent = attempts;
}

function resetGame() {
  playAgain.classList.add('hidden');
  attempts = 0;
  matches = 0;
  gamesPlayed++;
  displayStats();
  resetCards();
  firstCardClicked = '';
  secondCardClicked = '';
  youWin.classList.add('hidden');
  createCards();
  container.classList.remove('hiddenFade');
}

function resetCards() {
  hiddenCards = document.querySelectorAll('.card-back');
  for (let i = 0; i < hiddenCards.length; i++) {
    hiddenCards[i].classList.remove('hidden');
  }
}

// This function is called on load, and adds the first item and second item properties of new card objects
// to the removeItemsArray that is looped through when cards are matched. This removes the
// single item class and displays merged cards
function addToRemoveItemsArray() {
  for (let i = 0; i < allCards.length; i++) {
    removeItemsArray.push(allCards[i].firstItem, allCards[i].secondItem);
  }
}

function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function createCards() {
  var finalShuffleArray = [];
  while (gameCards.lastElementChild) {
    gameCards.removeChild(gameCards.lastElementChild);
  }
  shuffleCards(allCards);
  for (let i = 0; i < 9; i++) {
    let newCard = document.createElement('div');
    newCard.className = 'card col-2 col-custom';
    let newCardBack = document.createElement('div');
    newCardBack.className = 'card-back';
    let newCardFront = document.createElement('div');
    newCardFront.className = allCards[i].firstItem + ' ' + allCards[i].mergedItems + ' card-front';
    newCard.appendChild(newCardFront);
    newCard.appendChild(newCardBack);
    gameCards.appendChild(newCard);
  }
  for (let i = 0; i < 9; i++) {
    let newCard = document.createElement('div');
    newCard.className = 'card col-2 col-custom';
    let newCardBack = document.createElement('div');
    newCardBack.className = 'card-back';
    let newCardFront = document.createElement('div');
    newCardFront.className = allCards[i].secondItem + ' ' + allCards[i].mergedItems + ' card-front';
    newCard.appendChild(newCardFront);
    newCard.appendChild(newCardBack);
    gameCards.appendChild(newCard);
  }
  console.log(gameCards.children);
  for (let i = 0; i < 18; i++) {
    finalShuffleArray.push(gameCards.children[i]);
  }
  while (gameCards.lastElementChild) {
    gameCards.removeChild(gameCards.lastElementChild);
  }
  shuffleCards(finalShuffleArray);
  for (let i = 0; i < 18; i++) {
    gameCards.appendChild(finalShuffleArray[i]);
  }
}
