let hue = 0;
let sat = 0;
let bright = 0;

function setup() {
  createCanvas(1000, 1000);
  colorMode(HSB);
}

function draw() {
  //background(0, 0, 100);
  strokeWeight(1);
  stroke(0);
  //red
  fill(0, 100, 100);
  square(0, 0, 30);
  //orange
  fill(25, 100, 100);
  square(0, 30, 30);
  //yellow
  fill(50, 100, 100);
  square(0, 60, 30);
  //green
  fill(100, 100, 80);
  square(0, 90, 30);
  //cyan
  fill(170, 80, 90);
  square(0, 120, 30);
  //blue
  fill(250, 100, 100);
  square(0, 150, 30);
  //magenta
  fill(280, 100, 100);
  square(0, 180, 30);
  //pink
  fill(320, 50, 100);
  square(0, 210, 30);
  //brown
  fill(0, 100, 30);
  square(0, 240, 30);
  //white
  fill(0, 0, 100);
  square(0, 270, 30);
  //grey
  fill(0, 0, 50);
  square(0, 300, 30);
  //black
  fill(0, 0, 0);
  square(0, 330, 30);
}

function mousePressed() {
  if(mouseX <= 30) {
    if(mouseY <= 30) //red
      hue=0, sat=100, bright=100;
    else if(mouseY <= 60) //orange
      hue=25, sat=100, bright=100;
    else if(mouseY <= 90) //yellow
      hue=50, sat=100, bright=100;
    else if(mouseY <= 120) //green
      hue=100, sat=100, bright=80;
    else if(mouseY <= 150) //cyan
      hue=170, sat=80, bright=90;
    else if(mouseY <= 180) //blue
      hue=250, sat=100, bright=100;
    else if(mouseY <= 210) //magenta
      hue=280, sat=100, bright=100;
    else if(mouseY <= 240) //pink
      hue=320, sat=50, bright=100;
    else if(mouseY <= 270) //brown
      hue=0, sat=100, bright=30;
    else if(mouseY <= 300) //white
      hue=0, sat=0, bright=100;
    else if(mouseY <= 330) //grey
      hue=0, sat=0, bright=50;
    else if(mouseY <= 360) //black
      hue=0, sat=0, bright=0;
  }
}

function mouseDragged() {
  if(mouseX >30) {
    strokeWeight(5);
    stroke(hue, sat, bright);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}