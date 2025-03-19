//setting up game state stuff
let GameStates = Object.freeze({
  START: "start",
  PLAY: "play",
  END: "end"
});
let gameState = GameStates.START;
let score = 0;
let time = 30;
let textPadding = 15;
let maxscore = 16;
let gameFont;

//spiders
let bug;
let e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12, e13, e14, e15, e16;

//setup for audio content
let button, synth1, part1, synth2, seq1, basicSynth, part2, part3;

function preload() {
  bug = loadImage("media/bug.png");
  gameFont = loadFont("fonts/PressStart2P-Regular.ttf");
}

function setup() {
  createCanvas(500, 500);
  textFont(gameFont);
  imageMode(CENTER);
  angleMode(DEGREES);
  button = createElement("button", "Start Audio");
  button.position(0, 478);
  button.mousePressed(() => {
    if (Tone.context.state !== "running") {
      Tone.start().then(() => {
        console.log("Context has started");
        Tone.Transport.start()
      })
    } else {
      Tone.Transport.start();
    }
  });
  Tone.Transport.timeSignature = [4, 4];
  Tone.Transport.bpm = 150;
  synth1 = new Tone.PolySynth(Tone.Synth).toDestination();
  part1 = new Tone.Part(((time, value) => {
    synth1.triggerAttackRelease(value.note, value.dur, time);
  }),
  [//start screen music
    {time: 0, note: "C3", dur: "4n"},//measure 1
    {time: "0:1", note: "D3", dur: "4n"},
    {time: "0:2", note: "C3", dur: "4n"},
    {time: "0:3", note: "D3", dur: "4n"},
    {time: "1:0", note: "F3", dur: "4n"},//measure 2
    {time: "1:1", note: "D3", dur: "4n"},
    {time: "1:2", note: "F3", dur: "4n"},
    {time: "1:3", note: null, dur: "4n"},
    {time: "2:0", note: "D3", dur: "4n"},//measure 3
    {time: "2:1", note: "E3", dur: "4n"},
    {time: "2:2", note: "D3", dur: "4n"},
    {time: "2:3", note: "E3", dur: "4n"},
    {time: "3:0", note: "E3", dur: "4n"},//measure 4
    {time: "3:1", note: "D3", dur: "4n"},
    {time: "3:2", note: "C3", dur: "4n"},
    {time: "3:3", note: null, dur: "4n"},
  ]
).start();
part1.loop = true;
part1.loopEnd = "4m";

//main game music
Tone.Transport.bpm = 150;
synth2 = new Tone.Synth().toDestination();
seq1 = new Tone.Sequence((time, note) => {
  synth2.triggerAttackRelease(note, "2n", time);
}, ["C3", "C3", "E3", "C3", "G3", "C3", "F3", "C3", "F2", "F2", "A2", "B2", "G2", "G2", "B2", "C3"], "4n").start();

//bug squish sfx
basicSynth = new Tone.Synth({
  envelope: { //see ADSR model for explanation
    attack: 0.5, //higher = smoother start
    decay: 0.5,
    sustain: 0.5,
    release: 0.3
  },
  oscillator: {
    type: 'sawtooth'
  }
}).toDestination();

part2 = new Tone.Part(((time, value) => {
  synth1.triggerAttackRelease(value.note, value.dur, time);
}),
[//game over music
  {time: 0, note: "C4", dur: "4n"},//measure 1
  {time: "0:1", note: "A3", dur: "4n"},
  {time: "0:2", note: "F3", dur: "4n"},
  {time: "0:3", note: "D3", dur: "4n"},
  {time: "1:0", note: "C3", dur: "4n"}//measure 2
]
).start();
part2.loop = true;
part2.loopEnd = "4m";

part3 = new Tone.Part(((time, value) => {
  synth1.triggerAttackRelease(value.note, value.dur, time);
}),
[//perfect score music
  {time: 0, note: "C4", dur: "4n"},//measure 1
  {time: "0:1", note: "D4", dur: "4n"},
  {time: "0:2", note: "G4", dur: "4n"},
  {time: "0:3", note: "B4", dur: "4n"},
  {time: "1:0", note: "A4", dur: "4n"},//measure 2
  {time: "1:1", note: "B4", dur: "4n"},
  {time: "1:2", note: "A4", dur: "4n"},
  {time: "1:3", note: "B4", dur: "4n"}
]
).start();
part3.loop = true;
part3.loopEnd = "4m";

  //29 sec
  e1 = new Enemy(-50, 350, 2.5, 270);
  //25 sec
  e2 = new Enemy(300, -50, 3, 0);
  e3 = new Enemy(550, 250, 2, 90);
  //22 sec
  e4 = new Enemy(-50, 150, 4, 270);
  e5 = new Enemy(550, 350, 5, 90);
  //19
  e6 = new Enemy(150, 550, 4.5, 180);
  e7 = new Enemy(350, -50, 5, 0);
  //16
  e8 = new Enemy(300, 550, 3, 180);
  e9 = new Enemy(-50, 100, 4, 270);
  e10 = new Enemy(550, 450, 1, 90);
  //12 sec
  e11 = new Enemy(200, -50, 4, 0);
  e12 = new Enemy(550, 350, 4, 90);
  e13 = new Enemy(325, -50, 3, 0);
  //5 sec
  e14 = new Enemy(550, 350, 5, 90);
  e15 = new Enemy(75, 550, 4.5, 180);
  e16 = new Enemy(400, 550, 5, 180);
}

