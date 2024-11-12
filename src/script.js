document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('mazeCanvas');
    const ctx = canvas.getContext('2d');
    const timerElement = document.getElementById('timer');
    let playerX = 200;
    let playerY = 200;
    const playerSize = 5;
    let timeElapsed = 0;
    let timerInterval;
    let playerName = '';
    let leaderboardUpdated = false;

    function drawWalls() {
        ctx.beginPath();
        ctx.moveTo(40, 30);
        ctx.lineTo(40, 350);
        ctx.lineTo(350, 350);
        ctx.lineTo(350, 150);
        ctx.lineTo(150, 150);
        ctx.lineTo(150, 240);
		ctx.lineTo(100, 240);
		ctx.lineTo(100, 20);
		ctx.strokeStyle = 'gray';
        ctx.lineWidth = 8;
        ctx.stroke();
    }

    function drawArrow() {
        ctx.beginPath();
        ctx.moveTo(80, 120);
        ctx.lineTo(80, 50);
        ctx.lineTo(60, 75);
        ctx.lineTo(80, 50);
        ctx.lineTo(100, 75);
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'green';
        ctx.stroke();
    }

    function updateLeaderboard(playerName, time) {
        const leaderboardTable = document.getElementById('leaderboardTable');
        const newRow = leaderboardTable.insertRow();
        const nameCell = newRow.insertCell(0);
        const timeCell = newRow.insertCell(1);
        nameCell.textContent = playerName;
        timeCell.textContent = time + " с";
        leaderboardUpdated = true;
    }

    function drawPlayer() {
        ctx.beginPath();
        ctx.arc(playerX, playerY, playerSize, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    function updateTime() {
        timerElement.textContent = ``;
        timeElapsed++;
    }

    function startTimer() {
        timeElapsed = 0;
        timerInterval = setInterval(updateTime, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    drawWalls();
    drawPlayer();

    const playerNameInput = document.getElementById('playerNameInput');
    playerNameInput.focus();
    playerNameInput.addEventListener('change', () => {
        playerName = playerNameInput.value;
        playerNameInput.disabled = true;
        startTimer();
    });

    document.addEventListener('keydown', (event) => {
        if (!playerName && !leaderboardUpdated) return;
        const key = event.key;
        let newX = playerX;
        let newY = playerY;
        switch (key) {
            case 'ArrowUp':
                newY -= 10;
                break;
            case 'ArrowDown':
                newY += 10;
                break;
            case 'ArrowLeft':
                newX -= 10;
                break;
            case 'ArrowRight':
                newX += 10;
                break;
            default:
                break;
        }
        if (!isCollidingWithWalls(newX, newY)) {
            playerX = newX;
            playerY = newY;
            ctx.clearRect(0, 0, 400, 400);
            drawWalls();
            drawPlayer();
            drawArrow();
        }
        if (newX < 40 || newX > 350 || newY < 40 || newY > 350) {
            stopTimer();
            updateLeaderboard(playerName, timeElapsed);
			
			const fullscreenImage = document.getElementById('fullscreenImage');
			fullscreenImage.style.display = 'block';

			// Optionally, you can add a delay to show the image for a certain amount of time before hiding it.
			setTimeout(() => {
				fullscreenImage.style.display = 'none';
			}, 5000); // Display the image for 5 seconds before hiding it
        }
    });

    function isCollidingWithWalls(x, y) {
        return (
            (x >= 120 && x <= 120 && y >= 40 && y <= 240) ||
            (x >= 40 && x <= 40 && y >= 40 && y <= 350) ||
            (x >= 350 && x <= 350 && y >= 40 && y <= 350) ||
            (x >= 120 && x <= 350 && y >= 40 && y <= 40) ||
            (x >= 40 && x <= 350 && y >= 350 && y <= 350)
        );
    }
});