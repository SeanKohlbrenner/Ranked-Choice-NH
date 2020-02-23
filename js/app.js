"use-strict";

const FORM_TYPE = 0;
const FORM_POS = 1;
const STATES = 2;
const FORM_DATA = 3;

const TYPE_TEXT = 1;
const TYPE_RADIO = 2;

const statistics = [1, 0, ["slide0-state1.png", "slide0-state2.png", "slide0-state3.png", "slide0-state4.png"], ["Tree", "Bird"]];
let next = 0;
let formPresent = 0;

function nextSlide() {
  // Remove form if it exists
  if (formPresent) {
    const form = document.getElementById("simulation-form");
    const formChildren = form.childNodes;
    console.log(formChildren);
    let i;
    for (i = 0; i < formChildren.length; i++) {
      formChildren[i].remove();
    }

    form.innterHTML = "";
    form.innerHTML = '';
    form.remove();
    formPresent = 0;
  }
  
  // Show next image on slideshow
  document.getElementById("current-slide").src = "assets/slides/" + statistics[STATES][next];

  // Place form on slideshow
  if (statistics[FORM_POS] == next) {
    addForm(statistics[FORM_TYPE] - 1, statistics[FORM_DATA]); // 1st parameter is "-1" so that it aligns with TYPE_TEXT and TYPE_RADIO
    formPresent = 1;
  }

  next++;
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
      document.getElementById("simulation-input").prepend(input);

      let label = document.createElement("label");
      label.setAttribute("for", "radio-button-" + i);
      label.textContent = radioValues[i];
      document.getElementById("simulation-input").prepend(label);
    }
    //document.getElementById("simulation-input").prepend(input); 
  }
  else {  // text
    let input = document.createElement("input");
    input.setAttribute("id", "simulation-form-text");
    input.setAttribute("type", "text");
    document.getElementById("simulation-input").prepend(input); 
  }
}