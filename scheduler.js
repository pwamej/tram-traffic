var speedInput = document.getElementById('speed');
var startButton = document.getElementById('start-animation');
var loadTramsButton = document.getElementById('load-trams');

var animating = false;
var trams = [];

var animate = function (event) {
    trams.map(function (tram) {
        tram.draw(event.vectorContext, event.frameState);
    });
    map.render();
}

function loadTrams () {
    var now = new Date().getTime();
    trams = relations.map(function (relation) {
        return new Tram(relation,now);
    });
}

function startAnimation () {
    if (animating) {
        stopAnimation();
    } else {
        animating = true;
        var now = new Date().getTime();
        speed = speedInput.value;
        startButton.textContent = 'Cancel Animation';
        
        trams = relations.map(function (relation) {
            return new Tram(relation,now);
        });
        
        map.on('postcompose', animate);
        map.render();
    }
}

function stopAnimation() {
    animating = false;
    startButton.textContent = 'Start Animation';
    map.un('postcompose', animate);
}

startButton.addEventListener('click', startAnimation, false);
loadTramsButton.addEventListener('click', loadTrams, false);
