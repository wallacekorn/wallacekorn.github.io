
//////////////////////////////////////DECLARATIONS//////////////////////////////////////
// tryButton is for the button event handler, letter guess for 'enter' handler
		const tryButton = document.getElementById('tryButton');
		const letterGuessInput = document.getElementById('letterGuess');
		
// grabs the lettersTried div's paragraph element for updating as letters are entered
		const lettersTried = document.getElementById('lettersTriedP');
		
// grabs answer box area for displaying primary status text boxes.
		let answerDivBoxes = '<div id="answerBoxesBox">';
		
// empty lettersTriedArray, later filled and used to test for duplicates
		const lettersTriedArray = [];
		
// grabs shipPicture image element, sources applied to update image as game progresses
		const shipPicture = document.getElementById('shipPicture');
		
// regex definition for A-Z check on input form
		const lettersOnly = /^[A-Za-z]/;
		
// grabs the span that gives status updates and sets the inital  value to 'Save the Ship!'
		const validSpan = document.getElementById('spanValid');
		validSpan.innerText = 'Save The Ship!';
		
// sets whether event handlers are active for "play again" button
		let disableEventHandlers = false;
		
//counters
		let correctCounter = 0;
		let shipHitCounter = 0;
		let attemptsLeft = 11;
		
// grabs AttemptsLeft Span and sets text
		const attemptsLeftSpan = document.getElementById('spanAttempts');
		
// 40 words in an array
		const wordsArray = [
		'pizza',
		'brownies',
		'wizard',
		'flamingo',
		'bears',
		'obsidian',
		'zipper',
		'ceiling',
		'monster',
		'allegiance',
		'thunder',
		'education',
		'teacher',
		'microwave',
		'washer',
		'modern',
		'ren',
		'romeo',
		'microsoft',
		'playstation',
		'pianist',
		'london',
		'driver',
		'ambassador',
		'programming',
		'touchdown',
		'crypt',
		'spelling',
		'warrior',
		'poignant',
		'wretched',
		'fleeting',
		'accordion',
		'impeachment',
		'development',
		'paper',
		'goalkeeper',
		'treehouse',
		'candelabra',
		'mouse'
		];

//////////////////////////////////////FUNCTIONS//////////////////////////////////////

// generates a random word from wordsArray
		function randomWord(words) {
			let randomNumber = Math.floor(Math.random()*words.length);
			return wordsArray[randomNumber];
		}

// duplicate letter tester function
		function duplicateTest(letter) {
			let trueDupeCounter = 0;
			let falseDupeCounter = 0;

			// tests if letters are already in the lettersTriedArray
				for (let i=0; i<lettersTriedArray.length; i+= 1) {
					if ( letter === lettersTriedArray[i]) {
						trueDupeCounter += 1;
						console.log(trueDupeCounter);
					} else {
						falseDupeCounter += 1;
					}
				}
			// if no letters are found as matches returns false and logs a visable response in console
				if (falseDupeCounter === lettersTriedArray.length) {
					console.log('not a duplicate letter');
					return false;
				} else {
					console.log('is a duplicate letter');
					return true;
				}	
		} // duplicateTest Function end

// generates random word then splits into a single letter array
		const word = randomWord(wordsArray);
		const lettersArray = word.split('');

// Creates Filled Letter Boxes (and resets the variable)
		function boxCreatorFilled() {
			
			//for loop builds letter boxes
				for (i=0;i<lettersArray.length;i++) {
					answerDivBoxes += '<div class="inline answerBoxes">' + lettersArray[i].toUpperCase() + '</div>';
				}
				
			answerDivBoxes += '</div>';
			const answerArea = document.getElementById('answerAreaF');
			answerArea.innerHTML = answerDivBoxes;
			answerDivBoxes = '<div id="answerBoxesBox">';
		} // boxCreatorFilled function close

// Creates Empty Letter Boxes (and resets the variable)
		function boxCreatorEmpty() {
			
			//for loop builds empty letter boxes
				for (i=0;i<lettersArray.length;i++) {
					answerDivBoxes += '<div class="inline answerBoxes answerBoxesEmpty disableSelect">' + lettersArray[i].toUpperCase() + '</div>';
				}
				
			answerDivBoxes += '</div>';
			const answerArea = document.getElementById('answerAreaE');
			answerArea.innerHTML = answerDivBoxes;
			answerDivBoxes = '<div id="answerBoxesBox">';
		} // boxCreatorEmpty function close

