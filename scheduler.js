
function startAnimation() {
    console.log('but');
  if (animating) {
    stopAnimation();
  } else {
    animating = true;
    now = new Date().getTime();
    speed = speedInput.value;
    startButton.textContent = 'Cancel Animation';
    map.on('postcompose', moveFeature);
    map.render();
  }
}

function stopAnimation() {
  animating = false;
  startButton.textContent = 'Start Animation';
  //remove listener
  map.un('postcompose', moveFeature);
}

startButton.addEventListener('click', startAnimation, false);
