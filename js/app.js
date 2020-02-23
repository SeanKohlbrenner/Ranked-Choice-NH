"use-strict";

const STATE_TYPE = 0;
const FORM_POS = 1;
const STATES = 2;
const FORM_DATA = 3;

const statistics = [1, 1, ["slide0-state1.png", "slide0-state2.png", "slide0-state3.png", "slide0-state4.png"]];
let next = 0;

function nextSlide() {
  console.log(statistics[STATES][next]);
  document.getElementById("current-slide").src = "assets/slides/" + statistics[STATES][next];
  next++;
}