console.log('BlackFacts');

{
  // place qrcode image at Bottom right
  let x = window.innerWidth - qrcode.clientWidth;
  let y = window.innerHeight - qrcode.clientHeight;
  qrcode.style.left = x + 'px';
  qrcode.style.top = y + 'px';
}
