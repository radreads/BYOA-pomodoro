let timeLeft;
let timerId = null;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const pomodoroButton = document.getElementById('pomodoro');

const POMODORO_TIME = 25 * 60;

const messages = [
    "You got this",
    "You're doing great",
    "You're a samurai",
    "I love you, keep going",
    "Play on, playa"
];

const motivationalElement = document.getElementById('motivational-message');
let currentMessageIndex = 0;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startButton.disabled = true;
        startButton.style.opacity = '0.5';
        pauseButton.disabled = false;
        pauseButton.style.opacity = '1';
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                isRunning = false;
                startButton.disabled = false;
                startButton.style.opacity = '1';
                pauseButton.disabled = true;
                pauseButton.style.opacity = '0.5';
                alert('Time is up!');
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    isRunning = false;
    startButton.disabled = false;
    startButton.style.opacity = '1';
    pauseButton.disabled = true;
    pauseButton.style.opacity = '0.5';
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    startButton.disabled = false;
    startButton.style.opacity = '1';
    pauseButton.disabled = true;
    pauseButton.style.opacity = '0.5';
    timeLeft = POMODORO_TIME;
    updateDisplay();
}

function updateMotivationalMessage() {
    motivationalElement.style.opacity = '0';
    
    setTimeout(() => {
        motivationalElement.textContent = messages[currentMessageIndex];
        motivationalElement.style.opacity = '1';
        currentMessageIndex = (currentMessageIndex + 1) % messages.length;
    }, 300);
}

// Initialize timer
timeLeft = POMODORO_TIME;
updateDisplay();

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Add this after your variable declarations at the top
pauseButton.disabled = true;
pauseButton.style.opacity = '0.5';

// Initial message
updateMotivationalMessage();

// Rotate messages every 5 seconds
setInterval(updateMotivationalMessage, 5000); 