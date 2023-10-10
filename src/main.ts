//purposely bad code so students can fix it - can make it worse

import "./style.css";

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const bird = document.getElementById("bird");
let birdsArr: (HTMLElement | null)[] = [];
let cactusArr: any[] = [];
cactusArr.push(cactus);
birdsArr.push(bird);

const scoreText = document.getElementById("scoreText");
let score = 0;
setText("click to start!");

let isJumping = false;
let gameOver = true;

document.addEventListener("mousedown", () => jump());

setInterval(function () {
  main();
}, 10);

setInterval(function () {
  const newCactus = document.createElement("div");
  const gameDiv = document.getElementById("game");
  newCactus.classList.add("cactusMove");
  gameDiv?.appendChild(newCactus);
  console.log("new cactus made POG");
}, 1000);

function main() {
  if (gameOver == false) {
    score = score + 1;
    setText("Score: " + score);
    birdsArr.forEach((bird, index) => {
      checkGameOver(bird, cactusArr[index]);
    });
  }
}

function jump() {
  if (gameOver == false) {
    if (isJumping == false) {
      isJumping = true;
      dino?.classList.add("jump");
      setTimeout(removeJump, 500);
    }
  } else {
    startGame();
  }
}

function removeJump() {
  dino?.classList.remove("jump");
  isJumping = false;
  //mainLoop = mainLoop //bug fix?
}

function removeObstacles() {
  cactus?.classList.remove("cactusMove");
  bird?.classList.remove("birdMove");
}

function checkGameOver(birdy, cact) {
  if (gameOver == false && dino != null && cact != null && birdy != null) {
    //get is dinosaur jumping
    let dinoTop = parseInt(
      window.getComputedStyle(dino).getPropertyValue("top")
    );

    //get cactus position
    let cactusleft = parseInt(
      window.getComputedStyle(cact).getPropertyValue("left")
    );

    //get bird position
    let birdleft = parseInt(
      window.getComputedStyle(birdy).getPropertyValue("left")
    );

    //detect cactus collision
    if (dinoTop >= 150 && Math.abs(cactusleft) < 7) {
      //end game
      console.log("player died!");
      setText("Final Score: " + score + "! Click To Play Again!");
      gameOver = true;

      //reset player
      removeJump();

      //reset cactus
      removeObstacles();
    }

    //detect bird collision
    if (dinoTop <= 55 && Math.abs(birdleft) < 11) {
      //end game
      console.log("player died!");
      setText("Final Score: " + score + "! Click To Play Again!");
      gameOver = true;

      //reset player
      removeJump();

      //reset cactus
      removeObstacles();
    }
  }
}

function startGame() {
  console.log("Game started!");
  gameOver = false;
  score = 0;
  cactus?.classList.add("cactusMove");
  bird?.classList.add("birdMove");
}

function setText(s: string) {
  if (scoreText) {
    scoreText.textContent = s;
  }
}