function draw() {
  background(220);

  switch(gameState) {
    case GameStates.START:
      seq1.stop();
      part2.stop();
      part3.stop();
      part1.start(Tone.now());
      textAlign(CENTER, CENTER);
      textSize(25);
      fill(250, 0, 0);
      text("BUG CRUSHER", width/2, height/2-80);
      fill(0);
      textSize(18);
      text("Press ENTER to Start", width/2, height/2+20);
      textSize(10);
      text("(after starting the audio of course)", width/2, height/2+40);
      break;
    case GameStates.PLAY:
      part1.stop();
      seq1.start(Tone.now());
      textSize(18);
      textAlign(LEFT, TOP);
      text("Score: "+score, textPadding, textPadding);
      textAlign(RIGHT, TOP);
      text("TIME: "+Math.ceil(time), width-textPadding, textPadding);
      time -= deltaTime/1000;
      if (time <=0)
        gameState = GameStates.END;
      if(time<=29)
        e1.draw();
      if(time<=25) {
        e2.draw();
        e3.draw();
      }
      if(time<=22) {
        e4.draw();
        e5.draw();
      }
      if(time<=19) {
        e6.draw();
        e7.draw();
      }
      if(time<=16) {
        e8.draw();
        e9.draw();
        e10.draw();
      }
      if(time<=10) {
        Tone.Transport.bpm.rampTo(230, 1);
      }
      if(time<=12) {
        e11.draw();
        e12.draw();
        e13.draw();
      }
      if(time<=5) {
        e14.draw();
        e15.draw();
        e16.draw();
      }
      break;
    case GameStates.END:
      seq1.stop();  
      fill(0);
      textSize(20);
      textAlign(CENTER, CENTER);
      text("GAME OVER!", width/2, height/2-80);
      textSize(13);
      text("Score: "+score, width/2, height/2-50);
      text("Max Score: "+maxscore, width/2, height/2-30);
      if(score === maxscore) {
        fill(230, 200, 0);
        text("~PERFECT SCORE!~", width/2, height/2-10);
        part3.start(Tone.now());
      }
      else{
        part2.start(Tone.now());
      }
      fill(0);
      textSize(15);
      text("Refresh page to retry!", width/2, height/2+80);
      break;
  }
}

function keyPressed() {
  switch(gameState) {
    case GameStates.START:
      if(keyCode === ENTER) {
        gameState = GameStates.PLAY;
      }
      break;
    case GameStates.PLAY:
      break;
    case GameStates.END:
      if(keyCode === ENTER) {
        //gameState = GameStates.START;
      }
      break;
  }
}

function mousePressed() {
  e1.mousePressed();
  e2.mousePressed();
  e3.mousePressed();
  e4.mousePressed();
  e5.mousePressed();
  e6.mousePressed();
  e7.mousePressed();
  e8.mousePressed();
  e9.mousePressed();
  e10.mousePressed();
  e11.mousePressed();
  e12.mousePressed();
  e13.mousePressed();
  e14.mousePressed();
  e15.mousePressed();
  e16.mousePressed();
}

class Enemy {
  constructor(x, y, spd, dir) {
    this.x = x;
    this.y = y;
    //this.currentAnimation = null;
    this.animations = {};
    this.speed = spd;
    this.direction = dir;

    this.addAnimation("moving", new SpriteAnimation(bug, 0, 0, 4));
    this.addAnimation("dead", new SpriteAnimation(bug, 0, 1, 1));
    this.currentAnimation = "moving";
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.direction) {
        case 0: //down
          this.y += this.speed;
          break;
        case 180: //up
          this.y -= this.speed;
          break;
        case 90: //left
          this.x -= this.speed;
          break;
        case 270: //right
          this.x += this.speed;
          break;
        default:
          break;
      }
      push();
      translate(this.x, this.y);
      rotate(this.direction);
      animation.draw();
      pop();
    }
  }

  mousePressed() {
    if(this.currentAnimation === "moving" && mouseX >= this.x-40 && mouseX <= this.x+40 && mouseY >= this.y-30 && mouseY <= this.y+30) {
      console.log("bug squished!");
      this.currentAnimation = "dead";
      basicSynth.triggerAttackRelease("A4", 0.1);
      this.direction = null;
      score ++;
    }
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = false;
  }

  draw() {

    let s = (this.flipped) ? -1 : 1;
    scale(s,1);
    image(this.spritesheet, 0, 0, 80, 80, this.u*80, this.v*80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 10 === 0)
      this.u++;

    if (this.u === this.startU + this.duration)
      this.u = this.startU;
  }
}
