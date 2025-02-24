let button1, button2, button3, button4, button5;
let samples;
let delTimeSlider, feedbackSlider, crushSlider;

let crush = new Tone.BitCrusher(10).toDestination();
let delay = new Tone.FeedbackDelay(0, 0).connect(crush);
delay.wet.value = 0.5;

function preload() {
  samples = new Tone.Players({
    cat: "media/cat.mp3",
    boom: "media/boom.mp3",
    pipe: "media/pipe.mp3",
    womp: "media/womp.mp3",
    what: "media/what.mp3"
  }).connect(delay);
}

function setup() {
  createCanvas(400, 400);
  button1 = createButton("Meow");
  button1.position(40, 100);
  button2 = createButton("Boom");
  button2.position(100, 100);
  button3 = createButton("Womp");
  button3.position(160, 100);
  button4 = createButton("Pipe");
  button4.position(220, 100);
  button5 = createButton("What");
  button5.position(270, 100);

  button1.mousePressed(() => {samples.player("cat").start()});
  button2.mousePressed(() => {samples.player("boom").start()});
  button3.mousePressed(() => {samples.player("womp").start()});
  button4.mousePressed(() => {samples.player("pipe").start()});
  button5.mousePressed(() => {samples.player("what").start()});

  delTimeSlider = createSlider(0, 1, 0, 0.01);
  delTimeSlider.position(150, 150);
  delTimeSlider.input(() => {delay.delayTime.value = delTimeSlider.value()});

  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(150, 180);
  feedbackSlider.input(() => {delay.feedback.value = feedbackSlider.value()});

  crushSlider = createSlider(1, 16, 16, 0.01);
  crushSlider.position(150, 210);
  crushSlider.input(() => {crush.bits.value = crushSlider.value()});
}

function draw() {
  background(220);

  text("Delay Time: "+delTimeSlider.value(), 50, 163);
  text("Feedback %: "+feedbackSlider.value(), 50, 195);
  text("Bit Crush %: "+(16-crushSlider.value()), 50, 227);
}