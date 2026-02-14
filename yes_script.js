const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Heart {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.swing = Math.random() * 2 - 1;
        this.swingSpeed = Math.random() * 0.02 + 0.01;
        this.swingAmount = Math.random() * 30 + 20;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#ff69b4';
        
        ctx.translate(this.x, this.y);
        ctx.scale(this.size / 20, this.size / 20);
        
        // Draw heart shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-10, -10, -20, 0, -10, 10);
        ctx.bezierCurveTo(-10, 15, 0, 20, 0, 25);
        ctx.bezierCurveTo(0, 20, 10, 15, 10, 10);
        ctx.bezierCurveTo(20, 0, 10, -10, 0, 0);
        ctx.fill();
        
        ctx.restore();
    }

    update() {
        this.y += this.speed;
        this.swing += this.swingSpeed;
        this.x += Math.sin(this.swing) * 0.5;
        
        if (this.y > canvas.height + 50) {
            this.y = -50;
            this.x = Math.random() * canvas.width;
        }
    }
}

const hearts = [];
for (let i = 0; i < 50; i++) {
    hearts.push(new Heart());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    hearts.forEach(heart => {
        heart.update();
        heart.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();
