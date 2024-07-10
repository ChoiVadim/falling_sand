let w = 5;
let hueValue = 205;
let cols, rows;
let grid, nextGrid;

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}

function setup() {
    createCanvas(600, 800);
    colorMode(HSB, 360, 255, 255);
    cols = width / w;
    rows = height / w;
    grid = make2DArray(cols, rows);
}

function draw() {
    background(230);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            noStroke();
            if (grid[i][j] > 0) {
                fill(grid[i][j], 255, 255);
                let x = i * w;
                let y = j * w;
                square(x, y, w);
            }
        }
    }

    logic();
}

function logic() {
    nextGrid = make2DArray(cols, rows);
    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            if (state > 0) {
                
                let below, belowL, belowR;
                let dir = random([-1, 1]);
                below = grid[i][j + 1];

                if (i + dir >= 0 && i + dir < cols) {
                    belowR = grid[i + dir][j + 1];
                }

                if (i - dir >= 0 && i - dir < cols) {
                    belowL = grid[i - dir][j + 1];
                }
                
                if (below === 0) {
                    nextGrid[i][j + 1] = state;
                } else if (belowL === 0) {
                    nextGrid[i - dir][j + 1] = state;
                } else if (belowR === 0) {
                    nextGrid[i + dir][j + 1] = state;
                } else {
                    nextGrid[i][j] = state;
                }
            }
        }
    }

    grid = nextGrid;
}

function mouseDragged() {
    let col = floor(mouseX / w);
    let row = floor(mouseY / w);
    
    if (col < 0 || row < 0 || col > cols - 1 || row > rows - 1) {
        return;
    }

    grid[col][row] = hueValue;
    hueValue += 0.5;
    if (hueValue > 239) {
        hueValue = 205;
    }
}