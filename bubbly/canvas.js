"use strict";
var canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

var c = canvas.getContext('2d');

// earth color scheme
var earth = [
'rgba(0, 38, 28, x)', 
'rgba(4, 76, 41, x)',
'rgba(22, 127, 57, x)',
'rgba(69, 191, 85, x)',
'rgba(150, 237, 137, x)',
];

// fire color scheme
var fire = [
'rgba(242, 193, 102, x)', 
'rgba(242, 134, 39, x)',
'rgba(217, 63, 7, x)',
'rgba(140, 29, 4, x)',
'rgba(65, 15, 4, x)',
];

// water color scheme
var water = [
'rgba(0, 48, 90, x)', 
'rgba(0, 75, 141, x)',
'rgba(0, 116, 217, x)',
'rgba(65, 147, 217, x)',
'rgba(122, 186, 242, x)',
];

// collection of earth, fire and water
var colorArray = [earth, fire, water];

// current color accessor
var colors = colorArray[0];

function Circle(x, y, vx, vy, r) {
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.r = r;
	this.color = colors[Math.floor(Math.random() * colors.length)];
	this.alpha = 1;

	this.draw = function() {
		c.beginPath();
		c.strokeStyle = this.color.replace('x', + this.alpha);
		c.arc(this.x, this.y, this.r, Math.PI * 2, false);
		c.lineWidth = 2;
		c.stroke();
		c.fillStyle = 'transparent';
		c.fill();
	}

	this.update = function() {
		this.x += this.vx;
		this.y += this.vy;
		this.alpha -= 0.02;
		this.r -= 0.5;
		this.draw();
	}
}

// array of circles
var circles = [];

// mouse position
var mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};

// on mousemovement, update coordinates of mouse
window.addEventListener('mousemove', function(e) {
	mouse.x = e.x;
	mouse.y = e.y;
});

// change color scheme on click and rotate colorArray
window.addEventListener('click', function() {
	colorArray.push(colorArray.shift());
	colors = colorArray[0];
});

// ensure canvas is always full size of browser window
window.addEventListener('resize', function() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
});

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	var vx = (Math.random() - 0.5) * 5 + (Math.random() < 0.5 ? -2 : 2);
	var vy = (Math.random() - 0.5) * 5 + (Math.random() < 0.5 ? -2 : 2);
	var r = Math.random() * 20 + 30;
	circles.push(new Circle(mouse.x, mouse.y, vx, vy, r));
	
	for (let i = 0; i < circles.length; ++i) {
		circles[i].update();
		// remove the circle if it is transparent or too small
		if (circles[i].alpha < 0 || circles[i].r < 3) {
			circles.splice(i, 1);
		}
	}
}

animate();
