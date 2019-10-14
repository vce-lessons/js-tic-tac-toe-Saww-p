// Your code here
 
let canv = document.createElement('canvas');

let width = canv.width = window.innerWidth;
let height = canv.height = window.innerHeight;

let ctx = canv.getContext('2d');
document.body.appendChild(canv);


let halfWidth = width / 2;								// ??
let halfHeight = height / 2;							// ??

let gameSize = 600;												// размер игрового поля 
let halfGameSize = gameSize / 2;					// половина рамзмра игрового поля ??

ctx.textAlign = 'center';					// горизонтальное выравнивание по центру
ctx.textBaseline = 'middle';		  // ??

let ended = false;							// переменная , к-ая отображает состояние игры, по умолчанию игра не закончена


//////////
// INIT //
//////////
let beginX = halfWidth - halfGameSize,   	//??
		beginY = halfHeight - halfGameSize,		//??
		turn = 0,															// Очередь
		map = [];

// make map    составление карты
for (let i = 0; i < 5; i++) {
	map[i] = [];

	for (let j = 0; j < 5; j++) {
		map[i][j] = '';
	}
}






loop();


function loop() {
	draw();

	requestAnimationFrame(loop);
}



function draw() {
	drawGrid();

	ctx.font = '100px sans-serif';

	// draw letters
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {

			ctx.fillText(map[j][i], 
				beginX + gameSize/5 * i + gameSize/5/2, 
				beginY + gameSize/5 * j + gameSize/5/2);
		}
	}
}



function drawGrid() {
	ctx.strokeRect(beginX, beginY, gameSize, gameSize);

	ctx.beginPath();
	// vertical left
	ctx.moveTo(beginX + gameSize/5, beginY);
	ctx.lineTo(beginX + gameSize/5, beginY + gameSize);

	// vertical left
	ctx.moveTo(beginX + gameSize/5*2, beginY);
	ctx.lineTo(beginX + gameSize/5*2, beginY + gameSize);

	ctx.moveTo(beginX + gameSize/5*3, beginY);
	ctx.lineTo(beginX + gameSize/5*3, beginY + gameSize);

	//vertical left
	ctx.moveTo(beginX + gameSize/5*4, beginY);
	ctx.lineTo(beginX + gameSize/5*4, beginY + gameSize);

	// horizontal top
	ctx.moveTo(beginX, beginY + gameSize/5);
	ctx.lineTo(beginX + gameSize, beginY + gameSize/5);

	// horizontal bottom
	ctx.moveTo(beginX, beginY + gameSize/5*2);
	ctx.lineTo(beginX + gameSize, beginY + gameSize/5*2);
		
	// horizontal bottom
	ctx.moveTo(beginX, beginY + gameSize/5*3);
	ctx.lineTo(beginX + gameSize, beginY + gameSize/5*3);

	// horizontal bottom
	ctx.moveTo(beginX, beginY + gameSize/5*4);
	ctx.lineTo(beginX + gameSize, beginY + gameSize/5*4);

	ctx.stroke();
	ctx.closePath();
}



document.addEventListener('click', e => {
	// check if we clicked inside square
	if (beginX            > e.clientX || 
			beginX + gameSize < e.clientX || 
			beginY            > e.clientY ||
			beginY + gameSize < e.clientY) return;


	if (!ended)
		step(e.clientX - beginX, e.clientY - beginY);
});



// [  0 1 2
// 0 [0,1,2]
// 1 [0,1,2]
// 2 [0,1,2]
// ]



function step(ox, oy) {
	// calc square coords
	let x = Math.floor(ox / (gameSize/5)),
			y = Math.floor(oy / (gameSize/5));


	if (map[y][x] !== '') return;

	if (turn === 0) {
		map[y][x] = 'x';
		turn = 1;
	} else {
		map[y][x] = 'o';
		turn = 0;
	}

	// if somebody won
	if (check()) {
		ended = true;

		setTimeout(() => {
			alert((turn === 0 ? 'Second' : 'First') + ' player win');
		}, 50);
	}
}



function check() {
	// checking rows
	for (let i = 0; i < 5; i++) {
		if (map[i][0] === '') continue;
		let l = true;

		for (let j = 1; j < 5; j++)
			if (map[i][0] !== map[i][j]) l = false;

		if (l) return true; 
	}


	// checking columns
	for (let i = 0; i < 5; i++) {
		if (map[0][i] === '') continue;
		let l = true;

		for (let j = 1; j < 5; j++)
			if (map[0][i] !== map[j][i]) l = false;

		if (l) return true;
	}

	// checking first diagonal
	if (map[0][0] !== '' && 
			map[0][0] === map[1][1] && 
			map[0][0] === map[2][2] &&
			map[0][0] === map[3][3] && 
			map[0][0] === map[4][4]) return true;



	// checking second diagonal
	if (map[0][4] !== '' && 
			map[0][4] === map[1][3] && 
			map[0][4] === map[2][2] &&
			map[0][4] === map[3][1] &&
			map[0][4] === map[4][0]) return true;

	return false;
}