// Checks to see if submission is A-Z, if so returns true
		function alphabetChecker(lg) {
			if(lg.match(lettersOnly)) {
				return true;
			} else {
				return false;
			}
		}

// updates the picture based on status
		function pictureDelivery() {
			if (correctCounter === lettersArray.length) {
				shipPicture.src = "./images/battleship-victory.png";
				letterGuess.disabled = true;
				attemptsLeftSpan.innerText = `Press Enter to Play Again`;
				attemptsLeftSpan.style.color = '#ccff33';
				attemptsLeftSpan.style.backgroundColor = '#111';
				attemptsLeftSpan.style.borderRadius = '8px';
				validSpan.innerText = 'YOU DID IT!';
				validSpan.style.paddingTop = "8px";
				validSpan.style.color = "#000076";
				formArea.style.height = "280px";
				disableEventHandlers = true;
				console.log(disableEventHandlers + 'disabled event handlers');
				tryButton.value = 'Play Again?';
				tryButton.setAttribute('onclick','location.href=location.href');
				document.getElementById('tryButton').focus();
			}
			else if (shipHitCounter === 0) {
				shipPicture.src = "./images/battleship-blank.png";
				attemptsLeftSpan.innerText = `Attempts Left: ${attemptsLeft}`;
			}
			else if (shipHitCounter > 0 && shipHitCounter < 11){
				shipPicture.src = `./images/battleships${shipHitCounter}.png`;
				attemptsLeftSpan.innerText = `Attempts Left: ${attemptsLeft}`;
			}
			else if(shipHitCounter === 11) {
				shipPicture.src = "./images/battleship-loss.png";
				shipPicture.style.borderRadius = "10px";
				attemptsLeftSpan.innerText = `Press Enter To Play Again`;
				attemptsLeftSpan.style.color = '#ccff33';
				attemptsLeftSpan.style.backgroundColor = '#111';
				attemptsLeftSpan.style.borderRadius = '8px';
				validSpan.innerText = 'The Ship Was Sunk :(';
				validSpan.style.paddingTop = "8px";
				validSpan.style.color = "#a00000";
				document.getElementById('answerAreaE').style.opacity = '0.0';
				formArea.style.height = "280px";
				letterGuess.disabled = true;
				disableEventHandlers = true;
				console.log(disableEventHandlers + ' disabled event handlers');
				tryButton.value = 'Play Again?';
				tryButton.setAttribute('onclick','location.href=location.href');
				document.getElementById('tryButton').focus();
			}
		} // pictureDelivery function close


////////////////////////Function Execution/Initial Setups///////////////////////////

letterGuess.value = ''; // makes sure box is empty if page is refreshed
boxCreatorFilled();     // 
boxCreatorEmpty();		// box creator functions to initialize page
pictureDelivery();		// delivers initial picture
document.getElementById('letterGuess').select(); // selects input on load

