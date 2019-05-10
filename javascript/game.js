//I recognize up to 11 guesses before a player loses.

let guessesRemaining = 11;
let gamesPlayed = 0;
let gamesWon = 0;

//so if I want to, I can reformat what this part looks like in one place
const updateGuessesRemaining = () => {
    document.querySelector('.container__guessesRemaining').innerHTML = `Guesses Remaining: ${guessesRemaining}`

    if (guessesRemaining === 0) {
        alert('Game Over. You Lost.')
        newWord(words)
        let { randomWord, letters, guesses } = newWord(words);
        guessesRemaining = 11;

    }
}

const updateLettersGuessed = (letter) => {
    {
        const para = document.createElement("p")
        para.innerHTML = letter;
        document.querySelector('.container__lettersGuessed').append(para);
    }
}
//the first piece I need is an array of words.
const words = ['otter', 'hippo', 'whale', 'dolphin', 'dugong', 'porpoise', 'platypus'];

//I need to randomly select a word from that list
//I need to create a string of underscores as long as my random word
//but I need to make it to where it replaces correctly guessed letters
//I need this whole process to be repeatable
const newWord = (words) => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const letters = randomWord.split("");
    const guesses = Array(letters.length).fill("_");

    let newWord = {
        "randomWord": randomWord,
        "letters": letters,
        "guesses": guesses,
    }

    return newWord;

}

let { randomWord, letters, guesses } = newWord(words);

//I need to make as many blanks as I have letters
letters.map(letter => {
    const para = document.createElement("p")
    para.setAttribute('class', 'container__slotsElement')
    para.innerHTML = "_"
    const slot = document.querySelector('.container__slots').appendChild(para)
})


updateGuessesRemaining()

//on keypress I need to do stuff
const processGuess = event => {
    const guess = event.key;

    if (!guess.match('^[a-z]$')) {
        //handling unexpected inputs
        alert('Not a letter');

    } else if (!letters.includes(guess)) {
        //handling wrong guesses
        guessesRemaining -= 1;
        updateLettersGuessed(guess);
        updateGuessesRemaining();

    } else if (letters.includes(guess)) {
        //handling correct guesses
        [...document.querySelectorAll('.container__slotsElement')].map((x, i) => {
            if (letters[i] == guess) {
                x.innerHTML = guess;
            }
        })

        updateLettersGuessed(guess);

    } else {
        throw ('System Error')
    }

}

//on keypress I need to read user input
//keypress means I won't pick up system commands,
//only alphanumeric
document.body.onkeypress = event => processGuess(event);

