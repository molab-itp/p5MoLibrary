// Import stylesheets
// import './style.css';

let canvasEl;
let ctx;
let image;
let isDragging;
let isMousedown;
let startPanX = 0;
let startPanY = 0;
let zoom = 1;
let panX = 0;
let panY = 0;

// init();

function js_image_viewer_init(imagePath) {
  canvasEl = document.getElementById('canvas');
  ctx = canvasEl.getContext('2d');

  // loadImage(`https://loremflickr.com/320/240`, 320, 240).then((img) => {
  if (!imagePath) {
    imagePath = '../../assets/The_Celestial_Zoo.png';
  }
  loadImage(imagePath, 4800, 3200).then((img) => {
    image = img;
    ctx.drawImage(img, 0, 0);
    setupListeners(canvasEl);
  });
}

function loadImage(src, width, height) {
  const image = new Image();
  image.src = src;
  image.width = width;
  image.height = height;

  return new Promise((resolve) => {
    image.onload = () => {
      resolve(image);
    };
  });
}

function setupListeners(canvasEl) {
  canvasEl.addEventListener('mousedown', (e) => handleMouseDown(e));
  canvasEl.addEventListener('mouseup', () => handleMouseUp());
  canvasEl.addEventListener('mousemove', (e) => handleMouseMove(e));
  canvasEl.addEventListener('mousewheel', (e) => handleMouseWheel(e));

  // For mobile
  canvasEl.addEventListener('touchstart', (e) => handleMouseDown(e));
  canvasEl.addEventListener('touchend', (e) => handleMouseUp(e));
  canvasEl.addEventListener('touchmove', (e) => handleMouseMove(e));
}

function handleMouseDown(event) {
  isMousedown = true;
  startPanX = event.clientX;
  startPanY = event.clientY;
}

function handleMouseMove(event) {
  if (!isMousedown) {
    return;
  }

  const deltaX = startPanX - event.clientX;
  const deltaY = startPanY - event.clientY;
  panX += deltaX;
  panY += deltaY;
  startPanX = event.clientX;
  startPanY = event.clientY;
  redraw(image, zoom);
}

function handleMouseWheel(event) {
  event.preventDefault();
  isMousedown = false;
  const zoomChange = -event.deltaY;
  zoom += zoomChange / 4;

  if (zoom < 0.75) {
    zoom = 0.75;
  }
  if (zoom > 3) {
    zoom = 3;
  }
  redraw(image, zoom);
}

// { x, y }
function pan_draw(args) {
  panX = args.x;
  panY = args.y;
  redraw(image, zoom);
}

function redraw(image, zoom) {
  if (!ctx) {
    return;
  }
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height); // Clear canvas
  const perceivedWidth = image.width * zoom;
  const perceivedHeight = image.height * zoom;

  let dx = 0;
  let dy = 0;

  // Center the image as you zoom in using dx and dy offsets
  if (zoom > 1) {
    dx = -perceivedWidth / 4;
    dy = -perceivedHeight / 4;
  } else {
    dx = 0;
    dy = 0;
  }

  boundPan();
  ctx.drawImage(image, panX, panY, image.width, image.height, dx, dy, perceivedWidth, perceivedHeight);
}

function boundPan() {
  const padding = 50 * zoom;
  if (panX - padding < -image.width) {
    panX = -image.width + padding;
  }

  if (panX + padding > image.width) {
    panX = image.width - padding;
  }

  if (panY - padding < -image.height) {
    panY = -image.height + padding;
  }

  if (panY + padding > image.height) {
    panY = image.height - padding;
  }
}

function handleMouseUp() {
  isMousedown = false;
  isDragging = false;
}
