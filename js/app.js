

const first = document.querySelector('.first');
const second = document.querySelector('.second');
const modal = document.querySelector('.loading-container');
const statusElement = document.querySelector('.loading-status');
const progressBar = document.querySelector('.progress-bar-color');
const modalBox = document.querySelector('.loading-box');
const dateElement = document.getElementById('date');
const usersElement = document.getElementById('users');
const one = document.querySelector('.one');
const two = document.querySelector('.two');
const operators = document.querySelectorAll('.operator');
const operatorsContainer = document.querySelector('.operating-system-container');
const last = document.querySelector('.last');
const timer = document.querySelector('.time');
    
var activeSound = new Howl({
    src: ['sounds/active.mp3', 'sounds/active.ogg', 'sounds/active.aac']
});
var error = new Howl({
    src: ['sounds/appointed.mp3', 'sounds/appointed.ogg', 'sounds/appointed.aac']
});
var load = new Howl({
    src: ['sounds/loading.mp3', 'sounds/loading.ogg', 'sounds/loading.aac']
});
var show = new Howl({
    src: ['sounds/show.mp3', 'sounds/show.ogg', 'sounds/show.aac']
});

function convert(month) {
    return months[month];
}

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let date = new Date();
let currentDate = `${date.getDate()} ${convert(date.getMonth())} ${date.getFullYear()}`;

dateElement.innerText = currentDate;

let users = Math.floor(Math.random() * (420 - 280) + 280);
usersElement.innerText = users;

setInterval(() => {
    users = Math.floor(Math.random() * (420 - 280) + 280);
    usersElement.innerText = users;
}, 1000);

let seconds = 172800,
    minuts,
    remseconds;

function count() {
    minuts = Math.floor(seconds / 60);
    remseconds = seconds % 60;

    if (remseconds < 10) {
        remseconds = `0${remseconds}`;
    }

    if (minuts < 10) {
        minuts = `0${minuts}`;
    }

    if (seconds > 0) {
        timer.innerText = `${minuts} minutes and ${remseconds} seconds`;
    }
    else {
        timer.innerText = 'few seconds';
    }
}

let status = ["Getting files from host", "Generating nitro codes", "Checking nitro codes", "Getting nitro codes", "Successfully generated nitro codes, moving to download page"];
let statusIndex = 0;

function showModal() {
    document.body.style.overflow = 'hidden';
    show.play();
    statusElement.innerHTML = `${status[statusIndex]}...`;
    statusIndex++;
    progressBar.style.animationDuration = '4s';
    progressBar.style.WebkitAnimationDuration = '4s';
    modal.style.display = 'flex';

    setTimeout(() => {
        modal.style.display = 'none';
        one.style.display = 'none';
        two.style.display = 'block';
        load.play();
        document.body.style.overflow = 'scroll';
    }, 4000);
}

function active() {
    activeSound.play();
    operators.forEach(op => {
        op.classList.remove('animated', 'jello', 'active');
    });
    this.classList.add('animated', 'jello', 'active');
}

function secFun() {
    document.body.style.overflow = 'hidden';
    show.play();
    progressBar.style.animationDuration = '11s';
    progressBar.style.WebkitAnimationDuration = '11s';
    modal.style.display = 'flex';

    loop();

    function loop() {
        let duration = 4000;

        statusElement.classList.add('animated', 'bounceIn');

        statusElement.innerHTML = `${status[statusIndex]}...`;
        statusIndex++;

        if (statusIndex === 4) {
            duration = 1500;
        }

        statusElement.addEventListener('animationend', () => {
            statusElement.classList.remove('animated', 'bounceIn')
        });

        setTimeout(loop, duration);
    }

    setTimeout(() => {
        modalBox.classList.add('animated', 'bounceOut');
        modalBox.addEventListener('animationend', () => {
            modalBox.style.display = 'none';
            last.style.display = 'block';

            show.play();

            count();

            setInterval(() => {
                seconds--;
                count();
            }, 1000);
        });
    }, 11000);
}

first.addEventListener('click', showModal);
operators.forEach(op => op.addEventListener('click', active));
second.addEventListener('click', () => {
    let isActive = false;
    operators.forEach(op => {
        if (op.classList.contains('active')) {
            isActive = true;
        }
    });
    if (!isActive) {
        operatorsContainer.classList.add('animated', 'shake');
        error.play();
        operatorsContainer.addEventListener('animationend', () => {
            operatorsContainer.classList.remove('animated', 'shake');
        });
        return;
    }
    secFun();
});