//import Minim library
import ddf.minim.*;
  
//for displaying the sound's frequency
import ddf.minim.analysis.*;

Minim minim;
  
//to make it play song files
AudioPlayer song;
  
//for displaying the sound's frequency
FFT fft;

void setup() {
//sketch size
size(1280, 760);
frameRate(15);
 minim = new Minim(this);

song = minim.loadFile("07 The Clairvoyant.mp3");
song.play();

fft = new FFT(song.bufferSize(), song.sampleRate());
}
 
void draw() 
{
  background(0);
    
    smooth();
    noStroke();
    ellipseMode(CENTER);
    
    ellipse(width/2, height/2, song.left.get(1)*1000, song.right.get(1)*1000);
}
   
 
void stop()
{
  //close the AudioPlayer you got from Minim.loadFile()
    song.close();
  
    minim.stop();
 
  //this calls the stop method that 
  //you are overriding by defining your own
  //it must be called so that your application 
  //can do all the cleanup it would normally do
    super.stop();
}
