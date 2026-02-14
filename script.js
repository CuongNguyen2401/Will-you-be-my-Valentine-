const messages = [
    "Đi mà?",
    "Thật á?",
    "Chắc chưa?",
    "Thôi mà",
    "Suy nghĩ kĩ đi",
    "Nếu từ chối tui buồn lắm á",   
    "Buồn lắm luôn á",
    "Thôi mà",
];

const cryGifs = [
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnM0ZTd0aWN5dXB0OGk5aGs5NXYyZGQwaWozdHFhMGI3ZWZtbnVjbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/1BeoHHs5ID6M1L95WT/giphy.gif",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGYzancxMzY0NTVmOXZvbWExZGkyOXkxbHM2OHY4aDNvcWpmMnV5dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/9xcBrf9lGQBXNBkjno/giphy.gif",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGpnMW85ZWFmcXNqa3ZqdnZuNXJ6bXA2MTJudzM4NGVjYTFjeWE5NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/sRHOAgD3AA1DnFTR25/giphy.gif",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExenFjYjZ6NHYzbGRxNGRwcHM0cTZ4bjl3dm9lMWdpbTBqcmhlbWMwcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/9Ji1tn7DMHcT7FBaXT/giphy.gif",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2p3YmdtaHNmdHFqaHZsbjhkNGV4bjR1djFidzNhaXp4ZHk3bXpxZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/plhTLBh39Whm6w1GW7/giphy.gif"
];

let messageIndex = 0;
let noClickCount = 0;
let gifPositions = [];

const GIF_WIDTH = 200;
const GIF_HEIGHT = 200;

function checkCollision(x, y, width, height) {
    for (let pos of gifPositions) {
        if (!(x + width < pos.x || 
              x > pos.x + pos.width || 
              y + height < pos.y || 
              y > pos.y + pos.height)) {
            return true;
        }
    }
    return false;
}

function getRandomPosition() {
    let attempts = 0;
    const maxAttempts = 50;
    
    while (attempts < maxAttempts) {
        const randomX = Math.random() * (window.innerWidth - GIF_WIDTH - 20);
        const randomY = Math.random() * (window.innerHeight - GIF_HEIGHT - 20);
        
        if (!checkCollision(randomX, randomY, GIF_WIDTH, GIF_HEIGHT)) {
            gifPositions.push({
                x: randomX,
                y: randomY,
                width: GIF_WIDTH,
                height: GIF_HEIGHT
            });
            return { x: randomX, y: randomY };
        }
        
        attempts++;
    }
    
    const randomX = Math.random() * (window.innerWidth - GIF_WIDTH - 20);
    const randomY = Math.random() * (window.innerHeight - GIF_HEIGHT - 20);
    return { x: randomX, y: randomY };
}

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');

    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;

    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;

    noClickCount++;

    // Create 3 gifs per click
    for (let i = 0; i < 3; i++) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('cry-gif-wrapper');

        const position = getRandomPosition();
        wrapper.style.left = `${position.x}px`;
        wrapper.style.top = `${position.y}px`;

        const img = document.createElement('img');
        img.src = cryGifs[Math.floor(Math.random() * cryGifs.length)];
        img.alt = "Crying GIF";

        const label = document.createElement('p');
        label.classList.add('cry-label');
        label.textContent = noClickCount === 3 ? "Đồng ý đi!" : "Đồng ý";

        wrapper.appendChild(img);
        wrapper.appendChild(label);
        document.body.appendChild(wrapper);
    }
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}