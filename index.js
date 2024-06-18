"use strict";

function startGame() {
    let root = document.getElementById("root");
    let points = document.getElementById("points");
    let newGame = document.getElementById("newGame");
    let congo = document.getElementById("congo");

    // Carrega o som de fundo
    const backgroundSound = new Audio('background-sound.mp3');
    backgroundSound.loop = true; // Faz o som tocar em loop
    backgroundSound.play();

    // Carrega os sons de clique
    const correctClickSound = new Audio('chat.mp3');
    const incorrectClickSound = new Audio('death.mp3');

    let bombIndexes = generateRandomArray();

    let gameOver = false;
    let visited = [];
    let score = 0;

    for (let i = 0; i < 9; i += 1) {
        let row = document.createElement("div");

        row.style.display = "block";
        row.style.height = "50px";

        for (let x = 0; x < 9; x += 1) {

            let currentIndex = i * 9 + x;

            let cell = document.createElement("div");
            cell.style.display = "inline-block";
            cell.setAttribute("id", currentIndex);

            cell.style.height = "50px";
            cell.style.width = "50px";

            cell.style.border = "1px solid grey";
            cell.style.background = "lightgrey";
            row.appendChild(cell);

            cell.addEventListener("click", () => {
                if (!bombIndexes.has(currentIndex) && !gameOver) {
                    if (!visited.includes(currentIndex)) {
                        correctClickSound.play(); // Toca o som de clique correto

                        visited.push(currentIndex);
                        score += 1;
                        if (score == 2) {
                            congo.style.display = "block";
                        }
                        cell.style.background = "green";

                        points.innerHTML = score;
                    }
                } else {
                    incorrectClickSound.play(); // Toca o som de clique incorreto

                    gameOver = true;
                    let bombArray = Array.from(bombIndexes);
                    // console.log(bombArray);
                    let bomb;
                    let bombIndex;
                    for (let j = 0; j < 9; j += 1) {
                        bombIndex = bombArray[j];
                        console.log(bombIndex);
                        bomb = document.getElementById(bombIndex);
                        bomb.style.background = "red";
                    }
                    newGame.style.display = "block";
                    newGame.addEventListener("click", () => {
                        location.reload();
                    });
                }
            });
        }
        root.appendChild(row);
    }
}

function generateRandomArray() {
    let set = new Set();
    for (let i = 0; set.size != 10; i += 1) {
        set.add(Math.floor(Math.random() * 81));
    }
    return set;
}

startGame();
