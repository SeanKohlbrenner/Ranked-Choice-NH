"use-strict";

const statistics = ["state1", "state2", "state3"];
let nextSlide = 0;

function nextSlide() {
  document.getElementById("current-slide").src = statistics[nextSlide];
  nextSlide++;
}