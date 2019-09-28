/**
AUTHOR: NIK BURMEISTER
9.28.2019
*/

function dots()
{
        /** @type {HTMLCanvasElement} */
        let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("ex1canvas"));
        let context = canvas.getContext('2d');
        let boxPics = [];

        let button = document.getElementById("clearcanv1");


        button.onclick = function(){
            boxPics = [];
        }

        // Add event listener for `click` events.
        canvas.addEventListener('click', function(event) {
                var mouseX = event.clientX;
                var mouseY = event.clientY;
                let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
                mouseX -= box.left;
                mouseY -= box.top;
                boxPics.push({"x": mouseX-3, "y": mouseY-3});
        });

        let mouseX = -10;
        let mouseY = -10;

        canvas.onmouseleave = function() {
                mouseX = -10;
                mouseY = -10;
        };

        canvas.onmousemove = function(event) {
                mouseX = event.clientX;
                mouseY = event.clientY;
                // unfortunately, X,Y is relative to the overall window -
                // we need the X,Y inside the canvas!
                // we know that event.target is a HTMLCanvasElement, so tell typescript
                let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
                mouseX -= box.left;
                mouseY -= box.top;
            };

        function drawPics(){
                context.clearRect(0,0,canvas.width, canvas.height);
                // get current mouse coordinates
                boxPics.forEach(function(dot){
                        context.beginPath();
                        if ( (Math.abs(mouseX - dot.x - 3) < 12) && (Math.abs(mouseY - dot.y -3) < 12) ) {
                                // blue
                                context.fillStyle = "#0062ff";
                        }else{
                                // purple
                                context.fillStyle = "#ff00dd";

                        }
                        context.arc(dot.x, dot.y, 12, 0, 2*Math.PI);
                        context.fill();
                        context.closePath();

                });
                window.requestAnimationFrame(drawPics);
        }
        drawPics();
}

function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
}


function fireworks2()
{
        /** @type {HTMLCanvasElement} */
        let canvas = (/** @type {HTMLCanvasElement} */ document.getElementById("ex2canvas"));
        let context = canvas.getContext('2d');

        let fireWorksArr = [];
        let explosionArr = [];

        let mouseX = -10;
        let mouseY = -10;

        // do some preprocessing to generate random colors
        let randomColorArray = []
        for(let i = 0; i < 100; i++){
                randomColorArray.push(getRandomColor());
        }

        canvas.onmousemove = function(event){
                var mouseX = event.clientX;
                var mouseY = event.clientY;
                let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
                mouseX -= box.left;
                mouseY -= box.top;
        }

        canvas.addEventListener("click", function(event){
                var mouseX = event.clientX;
                var mouseY = event.clientY;
                let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
                mouseX -= box.left;
                mouseY -= box.top;

                let xRange = canvas.width;

                fireWorksArr.push({"x": Math.random() * xRange, "y": canvas.scrollHeight+2,
                 "xC": mouseX-3, "yC": mouseY-3});
        });

        canvas.onmouseleave = function(){
                mouseX = -10;
                mouseY = -10;
        }

        function fireWorks(){
                context.clearRect(0, 0, canvas.width, canvas.height);
                // for all fireworks that haven't exploded, change position
                fireWorksArr.forEach(function(fw, index){
                        let yPos =  fw.y;
                        let xPos = fw.x;
                        let mouseYt = fw.yC;
                        let mouseXt = fw.xC;
                        let xFactor = (1 - ( 0.15*(yPos-2) / canvas.scrollHeight));
                        let newPosY = mouseYt + (yPos - mouseYt)*xFactor;
                        let newPosX = mouseXt + (xPos - mouseXt)*xFactor;
                        fireWorksArr[index].y = newPosY;
                        fireWorksArr[index].x = newPosX;
                });

                // calculate new positon of exploded fireworks
                explosionArr.forEach(function(fw){
                        fw.x -= fw.vx;
                        fw.y -= fw.vy;
                });

                // now look for fireworks that need to be exploded, do it within 2.5% of their mouse click
                fireWorksArr.forEach(function(fw, index, object){
                        if((Math.abs(fw.y - fw.yC))/fw.yC < 0.025){
                                object.splice(index, 1);
                                // now make an explosion
                                for(let i = 0; i < 100; i ++){
                                        let vx = (Math.random()-0.5)*5;
                                        let vy = (Math.random()-0.5)*5;
                                        explosionArr.push({"x": fw.xC, "y": fw.yC, "vx": vx, "vy": vy});
                                }

                        }
                });

                // filter for fireworks that need to be exploded

                fireWorksArr.forEach(function(fw) {
                        context.beginPath();
                        context.fillStyle = "#eb4034";
                        context.arc(fw.x, fw.y, 6, 0, 2*Math.PI);
                        context.closePath();
                        context.fill();
                });


                explosionArr.forEach(function(fw){
                        context.beginPath();
                        context.fillStyle = randomColorArray[Math.floor((Math.random() * 100))];
                        context.arc(fw.x, fw.y, 3, 0, 2*Math.PI);
                        context.closePath();
                        context.fill();
                });

                // remove any explosions that have left the screen
                explosionArr = explosionArr.filter(dot => ((dot.y > 0) && (dot.x > 0) && (dot.x<canvas.width) && (dot.y < canvas.height)));
                requestAnimationFrame(fireWorks)
        }
        fireWorks();

}

window.onload = function(){
    dots();
    fireworks2();
}
