**Owen Naquin**

**CSC 2463 Final Project Documentation**

**Demonstration Video:** https://youtu.be/kGEl7SfxdZw

**Summary:**

The project is a simple arcade game titled simply “Apple Catcher” where you move a basket left and right to collect apples as they fall from the tree, with your primary objective being to reach a high score. Miss 3 apples and it’s game over.

**The Game:**

 ![image](https://github.com/user-attachments/assets/196a9841-7632-421c-8866-a43fb6e5fc02)

-Apples spawn from the top of the screen, with a new one spawning in a random x coordinate within the canvas.

-Apples that touch the basket are collected, increasing score. Apples that hit the bottom of the screen are missed and take 1 health point.

-Buttons for setting up audio, an Arduino, and the Arduino’s joystick

**Implementation Breakdown:**

**Graphics**

-text on start and end screens

-setup buttons

-loading images taken from web during game screen

**Sound**

-1 sequence that plays a short tune throughout all 3 game screens

-1 event that plays when an apple is collected for an auditory cue

-when health reaches 1, the sequence ramps up in tempo for intensity, then ramps back down on the game over screen

**Hardware**

-joystick for left-right input

-LCD screen displays live score update

-3 red LEDs to represent health, start turning off as you lose health


**Further Implementation/Strech Goals:**

A few aspects had to be cut for implementation to make more time for the hardware application. The main thing is increasing difficulty. Right now, the game never gets harder and can easily be played until you get bored. I would like for, after a certain score threshold is reached, the apples start falling faster, start falling more frequently, or both. Going further, there could also be obstacles that fall from the tree that damage you if collected for added challenge. One thing that got changed during development was the score display. Originally, I wanted to use the 7-segment display for the score, but it took up almost all of the Arduino CPU pins, which I needed for the other connections. Luckily, the LCD screen uses just the perfect amount of pins to allow me to also have the joystick and 3 LED’s.
