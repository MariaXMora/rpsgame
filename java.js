const choices = ["rock", "paper", "scissors"];
let winners = [];

function resetGame() {
  winners = [];
  document.querySelector(".playerScore").textContent = "Score: 0";
  document.querySelector(".computerScore").textContent = "Score: 0";
  // document.querySelector(".ties").textContent = "Ties: 0";
  document.querySelector(".winner").textContent = "";
  document.querySelector(".playerChoice").textContent = "";
  document.querySelector(".computerChoice").textContent = "";
  document.querySelector(".reset").style.display = "none";
}

//play the game

function startGame() {
  let img = document.querySelectorAll("img");
  img.forEach((img) =>
    img.addEventListener("click", () => {
      if (img.id) {
        playRound(img.id);
      }
    })
  );
}

//play 5 rounds

function playRound(playerChoice) {
  let wins = checkWins();
  if (wins >= 5) {
    return;
  }

  const computerChoice = computerSelection();

  const winner = checkWinner(playerChoice, computerChoice);
  winners.push(winner);
  tallyWins();
  displayRound(playerChoice, computerChoice, winner);
  wins = checkWins();
  if (wins == 5) {
    displayEnd();
  }
}

function displayEnd() {
  let playerWins = winners.filter((item) => item == "Player").length;
  if (playerWins == 5) {
    document.querySelector(".winner").textContent =
      "You win 5 games, Congrats!";
  } else {
    document.querySelector(".winner").textContent = "Sorry, the computer wins";
  }
  document.querySelector(".reset").style.display = "flex";
}

function displayRound(playerChoice, computerChoice, winner) {
  document.querySelector(".playerChoice").textContent = `You chose: ${
    playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
  }`;
  document.querySelector(".computerChoice").textContent = `Computer chose: ${
    computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
  }`;
  displayRoundWinner(winner);
}

function displayRoundWinner(winner) {
  if (winner == "Player") {
    document.querySelector(".winner").textContent = "You won the round: ";
  } else if (winner == "Computer") {
    document.querySelector(".winner").textContent =
      "The computer won the round";
  } else {
    document.querySelector(".winner").textContent = "The round was tie";
  }
}

function tallyWins() {
  let pWinCount = winners.filter((item) => item == "Player").length;
  let cWinCount = winners.filter((item) => item == "Computer").length;
  // let ties = winners.filter((item) => item == "Tie").length;
  document.querySelector(".playerScore").textContent = `Score: ${pWinCount}`;
  document.querySelector(".computerScore").textContent = `Score: ${cWinCount}`;
  // document.querySelector(".ties").textContent = `Score: ${ties}`;
}

function computerSelection() {
  //get imput from the computer
  const choice = choices[Math.floor(Math.random() * choices.length)];

  document.querySelector(`.${choice}`).classList.add("active");

  setTimeout(() => {
    document.querySelector(`.${choice}`).classList.remove("active");
  }, 700);

  return choice;
}

function checkWins() {
  let pWinCount = winners.filter((item) => item == "Player").length;
  let cWinCount = winners.filter((item) => item == "Computer").length;
  return Math.max(pWinCount, cWinCount);
}

function checkWinner(choiceP, choiceC) {
  if (
    (choiceP === "rock" && choiceC === "scissors") ||
    (choiceP === "paper" && choiceC === "scissors") ||
    (choiceP === "scissors" && choiceC === "paper")
  ) {
    return "Player";
  } else if (choiceP === choiceC) {
    return "Tie";
  } else {
    return "Computer";
  }
}

function setWins() {
  let pWinCount = winners.filter((item) => item == "Player").length;
  let cWinCount = winners.filter((item) => item == "Computer").length;
  // let ties = winners.filter((item) => item == "Tie").length;
}

startGame();
