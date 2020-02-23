"use-strict";

const FORM_TYPE = 0;
const FORM_POS = 1;
const STATES = 2;
const FORM_DATA = 3;

const TYPE_TEXT = 1;
const TYPE_RADIO = 2;

const statistics = [2, 0, ["statistics/state1.png", "statistics/state2.png", "statistics/state3.png"], ["Tree", "Bird"]];
const simulation = [0, 0, ["simulation/state0.png", "simulation/state1.png", "simulation/state2.png", "simulation/state3.png", "simulation/state4.png", "simulation/state5.png"], []]
const slideshow = [statistics, simulation];

let nextState = 0;
let currentSlide = 0;
let formPresent = 0;

function nextSlide() {
  // Remove form if it exists
  if (formPresent) {
    const form = document.getElementById("simulation-form");
    const formChildren = form.childNodes;
    let i;
    for (i = 0; i < formChildren.length; i++) {
      formChildren[i].innerHTML = "";
    }
    form.innterHTML = "";
    form.remove();
    formPresent = 0;
  }
  
  // Show next image on slideshow
  document.getElementById("current-slide").src = "assets/slides/" + slideshow[currentSlide][STATES][nextState];


  // Place form on slideshow
  if (slideshow[currentSlide][FORM_POS] == nextState && slideshow[currentSlide][FORM_TYPE]) {
    addForm(statistics[FORM_TYPE] - 1, statistics[FORM_DATA]); // 1st parameter is "-1" so that it aligns with TYPE_TEXT and TYPE_RADIO
    formPresent = 1;
  }

  nextState++;

  // Slide change
  if (nextState == slideshow[currentSlide][STATES].length) {
    currentSlide++;
    nextState = 0;
    //console.log("HERE");
  }

  console.log("nst: " + nextState + " " + "csl: " + currentSlide);
}

// type: 0 - text input  1 - radio
function addForm(type, radioValues) {
  let formDiv = document.createElement("div");
  formDiv.setAttribute("id", "simulation-form");
  document.getElementById("simulation-input").prepend(formDiv);

  if (type) { // radio buttons
    let i;
    for(i = 0; i < radioValues.length; i++) {
      let input = document.createElement("input");
      input.setAttribute("id", "simulation-form");
      input.setAttribute("type", "radio");
      input.setAttribute("id", "radio-button-" + i);
      document.getElementById("simulation-form").prepend(input);

      let label = document.createElement("label");
      label.setAttribute("for", "radio-button-" + i);
      label.textContent = radioValues[i];
      document.getElementById("simulation-form").prepend(label);
    }
    //document.getElementById("simulation-input").prepend(input); 
  }
  else {  // text
    let input = document.createElement("input");
    input.setAttribute("id", "simulation-form-text");
    input.setAttribute("type", "text");
    document.getElementById("simulation-form").prepend(input); 
  }
}