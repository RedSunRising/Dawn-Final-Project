    //var ctx = $("#canvas").get()[0].getContext("2d");

    var canvas = document.getElementsByTagName('canvas')[0];

    // create a gradient for the fill. Note the strange
    // offset, since the gradient is calculated based on
    // the canvas, not the specific element we draw
 /*   var gradient = ctx.createLinearGradient(0,0,0,300);
    gradient.addColorStop(1,'#000000');
    gradient.addColorStop(0.75,'#ff0000');
    gradient.addColorStop(0.25,'#ffff00');
    gradient.addColorStop(0,'#ffffff');*/

    // set up the processing sketch

    function sketch(p){
    
    function setup(){    
        p.size(300, 300);
        p.background(0);

    }

    function draw() {
        p.background(0);
        p.translate(0, 300);
        p.scale(1, -1);
        drawRect1(average);
        drawRect2(average2);
    }

  /*  function clearRect(){
        p.rect(0, 0, 60, 130);
    }*/

    function square() {
        p.fill(0, 255, 0);
        p.rect(0,0, 100, 100);
    }

    function drawRect1(average){
        p.fill(255, 0, 0);
        p.rect(0, 0, 25, 2*average);
    }

    function drawRect2(average2){

        p.fill(255, 255, 255);
        p.rect(30, 0, 25, 2*average2);
    }

    var average = null;
    var average2 = null;
    // when the javascript node is called
    // we use information from the analyzer node
    // to draw the volume
    javascriptNode.onaudioprocess = function() {
        // get the average for the first channel
        //clearRect();

        var array =  new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        average = getAverageVolume(array);

        // drawRect1(average);

        var array2 =  new Uint8Array(analyser2.frequencyBinCount);
        analyser2.getByteFrequencyData(array2);
        average2 = getAverageVolume(array2);

        // drawRect2(average2);
        
        // clear the current state
       // ctx.clearRect(0, 0, 60, 130);

        // set the fill style
       // ctx.fillStyle=gradient;

        // create the meters
  /*      ctx.fillRect(0,130-average,25,130);
        ctx.fillRect(30,130-average2,25,130);*/
    }

    p.setup = setup;
    p.draw = draw;
}

var p = new Processing(canvas, sketch);