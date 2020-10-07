/**************************************************
Functions experiments
Jacob Garneau

Experiments with functions
**************************************************/

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500,500);

  let hotCelsius = toCelsius(100);
  let coldCelsius = toCelsius(10);

  console.log(`100 degrees Fahrenheit is ${hotCelsius} degrees Celsius.`);
  console.log(`10 degrees Fahrenheit is ${coldCelsius} degrees Celsius.`);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  let x = random(0,width);
  let y = random(0,height);

  ellipse(x,y,100);
}

function toCelsius(fahrenheit) {
  let celsius = (fahrenheit - 32) * 5/9;
  return celsius;
}
