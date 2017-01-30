var speedInput = document.getElementById('speed');
var startButton = document.getElementById('start-animation');

function startAnimation() {
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
