let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
  let input = document.getElementById('user-guess');
  //add functionality to guess function here
  if(answer.value === ''){
    setHiddenFields();
  }

  if(validateInput(input.value)){
    attempt.value = Number(attempt.value) + 1;
  } else {
    return false;
  }

  if (getResults(input.value)) {
    setMessage('You Win! :)');
    showAnswer(true);
    showReplay();
  } else {
    if (Number(attempt.value) >= 10) {
      setMessage('You Lose! :(');
      showAnswer(false);
      showReplay();
    } else {
      setMessage('Incorrect, try again.');
    }
  }
}

//implement new functions here
function setHiddenFields() {
  var number = Math.floor(Math.random() * 9999);

  var code = number.toString();
  // set the length to 4 digit
  while(code.length < 4){
    code = '0' + code;
  }

  answer.value = code;
  attempt.value = 0;
}

function setMessage(message) {
  var messageLabel = document.getElementById('message');
  messageLabel.innerHTML = message;
}

function validateInput(input) {
  if(input.length === 4){
    return true;
  } else {
    setMessage('Guesses must be exactly 4 characters long.');
    return false;
  }
}

function getResults(input) {
  var results = document.getElementById('results');

  var correctDigits = 0;
  var output = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
  var digits = input.split('');
  for (var n = 0; n < digits.length; n++) {
    var currentDigit = digits[n];
    if(answer.value[n] === currentDigit){
      //add correct value
      output += '<span class="glyphicon glyphicon-ok"></span>';
      correctDigits += 1;
    } else if (answer.value.indexOf(currentDigit) > -1) {
      //add 'transfer' value
      output += '<span class="glyphicon glyphicon-transfer"></span>';
    } else {
      //add bad value
      output += '<span class="glyphicon glyphicon-remove"></span>';
    }
  }
  output += '</div></div>';
  results.innerHTML += output;

  return correctDigits === 4;
}

function showAnswer(success) {
  var code = document.getElementById('code');
  code.innerHTML = answer.value;
  if (success) {
    code.className += ' success';
  } else {
    code.className += ' failure';
  }
}

function showReplay() {
  var guessingDiv = document.getElementById('guessing-div');
  var replayDiv = document.getElementById('replay-div');

  guessingDiv.style.display = 'none';
  replayDiv.style.display = 'block';
}