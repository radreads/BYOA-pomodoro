let timeLeft;
let timerId = null;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const pomodoroButton = document.getElementById('pomodoro');
const shortBreakButton = document.getElementById('shortBreak');
const longBreakButton = document.getElementById('longBreak');

const POMODORO_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                isRunning = false;
                alert('Time is up!');
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    timeLeft = POMODORO_TIME;
    updateDisplay();
}

function setActiveButton(button) {
    [pomodoroButton, shortBreakButton, longBreakButton].forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
}

// Initialize timer
timeLeft = POMODORO_TIME;
updateDisplay();

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

pomodoroButton.addEventListener('click', () => {
    timeLeft = POMODORO_TIME;
    updateDisplay();
    setActiveButton(pomodoroButton);
});

shortBreakButton.addEventListener('click', () => {
    timeLeft = SHORT_BREAK_TIME;
    updateDisplay();
    setActiveButton(shortBreakButton);
});

longBreakButton.addEventListener('click', () => {
    timeLeft = LONG_BREAK_TIME;
    updateDisplay();
    setActiveButton(longBreakButton);
}); 