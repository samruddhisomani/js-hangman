//the first piece I need is an array of words.
const words = ['otter', 'hippo', 'whale', 'dolphin', 'dugong', 'porpoise', 'platypus', 'walrus', 'sealion', 'seal'];

function Hangman(words, fullGuesses) {

    //properties
    this.words = words;
    this.fullGuesses = fullGuesses;
    this.guessesRemaining = fullGuesses;
    this.wins = 0;
    this.gamesPlayed = 0;

    //methods

    //helper method to adjust wins
    this.updateWins = (wins, gamesPlayed) => {
        this.wins += wins;
        this.gamesPlayed += gamesPlayed;

        const winString = `${this.gamesPlayed} game(s) won of ${this.wins} played.`

        document.querySelector(".container__wins").textContent = winString
    }

    //helper method to update remaining guesses
    this.updateGuessesRemaining = () => {
        document.querySelector('.container__guessesRemaining').innerHTML = `Guesses Remaining: ${this.guessesRemaining}`

        if (this.guessesRemaining === 0) {
            this.updateWins(0, 1);
            alert('Game Over. You Lost. New game started.');
            this.startNewGame();
        }
    }

    //helper method to update letters guessed.
    this.updateLettersGuessed = (letter) => {
        {
            const para = document.createElement("p")
            para.innerHTML = letter;
            para.setAttribute('class', 'lettersGuessed__element')
            document.querySelector('.container__lettersGuessed').append(para);
        }
    }

    this.startNewGame = () => {
        //initialize guessesremaining to
        //full guesses every time a new game is started
        this.guessesRemaining = this.fullGuesses;
        this.updateGuessesRemaining();

        //update to 0 games played and 0 games won
        this.updateWins(0, 0);

        //choose a random word and initialize attendant elements
        //as appropriate
        this.randomWord = this.words[Math.floor(Math.random() * words.length)];
        this.letters = this.randomWord.split("");
        this.lettersRemaining = this.letters.length;
        this.guessedLetters = [];

        const containerSlots = document.querySelector('.container__slots');
        const containerLettersGuessed = document.querySelector('.container__lettersGuessed');

        //remove any already existing slots
        while (containerSlots.lastChild) {
            containerSlots.removeChild(containerSlots.lastChild)
        }

        //remove all the letters we recognize as already guessed
        while (containerLettersGuessed.lastChild) {
            containerLettersGuessed.removeChild(containerLettersGuessed.lastChild)
        }

        //add letters guessed wording back in

        //I need to make as many blanks as I have letters
        this.letters.map(letter => {
            const para = document.createElement("p")
            para.setAttribute('class', 'container__slotsElement')
            para.innerHTML = "_"
            document.querySelector('.container__slots').appendChild(para)
        });
    }

    //on keypress I need to do stuff
    this.processGuess = event => {
        const guess = event.key;

        if (!guess.match('^[a-z]$')) {
            //handling unexpected inputs--not letters
            alert('Not a letter');
        } else if (this.guessedLetters.includes(guess)) {
            //handling unexpected inputs--already guessed
            alert('You already guessed that letter!')
        } else if (!this.letters.includes(guess)) {
            //handling wrong guesses
            //mostly housekeeping
            this.guessesRemaining--;
            this.updateLettersGuessed(guess);
            this.updateGuessesRemaining();
            this.guessedLetters.push(guess);

        } else if (this.letters.includes(guess)) {

            //housekeeping
            this.updateLettersGuessed(guess);
            this.guessedLetters.push(guess);

            //handling correct guesses
            [...document.querySelectorAll('.container__slotsElement')].map((x, i) => {
                if (this.letters[i] == guess) {
                    x.innerHTML = guess;
                    this.lettersRemaining--;
                }
            })

            // if you've guessed all the letters you won the game.
            if (this.lettersRemaining === 0) {
                this.updateWins(1, 1);
                alert("Game over. You won! New game started.");
                this.startNewGame();
            }

        } else {
            throw ('System Error')
        }
    }

    //initialize new game
    this.startNewGame();
}

var hangman = new Hangman(words, 11);

//on keypress I need to read user input
//keypress means I won't pick up system commands,
//only alphanumeric
document.body.onkeypress = event => hangman.processGuess(event);

