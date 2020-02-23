"use-strict";

const FORM_TYPE = 0;
const FORM_POS = 1;
const STATES = 2;
const FORM_DATA = 3;

const TYPE_TEXT = 1;
const TYPE_RADIO = 2;

const statistics = [0, 0, ["statistics/state1.png", "statistics/state2.png", "statistics/state3.png"], []];
const simulation = [0, 0, ["simulation/state0.png", "simulation/state1.png", "simulation/state2.png", "simulation/state3.png", "simulation/state4.png", "simulation/state5.png"], []]
const slideshow = [statistics, simulation];

let nextState = 0;
let currentSlide = 0;
let formPresent = 1;

const candInput = document.getElementById("candidates");
const voteInput = document.getElementById("voters");

candInput.addEventListener('change', handle1Update);
candInput.addEventListener('mousemove', handle1Update);
voteInput.addEventListener('change', handle2Update);
voteInput.addEventListener('mousemove', handle2Update);

let sandboxImage = 1;

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
  try {
    document.getElementById("current-slide").src = "assets/slides/" + slideshow[currentSlide][STATES][nextState];
  }
  catch(err) {
    //let button = document.getElementById("simulation-button");
    //button.setAttribute("onclick", "window.location.href = '#contact'");
    document.getElementById("sandbox-select").scrollIntoView();
    return;
  }


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
  }
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

function handle1Update() {
  document.getElementById("candidates-label").textContent = "# Candidates: " + this.value;
}

function handle2Update() {
  document.getElementById("voters-label").textContent = "# Voters: " + this.value;
}

function resetSandboxImage(image) {
  if (sandboxImage == 1) {
    image.src = "assets/slides/sandbox/sandbox2.png"
    sandboxImage = 2;
  }
  else {
    image.src = "assets/slides/sandbox/sandbox1.png"
    sandboxImage = 1;
  }
}


function sendEmail() {
  const emailButton = document.getElementById("email-button");
  emailButton.textContent = "Message Sent!";
  setTimeout(function(){ emailButton.textContent = "Send Email"; }, 3000);
}

function sendTweet() {
  const message = document.getElementById("contact-message").value;
  let url = "";
  if (message) {
    let tokens = message.split(" ");
    url = tokens[0];
    let i;
    for (i = 1; i < tokens.length; i++) {
      url += "%20" + tokens[i];
    }
  }
  console.log(url);
  window.open("https://twitter.com/intent/tweet?text=" + url, "_blank");
}

