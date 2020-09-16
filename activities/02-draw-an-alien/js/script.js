/**************************************************
Activity 2 - draw an alien
Jacob Garneau

Drawing an alien using the p5 library

Currently draws an amazing alien
**************************************************/

// setup()
//
// Draws an alien
function setup() {
  createCanvas(640,480);

  //  Set the background to black
  background(0);

  //  DRAW THE BACKGROUND

  noStroke();
  fill(85, 55, 166, 50);
  ellipse(320,480,280,280);
  ellipse(320,480,380,380);
  ellipse(320,480,480,480);
  ellipse(320,480,580,580);
  ellipse(320,480,680,680);
  ellipse(320,480,780,780);
  ellipse(320,480,880,880);
  ellipse(320,480,980,980);
  ellipse(320,480,1080,1080);

  // Planet

  fill(127, 204, 235);
  ellipse(0,0,460,460);
  fill(137, 245, 180);
  ellipse(100,10,100,100);
  ellipse(60,160,100,100);
  ellipse(200,80,40,40);
  ellipse(130,110,40,40);
  ellipse(10,40,40,40);
  ellipse(180,00,40,40);


  //  DRAW THE BACK ARMOR

  fill(199, 92, 80);
  triangle(500,400,500,240,460,400);
  fill(184, 85, 73);
  triangle(140,400,140,240,180,400);

  fill(184, 85, 73);
  triangle(500,400,580,480,600,280);
  fill(153, 68, 58);
  triangle(560,480,580,480,600,280);

  fill(184, 85, 73);
  triangle(140,400,60,480,40,280);
  fill(107, 61, 56);
  triangle(80,480,60,480,40,280);

  fill(153, 68, 58);
  triangle(240,400,140,240,160,400);
  fill(176, 78, 67);
  triangle(400,400,500,240,480,400);

  fill(153, 68, 58);
  triangle(540,400,320,360,320,480);

  fill(107, 61, 56);
  triangle(100,400,320,360,320,480);

  quad(200,360,320,300,440,360,320,480);

  //  DRAW THE BODY
 
  //Neck
  fill(70, 84, 166);
  rectMode(CENTER);
  rect(320,380,140,200);
  rectMode(CORNER);
  fill(122, 45, 176); //  Darker purple
  quad(270,280,370,280,350,480,290,480);
  fill(112, 35, 166); //  Darkest purple
  quad(280,280,360,280,340,480,300,480);

  //  DRAW THE BACK HAIR
  fill(199, 124, 252); //  Medium purple
  triangle(320,80,380,180,400,30);
  fill(218, 166, 255);  //  Light purple
  triangle(320,80,320,180,480,60);
  fill(199, 124, 252); //  Medium purple
  triangle(320,100,320,180,520,90);
  fill(199, 124, 252); //  Medium purple
  triangle(320,80,320,220,520,160);

  fill(218, 166, 255);  //  Light purple
  triangle(320,80,260,180,240,30);
  fill(199, 124, 252); //  Medium purple
  triangle(320,80,320,180,160,60);
  fill(218, 166, 255);  //  Light purple
  triangle(320,100,320,180,120,90);
  fill(218, 166, 255);  //  Light purple
  triangle(320,80,320,220,120,160);
  fill(142, 65, 196); //  Dark purple
  triangle(140,260,236,60,320,100);

  fill(122, 45, 176); //  Darker purple
  triangle(500,260,404,60,320,100);
  triangle(400,180,440,320,440,120);
  triangle(240,180,200,320,200,120);

  //  DRAW THE HEAD

  //  Ears
  fill(86,101,185);
  triangle(400,200,400,320,560,160);
  triangle(240,200,240,320,80,160);

  fill(56, 67, 130);
  triangle(400,220,400,300,520,180);
  triangle(240,220,240,300,120,180);

  //  Head shape
  fill(86,101,185);
  ellipse(320,240,220,240);
  triangle(250,330,390,330,320,400);

  //  Mouth
  stroke(0);
  strokeWeight(4);
  line(300,330,340,330);
  strokeWeight(2);
  line(310,340,330,340);

  //  Nose
  stroke(0);
  strokeWeight(4);
  line(310,200,310,280);
  line(330,200,330,280);

  line(300,290,320,304);
  line(340,290,320,304);

  //  Face markings
  strokeWeight(12);
  line(330,200,330,180);
  line(330,180,350,170);
  line(350,170,350,130);

  line(306,200,306,130);
  line(306,176,284,170);
  line(284,140,284,170);

  line(360,240,380,260);
  line(380,280,380,260);
  line(380,280,400,300);

  line(380,220,400,240);
  line(400,240,400,260);
  line(400,260,420,280);

  line(280,240,260,260);
  line(260,280,260,260);
  line(260,280,240,300);

  line(260,220,240,240);
  line(240,240,240,260);
  line(240,260,220,280);

  //  DRAW THE EYE

  //  Eye shape
  fill(255);
  stroke(0);
  strokeWeight(16);
  quad(240, 200, 400, 200, 340, 220, 300, 250);
  quad(240, 200, 400, 200, 340, 250, 300, 220);

  noStroke();
  quad(240, 200, 400, 200, 340, 220, 300, 250);
  quad(240, 200, 400, 200, 340, 250, 300, 220);

  //  Iris & pupil
  fill(52,157,255);
  ellipse(320,212,32,32);
  fill(0);
  ellipse(320,216,16,16);

  //   Eyebrow
  stroke(0);
  strokeWeight(4);
  line(240,198,400,198);
  stroke(0,0,0,40);
  strokeWeight(16);
  line(240,200,400,200);

  //  DRAW THE FRONT ARMOR
  noStroke();
  fill(184, 85, 73);
  noStroke();
  quad(200,360,200,480,280,480,280,400);
  quad(440,360,440,480,360,480,360,400);

  fill(153, 68, 58);
  quad(100,400,320,460,320,480,40,480);
  fill(176, 78, 67);
  quad(540,400,320,460,320,480,600,480);

  //  DRAW THE FRONT HAIR

  //  Hair shadows
  noStroke();
  fill(142, 65, 196); //  Dark purple
  triangle(320,160,360,100,380,120);
  triangle(400,260,340,132,380,80);
  triangle(350,120,420,220,410,90);
  triangle(400,150,480,320,450,100);

  triangle(320,160,280,100,260,120);
  triangle(240,260,300,132,260,80);
  triangle(290,120,220,220,230,90);
  triangle(240,150,160,320,190,100);

  //  Hair strands
  fill(142, 65, 196); //  Dark purple
  triangle(320,120,320,70,450,140);
  fill(218, 166, 255);  //  Light purple
  triangle(400,120,480,320,450,100);
  fill(199, 124, 252);  //  Medium purple
  triangle(370,110,420,220,410,90);
  fill(218, 166, 255);  //  Light purple
  triangle(320,160,320,120,380,80);
  triangle(400,260,340,108,380,80);


  fill(122, 45, 176); //  Darker purple
  triangle(320,120,320,70,190,140);
  fill(199, 124, 252);  //  Medium purple
  triangle(240,120,160,320,190,100);
  fill(218, 166, 255);  //  Light purple
  triangle(270,110,220,220,230,90);
  fill(199, 124, 252);  //  Medium purple
  triangle(320,160,320,120,260,80);
  triangle(240,260,300,108,260,80);
}

// draw()
//
// Does nothing
function draw() {

}
