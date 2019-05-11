let guessesRemaining;
let randomWord, letters, lettersRemaining, guessedLetters;

//so if I want to, I can reformat what this part looks like in one place
const updateGuessesRemaining = () => {
    document.querySelector('.container__guessesRemaining').innerHTML = `Guesses Remaining: ${guessesRemaining}`

    if (guessesRemaining === 0) {
        alert('Game Over. You Lost. New game started.');
        ({ randomWord, letters, lettersRemaining, guessedLetters } = startNewGame(words));
    }
}

//and this one
const updateLettersGuessed = (letter) => {
    {
        const para = document.createElement("p")
        para.innerHTML = letter;
        document.querySelector('.container__lettersGuessed').append(para);
    }
}
//the first piece I need is an array of words.
const words = ['otter', 'hippo', 'whale', 'dolphin', 'dugong', 'porpoise', 'platypus', 'walrus'];

//I need to randomly select a word from that list
//I need to create a string of underscores as long as my random word
//but I need to make it to where it replaces correctly guessed letters
//I need this whole process to be repeatable

const startNewGame = (words) => {
    //I recognize up to 11 guesses before a player loses.
    guessesRemaining = 11;
    updateGuessesRemaining();

    const randomWord = words[Math.floor(Math.random() * words.length)];
    const letters = randomWord.split("");
    const lettersRemaining = letters.length;

    const containerSlots = document.querySelector('.container__slots');
    const containerLettersGuessed = document.querySelector('.container__lettersGuessed');

    //remove any already existing slots
    while (containerSlots.lastChild) {
        containerSlots.removeChild(containerSlots.lastChild)
    }

    while (containerLettersGuessed.lastChild) {
        containerLettersGuessed.removeChild(containerLettersGuessed.lastChild)
    }

    //I need to make as many blanks as I have letters
    letters.map(letter => {
        const para = document.createElement("p")
        para.setAttribute('class', 'container__slotsElement')
        para.innerHTML = "_"
        const slot = document.querySelector('.container__slots').appendChild(para)
    });

    let newWord = {
        "randomWord": randomWord,
        "letters": letters,
        "lettersRemaining": lettersRemaining,
        "guessedLetters": [],
    }

    console.log(randomWord);
    return newWord
};

({ randomWord, letters, lettersRemaining, guessedLetters } = startNewGame(words));

console.log(randomWord);
console.log(guessedLetters);

//on keypress I need to do stuff
const processGuess = event => {
    const guess = event.key;
    console.log(guessedLetters);

    if (!guess.match('^[a-z]$')) {
        //handling unexpected inputs
        alert('Not a letter');
    } else if (guessedLetters.includes(guess)) {
        //handling unexpected inputs
        alert('You already guessed that letter!')
    } else if (!letters.includes(guess)) {
        //handling wrong guesses
        guessesRemaining--;
        updateLettersGuessed(guess);
        updateGuessesRemaining();
        guessedLetters.push(guess);

    } else if (letters.includes(guess)) {

        updateLettersGuessed(guess);
        guessedLetters.push(guess);

        //handling correct guesses
        [...document.querySelectorAll('.container__slotsElement')].map((x, i) => {
            if (letters[i] == guess) {
                x.innerHTML = guess;
                lettersRemaining--;
            }
        })

        if (lettersRemaining === 0) {
            alert("Game over. You won! New game started.");
            ({ randomWord, letters, lettersRemaining, guessedLetters } = startNewGame(words));
        }

    } else {
        throw ('System Error')
    }

    console.log(guessedLetters);
}

//on keypress I need to read user input
//keypress means I won't pick up system commands,
//only alphanumeric
document.body.onkeypress = event => processGuess(event);

