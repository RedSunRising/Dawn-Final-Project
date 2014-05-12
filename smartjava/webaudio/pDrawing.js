
    var canvas = document.getElementsByTagName('canvas')[0];

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

        var array2 =  new Uint8Array(analyser2.frequencyBinCount);
        analyser2.getByteFrequencyData(array2);
        average2 = getAverageVolume(array2);
    }

    p.setup = setup;
    p.draw = draw;
}

var p = new Processing(canvas, sketch);