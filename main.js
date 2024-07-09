let SCORE = 0;
let picks = {
  rock: "images/icon-rock.svg",
  paper: "images/icon-paper.svg",
  scissors: "images/icon-scissors.svg",
};
let main = document.querySelector("main");
let contest = document.querySelector(".contest");
let scoreElement = document.querySelector(".score");

let modal = document.querySelector(".modal");
let rules = document.querySelector(".rules");
let closedBtn = document.querySelector(".close");
let openedModal = false;
let options = document.querySelectorAll(".options div");

let userImage = document.querySelector(".userImage");
let computerImage = document.querySelector(".computerImage");

let imgPickedByUser = document.querySelector("#userPickImage");
let imgPickedByComputer = document.querySelector("#computerPickImage");

let newGame = document.querySelector(".newGame");

let decision = document.querySelector(".decision");

rules.addEventListener("click", () => {
  if (openedModal) {
    modal.classList.remove("show");
    openedModal = false;
  } else {
    openedModal = true;
    modal.classList.add("show");
  }
});

closedBtn.addEventListener("click", (e) => {
  modal.classList.remove("show");
});

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    main.style.display = "none";
    contest.style.display = "flex";
    rules.style.display = "none";
    let div = e.target.closest("div");
    pickedUserImage(div);
  });
});

let randomPick = (obj) => {
  let keys = Object.keys(obj);
  let randomPick = keys[Math.floor(Math.random() * keys.length)];
  return { key: randomPick, value: obj[randomPick] };
};

function checkBorderColor(imageElement) {
  switch (imageElement.id) {
    case "paper":
      imageElement.style.border = "20px solid hsl(230, 89%, 62%)";
      break;
    case "rock":
      imageElement.style.border = "20px solid hsl(349, 71%, 52%)";
      break;
    case "scissors":
      imageElement.style.border = "20px solid hsl(39, 89%, 49%)";
      break;
  }
}

function pickedUserImage(element) {
  let elementImage = element.querySelector("img");
  imgPickedByUser.src = elementImage.src;
  userImage.id = element.id;

  checkBorderColor(userImage);
  pickComputerImage(picks);
}

function pickComputerImage(obj) {
  let { key, value } = randomPick(obj);
  imgPickedByComputer.src = value;
  computerImage.id = key;
  checkBorderColor(computerImage);

  referee(userImage.id, computerImage.id);
}

function referee(user, computer) {
  switch (user + "-" + computer) {
    case "paper-rock":
    case "rock-scissors":
    case "scissors-paper":
      decision.textContent = "YOU WIN";
      SCORE++;
      scoreElement.textContent = SCORE;
      break;
    case "rock-paper":
    case "scissors-rock":
    case "paper-scissors":
      decision.textContent = "YOU LOST";
      SCORE--;
      scoreElement.textContent = SCORE;

      break;
    case "paper-paper":
    case "rock-rock":
    case "scissors-scissors":
      decision.textContent = "MATCH IS DRAW";
      break;
  }
}

newGame.addEventListener("click", (e) => {
  main.style.display = "flex";
  contest.style.display = "none";
  rules.style.display = "block";
});
