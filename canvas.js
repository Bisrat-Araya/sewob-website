let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// context
let c = canvas.getContext('2d');

// point object
class Point {
    constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }
    move(dx, dy) {
        if (this.x + this.dx > window.innerWidth || this.x + this.dx < 0) {
            this.dx = -this.dx;
        } else if (this.y + this.dy > window.innerHeight || this.y + this.dy < 0) {
            this.dy = -this.dy;
        } else {
            this.x += this.dx;
            this.y += this.dy;
        }
    }
}

// points
let numPoints = 600;
if (canvas.width < 1200) {
    numPoints = 400;
}

if (canvas.width < 600) {
    numPoints = 150;
}

let points = [];
function init() {
    points = [];
    for (let i = 0; i < numPoints; i++) {
        points.push(
            new Point(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2
            )
        );
    }
    return points;
}

// window resize event listener
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

// animate
const connectRadius = 70;
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            let dist = Math.sqrt((points[i].x - points[j].x)**2 + (points[i].y - points[j].y)**2)
            let opacity = 1 - dist / connectRadius;
            if (dist < connectRadius) {
                c.beginPath();
                c.moveTo(points[i].x, points[i].y);
                c.lineTo(points[j].x, points[j].y);
                c.strokeStyle = `hsl(203, 90%, 35%, ${opacity})`
                c.stroke();
            }
        }
    }
    for (let i = 0; i < points.length; i++) {
        points[i].move();
    }
}

init();
animate();