////////////////////////////Click Event(Main Logic)/////////////////////////////////

 if(disableEventHandlers === false) {

	//  button click event
	tryButton.addEventListener('click', (e) => {
		// prevent page reload on submit
			e.preventDefault();
		
		// stores letter guessed in caps to const
			const letterGuessed = document.getElementById('letterGuess').value.toUpperCase();
		
		// duplicate test to test if the array already has the character
			const dupeTest = duplicateTest(letterGuessed);
			
		// A-Z test used in letterValidator()
			const letterTest = alphabetChecker(letterGuessed);
		
		// Stores Letter Validator to test entry for blanks, duplicates, and non letter characters
			const validatorHolder = letterValidator();
		
		// Counters
			let incorrectCounter = 0;
			let doubleCorrectCounter = 0;
		
		// Validates that a letter was entered and not a duplicate 
			function letterValidator() {
				if (letterGuessed === ' ') {
					validSpan.innerText = 'Nothing Entered';
					validSpan.style.color = "#a00000";
					return true;
				} else if (letterGuessed === '') {
					validSpan.innerText = 'Nothing Entered';
					validSpan.style.color = "#a00000";
					return true;
				} else if (dupeTest === true) {
					validSpan.innerText = `${letterGuessed} Already Entered`;
					validSpan.style.color = "#a00000";
					return true;
				} else if (letterTest === false) {
					validSpan.innerText = 'Must Enter a Letter';
					validSpan.style.color = "#a00000";
					return true;
				}
			}	// 	letterValidator function close
		
		for (let i=0; i<lettersArray.length; i+= 1) {
			
			// tests to see if the guessed letter is a blank, duplicate, or non alphabatic if so does nothing
				if (letterValidator() === true) {
				}

			// tests to see if the guessed letter is CORRECT
				else if ( letterGuessed === lettersArray[i].toUpperCase() ){
					const correctLetter = lettersArray[i].toUpperCase(); // stores the correct letter into a variable
					const emptyBoxArray = document.querySelectorAll('#answerBoxesBox .answerBoxesEmpty');
					
					// if statement tests to see if correct letter appears twice in the same word so only one gets added to lettersTried box
						doubleCorrectCounter +=1; // letter counter used to prevent the same letter being added to lettersTried twice
						correctCounter += 1; // ticks up counter to check for win scenario
						console.log('correctCounter ' + correctCounter);
							
						if (doubleCorrectCounter === 1){
							lettersTriedArray.push(letterGuessed); // adds letter to test for repeat letter entries (seperate from duplicates in the same word)
							console.log(correctLetter + " was Correct!"); // visually identifies CORRECT in console
							
							// adds green text letter to lettersTried DIV
								lettersTried.innerHTML += '<span class="correct"><strong> ' + letterGuessed + ' </strong></span>';
							// updates status bar text and text color
								validSpan.innerText = 'Excellent!';
								validSpan.style.color = "#000076";
						} // double letter tester if statement close
					
					// reveals correctly guessed letter boxes
						for (let i=0; i<emptyBoxArray.length; i++) {
							let letterTester = emptyBoxArray[i].innerText;
							// turns overlapping emptyBox clear, showing the box WITH text below
								if (letterTester === correctLetter) {
								  emptyBoxArray[i].style.opacity = '0.0';
								}
						} //for loop close
				} // else if CORRECT 
				else { // builds the counter to test if ALL letters were incorrect
					incorrectCounter = incorrectCounter + 1;
				}

				
			// adds shipHit and red letter to lettersTried div if letter is INCORRECT
				if (incorrectCounter === lettersArray.length) {
					lettersTriedArray.push(letterGuessed); // adds letter to lettersTriedArray to test for duplicates
					// adds letter guessed to lettersTried box, with incorrect class
					lettersTried.innerHTML += '<span class="incorrect"><strong> ' + letterGuessed + ' </strong></span>';
					validSpan.innerText = 'Ship Was Hit!'; // updates status text bar
					validSpan.style.color = "#a00000"; // turns status text red so it appears more perilous :)
					attemptsLeft -= 1; // removes tick from attemptsLeft Counter
					shipHitCounter += 1; // adds tick to shipHitCounter for testing loss conditions and updating picture
					console.log('Ship Was Hit!'); // visually identifies INCORRECT in console
				} // INCORRECT if statement close
			

		} // close bracket for CORRECT / INCORRECT tester loop

		
		//clears LetterGuess after submission refocuses insertion line, function updates picture, clears counter
			doubleCorrectCounter = 0;
			document.getElementById('letterGuess').value = '';
			document.getElementById('letterGuess').select();
			pictureDelivery();
			
	}); // button click event listener close


	// enter key event handler
	letterGuessInput.addEventListener('keyup',function(e){
		if (e.keyCode === 13) {
			// prevent page reload on submit
			e.preventDefault();
		
		// stores letter guessed in caps to const
			const letterGuessed = document.getElementById('letterGuess').value.toUpperCase();
		
		// duplicate test to test if the array already has the character
			const dupeTest = duplicateTest(letterGuessed);
			
		// A-Z test used in letterValidator()
			const letterTest = alphabetChecker(letterGuessed);
		
		// Stores Letter Validator to test entry for blanks, duplicates, and non letter characters
			const validatorHolder = letterValidator();
		
		// Counters
			let incorrectCounter = 0;
			let doubleCorrectCounter = 0;
		
		// Validates that a letter was entered and not a duplicate 
			function letterValidator() {
				if (letterGuessed === ' ') {
					validSpan.innerText = 'Nothing Entered';
					validSpan.style.color = "#a00000";
					return true;
				} else if (letterGuessed === '') {
					validSpan.innerText = 'Nothing Entered';
					validSpan.style.color = "#a00000";
					return true;
				} else if (dupeTest === true) {
					validSpan.innerText = `${letterGuessed} Already Entered`;
					validSpan.style.color = "#a00000";
					return true;
				} else if (letterTest === false) {
					validSpan.innerText = 'Must Enter a Letter';
					validSpan.style.color = "#a00000";
					return true;
				}
			}	// 	letterValidator function close
		
		for (let i=0; i<lettersArray.length; i+= 1) {
			
			// tests to see if the guessed letter is a blank, duplicate, or non alphabatic if so does nothing
				if (letterValidator() === true) {
				}

			// tests to see if the guessed letter is CORRECT
				else if ( letterGuessed === lettersArray[i].toUpperCase() ){
					const correctLetter = lettersArray[i].toUpperCase(); // stores the correct letter into a variable
					const emptyBoxArray = document.querySelectorAll('#answerBoxesBox .answerBoxesEmpty');
					
					// if statement tests to see if correct letter appears twice in the same word so only one gets added to lettersTried box
						doubleCorrectCounter +=1; // letter counter used to prevent the same letter being added to lettersTried twice
						correctCounter += 1; // ticks up counter to check for win scenario
						console.log('correctCounter ' + correctCounter);
							
						if (doubleCorrectCounter === 1){
							lettersTriedArray.push(letterGuessed); // adds letter to test for repeat letter entries (seperate from duplicates in the same word)
							console.log(correctLetter + " was Correct!"); // visually identifies CORRECT in console
							
							// adds green text letter to lettersTried DIV
								lettersTried.innerHTML += '<span class="correct"><strong> ' + letterGuessed + ' </strong></span>';
							// updates status bar text and text color
								validSpan.innerText = 'Excellent!';
								validSpan.style.color = "#000076";
						} // double letter tester if statement close
					
					// reveals correctly guessed letter boxes
						for (let i=0; i<emptyBoxArray.length; i++) {
							let letterTester = emptyBoxArray[i].innerText;
							// turns overlapping emptyBox clear, showing the box WITH text below
								if (letterTester === correctLetter) {
								  emptyBoxArray[i].style.opacity = '0.0';
								}
						} //for loop close
				} // else if CORRECT 
				else { // builds the counter to test if ALL letters were incorrect
					incorrectCounter = incorrectCounter + 1;
				}

				
			// adds shipHit and red letter to lettersTried div if letter is INCORRECT
				if (incorrectCounter === lettersArray.length) {
					lettersTriedArray.push(letterGuessed); // adds letter to lettersTriedArray to test for duplicates
					// adds letter guessed to lettersTried box, with incorrect class
					lettersTried.innerHTML += '<span class="incorrect"><strong> ' + letterGuessed + ' </strong></span>';
					validSpan.innerText = 'Ship Was Hit!'; // updates status text bar
					validSpan.style.color = "#a00000"; // turns status text red so it appears more perilous :)
					attemptsLeft -= 1; // removes tick from attemptsLeft Counter
					shipHitCounter += 1; // adds tick to shipHitCounter for testing loss conditions and updating picture
					console.log('Ship Was Hit!'); // visually identifies INCORRECT in console
				} // INCORRECT if statement close
			

		} // close bracket for CORRECT / INCORRECT tester loop

		
		//clears LetterGuess after submission refocuses insertion line, function updates picture, clears counter
			doubleCorrectCounter = 0;
			document.getElementById('letterGuess').value = '';
			document.getElementById('letterGuess').select();
			pictureDelivery();
				
		}  // if enter button pressed bracket close
	}); //enter button event handler close
		
} // if eventhandler is disabled closing bracket
	
	
	
	
	
	
	
	


