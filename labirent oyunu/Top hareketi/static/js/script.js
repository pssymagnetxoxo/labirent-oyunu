const ROWS = 10;
const COLS = 10;

function generateMaze() {
    let visited = [];
    let walls = [];

    for (let i = 0; i < ROWS; i++) {
        visited[i] = [];
        for (let j = 0; j < COLS; j++) {
            visited[i][j] = false;
        }
    }

    let startRow = Math.floor(Math.random() * ROWS);
    let startCol = Math.floor(Math.random() * COLS);
    visited[startRow][startCol] = true;

    addWalls(startRow, startCol, walls);

    while (walls.length) {
        let randomIndex = Math.floor(Math.random() * walls.length);
        let [currentRow, currentCol, nextRow, nextCol] = walls[randomIndex];
        walls.splice(randomIndex, 1);

        if (visited[nextRow][nextCol]) continue;

        let div = document.createElement("div");
        div.classList.add("kaya");
        if (nextRow === currentRow) {
            div.classList.add("yatay");
            div.style.left = Math.min(currentCol, nextCol) * 100 + "px";
            div.style.top = nextRow * 100 + "px";
        } else {
            div.classList.add("dik");
            div.style.left = nextCol * 100 + "px";
            div.style.top = Math.min(currentRow, nextRow) * 100 + "px";
        }
        document.getElementById("container").appendChild(div);

        visited[nextRow][nextCol] = true;
        addWalls(nextRow, nextCol, walls);
    }

    function addWalls(row, col, wallsList) {
        if (row > 0) wallsList.push([row, col, row - 1, col]);
        if (row < ROWS - 1) wallsList.push([row, col, row + 1, col]);
        if (col > 0) wallsList.push([row, col, row, col - 1]);
        if (col < COLS - 1) wallsList.push([row, col, row, col + 1]);
    }
}


generateMaze();

var Keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

var container = document.getElementById("container");
var ball = document.getElementById("ball");
var kayaElements = document.querySelectorAll(".kaya"); 
var ballX = 170;
var ballY = 340;
var ballXSpeed = 0;
var ballYSpeed = 0;

function useLettersAndArrows() {
    window.onkeydown = function (event) {
        var kc = event.keyCode;
        event.preventDefault();

        if (kc === 65 || kc === 37) Keys.left = true;
        else if (kc === 87 || kc === 38) Keys.up = true;
        else if (kc === 68 || kc === 39) Keys.right = true;
        else if (kc === 83 || kc === 40) Keys.down = true;
    };

    window.onkeyup = function (event) {
        var kc = event.keyCode;
        event.preventDefault();

        if (kc === 65 || kc === 37) Keys.left = false;
        else if (kc === 87 || kc === 38) Keys.up = false;
        else if (kc === 68 || kc === 39) Keys.right = false;
        else if (kc === 83 || kc === 40) Keys.down = false;
    };
}

function updateBallPosition() {
    var prevX = ballX;
    var prevY = ballY;

    if (Keys.left) {
        ballXSpeed = -1;
    } else if (Keys.right) {
        ballXSpeed = 1;
    } else {
        ballXSpeed = 0;
    }

    if (Keys.up) {
        ballYSpeed = -1;
    } else if (Keys.down) {
        ballYSpeed = 1;
    } else {
        ballYSpeed = 0;
    }

    // Yeni pozisyonu hesapla
    var newBallX = ballX + ballXSpeed;
    var newBallY = ballY + ballYSpeed;

    // Yeni pozisyon topun hareket etmesine izin veriyorsa güncelle
    if (!checkCollision(newBallX, newBallY)) {
        ballX = newBallX;
        ballY = newBallY;
    }

    ballX = Math.min(container.clientWidth - ball.clientWidth, Math.max(0, ballX));
    ballY = Math.min(container.clientHeight - ball.clientHeight, Math.max(0, ballY));

    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
}

function checkCollision(newX, newY) {
    var ballRect = ball.getBoundingClientRect();

    for (var i = 0; i < kayaElements.length; i++) {
        var kayaRect = kayaElements[i].getBoundingClientRect();

        if (
            newX + ballRect.width >= kayaRect.left &&
            newX <= kayaRect.right &&
            newY + ballRect.height >= kayaRect.top &&
            newY <= kayaRect.bottom
        ) {
            return true;
        }
    }

    return false;
}



setInterval(updateBallPosition, 5);
useLettersAndArrows();