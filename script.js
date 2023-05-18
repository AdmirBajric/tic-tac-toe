const allDiv = document.querySelectorAll("#main div");
const circle = document.querySelector("#circle");
const close = document.querySelector("#close");
const btn = document.querySelector("#play-again");
const images = document.querySelector("#images");
const noWinner = document.querySelector("#no-winner");

const fields = [null, null, null, null, null, null, null, null, null];

let onStart = true;
let gameWinner = "";

const startGame = (a) => {
  const winner = checkTheWinner();
  if (winner) {
    return;
  }

  const id = +a.id;
  if (onStart) {
    fields[id] = 1;
    a.innerHTML = `<img class="circle" src="./images/circle.png" alt="Circle img" />`;
    onStart = !onStart;
    circle.style.opacity = 0.2;
    close.style.opacity = 1;
    checkWinner();
  } else {
    fields[id] = 2;
    a.innerHTML = `<img class="close" src="./images/close.png" alt="Close img" />`;
    onStart = !onStart;
    circle.style.opacity = 1;
    close.style.opacity = 0.2;
    checkWinner();
  }
};

const checkWinner = () => {
  const winner = checkTheWinner(fields);
  const allClicked = fields.every((field) => field !== null);

  if (winner) {
    startConfetti();
    disableDivClicks();

    btn.style.display = "flex";
    images.style.opacity = 0;
  } else if (allClicked) {
    disableDivClicks();
    noWinner.style.display = "flex";
    btn.style.display = "flex";
    images.style.opacity = 0;
    console.log("No winner. All divs clicked.");
  } else {
    console.log("No winner yet.");
  }
};

const checkTheWinner = () => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      fields[a] !== null &&
      fields[a] === fields[b] &&
      fields[a] === fields[c]
    ) {
      gameWinner = fields[a];
      return fields[a];
    }
  }

  return null;
};

const disableDivClicks = () => {
  allDiv.forEach((a) => {
    a.removeEventListener("click", selectDiv);
  });
};

const selectDiv = (event) => {
  const a = event.target;
  startGame(a);
};

allDiv.forEach((a) => {
  a.addEventListener("click", selectDiv);
});

btn.addEventListener("click", () => {
  location.reload();
});
