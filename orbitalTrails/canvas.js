"use strict";

// variables
let canvas = document.querySelector('canvas'),
	cw = window.innerWidth,
	ch = window.innerHeight,
	c = canvas.getContext('2d'),
	stars = [],
	origin = {
		x: innerWidth / 2, 
		y: innerHeight / 2
	},

	button = document.getElementById('clear');

canvas.width = cw;
canvas.height = ch;

// event listeners

window.addEventListener('mousedown', createStar);
window.addEventListener('mousedown', activateDraw);
window.addEventListener('mouseup', deactivateDraw);

// update canvas dimensions and origin position
window.addEventListener('resize', function() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	origin.x = innerWidth / 2;
	origin.y = innerHeight / 2;
});

// reset canvas
button.addEventListener('click', function() {
	stars = [];
});

// utility functions

function activateDraw() {
	window.addEventListener('mousemove', createStar, false);
}

function deactivateDraw() {
	window.removeEventListener('mousemove', createStar);
}

function createStar(e) {
	// x and y distance from origin
	let x = e.x - origin.x; 
	let y = e.y - origin.y;
	// radius of circular path using pythagoras
	let r = Math.sqrt((x * x) + (y * y));
	// calculate angle
	let a = Math.atan2(y, x); 
	// add new star
	stars.push(new Star(e.x, e.y, r, a));
}

// star constructor
function Star(x, y, r, a) {
	this.x = x;
	this.y = y;
	this.lastX = x;
	this.lastY = y;
	// distance from center
	this.r = r; 
	// current angle of point in radians
	this.a = a; 
	// set color based on angular position
	this.color = (this.a / Math.PI * 180) + 360;
	this.update = function() {
		// set last co-ordinates to current co-ordinates
		this.lastX = this.x;
		this.lastY = this.y;
		// update current co-ordinates
		this.x = origin.x + (this.r * Math.cos(this.a));
		this.y = origin.y + (this.r * Math.sin(this.a));
		// increase angle
		this.a += 0.01;
		// color represents a hue from 0 to 360
		// convert current angle (in radians) into degree form
		this.color = this.a / Math.PI * 180;
		this.draw();
	}
	this.draw = function() {
		c.beginPath();
		// color based off angular position
		c.strokeStyle = 'hsla(' + this.color + ', 100%, 50%, 1)';
		c.lineWidth = 1;
		c.moveTo(this.lastX, this.lastY);
		c.lineTo(this.x, this.y);
		c.stroke();
	}
}

// animate the canvas

function animate() {
	requestAnimationFrame(animate);
	// set fillstyle to very light black
	// so that older drawn elements are faded out (layering effect)
	// and newer elements are more vibrant
	// creating a fading trail effect
	c.fillStyle = 'rgba(0, 0, 0, 0.1)';
	c.fillRect(0, 0, innerWidth, innerHeight);
	// update all stars
	let i = stars.length;
	while (i--) {
		let star = stars[i];
		// length of star trail
		let trailLength = 3;
		while (trailLength--) {
			star.update();
		}
	}
}

animate();
