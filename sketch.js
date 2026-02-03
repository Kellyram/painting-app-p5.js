let currentColor;
let colors = {};
let brushSize = 5;
let isDrawing = false;
let lastX, lastY;
let canvas;
let buttons = [];
  
function setup() {
  // Create canvas with some margin for UI
  canvas = createCanvas(800, 800);
  canvas.position(0, 100);
  background(255);
  
  // Define colors
  colors = {
    red: [255, 0, 0],
    blue: [0, 0, 255],
    green: [0, 255, 0],
    black: [0, 0, 0]
  };
  currentColor = colors.black;
  
  createUI();
  
  // Instructions
  fill(0);
  noStroke();
  text("Draw with mouse. Use buttons above to change tools.", 150, 10);
}

function draw() {
  // Real-time drawing happens in mouseDragged
}

function mouseDragged() {
  if (isDrawing) {
    stroke(currentColor);
    strokeWeight(brushSize);
    strokeCap(ROUND);
    
    // Draw smooth line
    line(lastX, lastY, mouseX, mouseY);
    
    // Update last position
    lastX = mouseX;
    lastY = mouseY;
  }
}

function mousePressed() {
  isDrawing = true;
  lastX = mouseX;
  lastY = mouseY;
  
  // Draw a single point when clicked
  stroke(currentColor);
  strokeWeight(brushSize);
  strokeCap(ROUND);
  point(mouseX, mouseY);
}

function mouseReleased() {
  isDrawing = false;
}

function createUI() {
  // Color selection buttons
  createColorButton("Red", colors.red, 1);
  createColorButton("Blue", colors.blue, 50);
  createColorButton("Green", colors.green, 100);
  createColorButton("Black", colors.black, 150);
  
  // Random color button
  createRandomColorButton("Random", 200);
  
  // Brush size buttons
  createBrushSizeButton("Small", 1, 260);
  createBrushSizeButton("Medium", 5, 330);
  createBrushSizeButton("Large", 15, 400);
  
  // Eraser button
  let eraserBtn = createButton("Eraser");
  eraserBtn.position(480, 10);
  eraserBtn.size(80, 40);
  eraserBtn.mousePressed(() => {
    currentColor = [255, 255, 255]; // White for erasing
    brushSize = 15; // Set eraser to large size
    updateActiveButton("eraser");
  });
  buttons.push({element: eraserBtn, id: "eraser"});
  
  // Clear canvas button
  let clearBtn = createButton("Clear board");
  clearBtn.position(600, 10);
  clearBtn.size(120, 40);
  clearBtn.mousePressed(() => {
    background(255);
    // Redraw instructions
    fill(0);
    noStroke();
    text("Draw with mouse. Use buttons above to change tools.", 150, 10);
  });
  buttons.push({element: clearBtn, id: "clear"});
  
  // Set black as active initially
  updateActiveButton("black");
}

function createColorButton(label, color, xPos) {
  let btn = createButton(label);
  btn.position(xPos, 10);
  btn.size(50, 40);
  btn.style('background-color', `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
  btn.mousePressed(() => {
    currentColor = color;
    updateActiveButton(label.toLowerCase());
  });
  buttons.push({element: btn, id: label.toLowerCase()});
}

function createRandomColorButton(label, xPos) {
  let btn = createButton(label);
  btn.position(xPos, 10);
  btn.size(70, 40);
  btn.style('background', 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)');
  btn.style('color', 'white');
  btn.mousePressed(() => {
    // Generate random RGB values
    let r = floor(random(256));
    let g = floor(random(256));
    let b = floor(random(256));
    currentColor = [r, g, b];
    updateActiveButton("random");
  });
  buttons.push({element: btn, id: "random"});
}

function createBrushSizeButton(label, size, xPos) {
  let btn = createButton(label);
  btn.position(xPos, 10);
  btn.size(70, 40);
  btn.mousePressed(() => {
    brushSize = size;
    updateActiveButton(`size_${label.toLowerCase()}`);
  });
  buttons.push({element: btn, id: `size_${label.toLowerCase()}`});
}

function updateActiveButton(activeId) {
  // Reset all buttons to default style
  buttons.forEach(btn => {
    btn.element.style('border', '2px solid #666');
    btn.element.style('font-weight', 'normal');
  });
  
  // Highlight active button
  let activeBtn = buttons.find(btn => btn.id === activeId);
  if (activeBtn) {
    activeBtn.element.style('border', '4px solid #FF9900');
    activeBtn.element.style('font-weight', 'bold');
  }
}