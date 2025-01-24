function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
}

function draw() {
  background(300, 100, 70);

  fill(0, 0, 40);
  rect(300, 100, 150, 100);

  fill(0, 80, 100);
  stroke('black');
  strokeWeight(2.5);
  circle(340, 135, 40);

  fill(35, 100, 100);
  circle(410, 143, 48);

  fill(0);
  ellipse(360, 180, 50, 25);

  line(375, 100, 400, 50);
  line(400, 50, 405, 75);
  line(405, 75, 420, 70);

  fill(0, 80, 70, 0.5);
  circle(425, 70, 25);
  // beginShape();
  // vertex(375, 100);
  // vertex(400, 50);
  // vertex(405, 75);
  // endShape();
}
