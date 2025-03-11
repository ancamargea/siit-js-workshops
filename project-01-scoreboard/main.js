console.log("JS Workshop - Scoreboard");

const playerInput = document.querySelector("#new-player");
const scoreBoard = document.querySelector(".scoreboard");

const addPlayerBtn = document.querySelector("#add-player-btn");
addPlayerBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const playerName = playerInput.value;
  if (!playerName) {
    alert("Please enter a valid name!");
    return;
  }

  scoreBoxFactory(scoreBoard, playerName);

  playerInput.value = "";
});

const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", function (event) {
  const scoreBoxes = document.querySelectorAll(".score-box");

  scoreBoxes.forEach(function (scoreBox) {
    scoreBox.remove();
  });
});

///// FUNCTION TO CREATE EACH INDIVIDUAL PLAYER BOX /////
function scoreBoxFactory(parentElem, playerName) {
  // Creates the score box (container)
  const scoreBox = document.createElement("div");
  scoreBox.classList.add("score-box");
  parentElem.append(scoreBox);

  // Heeading element
  const heading = document.createElement("h3");
  heading.textContent = playerName;
  scoreBox.append(heading);

  // Avatar
  const avatar = document.createElement("img");
  avatar.classList.add("avatar");
  avatar.src = `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(
    playerName
  )}&radius=10`;
  scoreBox.append(avatar);

  // Score div
  const playerScore = document.createElement("div");
  playerScore.classList.add("player-score");
  scoreBox.append(playerScore);

  // Score text
  const scoreText = document.createTextNode("Score: ");
  playerScore.append(scoreText);

  // Score display span
  const scoreDisplay = document.createElement("span");
  scoreDisplay.classList.add("score-display");
  scoreDisplay.innerText = "0";
  playerScore.append(scoreDisplay);

  // +1 point button
  const incrementBtn = document.createElement("button");
  incrementBtn.innerText = "+1";
  scoreBox.append(incrementBtn);

  // Score change logic
  let score = 0;
  incrementBtn.addEventListener("click", function () {
    scoreDisplay.textContent = ++score;
    highlightHighestScore();
  });

  // Delete player button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  scoreBox.append(deleteBtn);

  // Delete logic
  deleteBtn.addEventListener("click", function () {
    scoreBox.remove();
    highlightHighestScore();
  });
}

///// FUNCTION TO HIGHLIGHT THE PLAYER WITH THE HIGHEST SCORE /////
function highlightHighestScore() {
  const scoreBoxes = document.querySelectorAll(".score-box");

  let highestScore = -1;
  let highestScoreBox = null;

  // Find the score box with the highest score
  scoreBoxes.forEach(function (scoreBox) {
    const scoreDisplay = scoreBox.querySelector(".score-display");
    const score = parseInt(scoreDisplay.textContent);

    if (score > highestScore) {
      highestScore = score;
      highestScoreBox = scoreBox;
    }
  });

  // Remove highlight from all score boxes
  scoreBoxes.forEach(function (scoreBox) {
    scoreBox.style.backgroundColor = "";
  });

  // Highlight the score box with the highest score
  if (highestScoreBox) {
    highestScoreBox.style.backgroundColor = "#e2c7c7";
  }
}
