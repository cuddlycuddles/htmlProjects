"use strict";

let canvas = document.querySelector('canvas'),
	c = canvas.getContext('2d'),
	squares = [],
	origin = {
		x: innerWidth / 2,
		y: innerHeight / 2
	},
	button = document.getElementById('clear');

// linked list of directions for square movement
let directions = {	
	up: {
		vx: 0,
		vy: -1,
		check: function() {
			return this.y <= this.tl;
		}
	},
	right: {
		vx: 1,
		vy: 0,
		check: function() {
			return this.x >= this.tr;
		}
	},
	down: {
		vx: 0,
		vy: 1,
		check: function() {
			return this.y >= this.br;
		}
	},
	left: {
		vx: -1,
		vy: 0,
		check: function() {
			return this.x <= this.bl;
		}
	}
};
// link list items
directions.up.next = directions.right;
directions.right.next = directions.down;
directions.down.next = directions.left;
directions.left.next = directions.up;

canvas.width = innerWidth;
canvas.height = innerHeight;

// event listeners

window.addEventListener('resize', function() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	origin.x = innerWidth / 2;
	origin.y = innerHeight / 2;
});

window.addEventListener('mousemove', createSquare, false);

function createSquare(e) {
	let x = e.x - origin.x;
	let y = e.y - origin.y;
	// angle in degrees starting from 3 o'clock going clockwise
	let a = (Math.atan2(y, x)) / Math.PI * 180;
	// half of square's sidelength == the larger of x and y
	let s = (Math.abs(x) > Math.abs(y)) ? Math.abs(x) : Math.abs(y);
	// 9 o'clock to 3'oclock is negative, convert it into proper form
	if (a < 0) {
		a = 360 + a;
	}
	// direction the square should currently be heading towards
	let d;
	if (a >= 45 && a < 135) {
		d = directions.left;
	} else if (a >= 135 && a < 225) {
		d = directions.up;
	} else if (a >= 225 && a < 315) {
		d = directions.right;
	} else {
		d = directions.down;
	}
	let t = 7;
	squares.push(new Square(e.x, e.y, s, d, t));
}

// square constructor
function Square(x, y, s, d, t) {
	this.x = x;
	this.y = y;
	this.lastX = x;
	this.lastY = y;
	// half of sidelength
	this.s = s;
	// initial direction
	this.d = d;
	// time to live
	this.t = t;
	// velocity
	this.vx = d.vx;
	this.vy = d.vy;
	// corner positions
	this.tl = origin.y - s;
	this.tr = origin.x + s;
	this.bl = origin.x - s;
	this.br = origin.y + s;
	this.a;
	this.update = function() {
		this.lastX = this.x;
		this.lastY = this.y;
		this.x += this.vx;
		this.y += this.vy;
		this.t -= 0.01;
		this.a = (Math.atan2(this.y - origin.y, this.x - origin.x) / Math.PI * 180);
		this.draw();
	};
	this.draw = function() {
		c.beginPath();
		c.strokeStyle = 'hsla(' + this.a + ', 100%, 50%, 1)';
		c.lineWidth = 1;
		c.moveTo(this.lastX, this.lastY);
		c.lineTo(this.x, this.y);
		c.stroke();
	};
}

function animate() {
	requestAnimationFrame(animate);
	c.fillStyle = 'rgba(0, 0, 0, 0.1)';
	c.fillRect(0, 0, innerWidth, innerHeight);
	let i = squares.length;
	while (i--) {
		// create a reference so the squares array is only accessed once
		let ref = squares[i];
		let trailLength = 5;
		while (trailLength--) {
			// check if it is past its current corner
			if (ref.d.check.apply(ref)) {
				// new direction and velocities
				ref.d = ref.d.next;
				ref.vx = ref.d.vx;
				ref.vy = ref.d.vy; 
			}
			ref.update();
		}
		if (ref.t <= 0) {
				squares.splice(i, 1);
		}
	}
}

animate();
