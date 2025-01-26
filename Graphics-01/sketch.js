function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
}

function draw() {
  //image 1
  background(0, 0, 0);
  //green background
  stroke('black');
  strokeWeight(2.5);
  fill(90, 80, 90);
  rect(0,0,500,250);
  //shapes
  strokeWeight(1.5);
  fill(0, 0, 100);
  rect(250, 50, 150, 150);
  circle(125, 125, 150);

  //image 2
  //white background
  fill(0, 0, 100);
  rect(500, 0, 500, 500);
  noStroke();
  //red
  fill(0, 100, 100, 0.35);
  circle(750, 200, 150);
  //green
  fill(100, 100, 100, 0.35);
  circle(800, 275, 150);
  //blue
  fill(250, 100, 100, 0.35);
  circle(700, 275, 150);

  //image 3
  //ghost
  fill(0, 82, 80);
  rect(250, 375, 150, 75);
  circle(325, 375, 150);
  //pacman
  fill(55, 70, 90);
  circle(125, 375, 150);
  fill(0);
  beginShape();
  vertex(125, 375);
  vertex(25, 275);
  vertex(25, 475);
  endShape();
  //ghost eyes
  fill('white');
  circle(290, 375, 50);
  circle(360, 375, 50);
  fill(250, 100, 100);
  circle(290, 375, 25);
  circle(360, 375, 25);

  //image 4
  //blue background
  stroke('black');
  strokeWeight(2.5);
  fill(255, 100, 60);
  rect(1000, 0, 500, 500);
  //circle
  stroke('white');
  strokeWeight(5);
  fill(130, 100, 50);
  circle(1250, 250, 275);
  //star
  fill(0, 100, 100);
  beginShape();
  vertex(1250, 300);
  vertex(1165, 360);//bottom left
  vertex(1200, 255);
  vertex(1125, 200);//left
  vertex(1217, 200);
  vertex(1250, 112.5);//top
  vertex(1283, 200);
  vertex(1375, 200);//right
  vertex(1300, 255);
  vertex(1335, 360);//bottom right
  vertex(1250, 300);
  endShape();
}
