const exampleGalleries = {};

// find the examples, marked as sections with the .example class
const exampleSections = [...document.querySelectorAll(".example")];

// for each example section, keep a list of the figures in it, and a current index
exampleSections.forEach((section, sectionId) => {
  // steps are always 'figure' elements
  let exampleSteps = [...section.querySelectorAll("figure")];
  exampleGalleries[sectionId] = { steps: exampleSteps, current: 0 };
  showGalleryStep(sectionId, 0);
  appendGalleryButtons(sectionId);
});

// go through all the steps of a given gallery and hide all but the desired
function showGalleryStep(exampleId, stepId) {
  let gallery = exampleGalleries[exampleId];
  if (stepId > gallery.steps.length - 1 || stepId < 0) {
    return;
  }

  for (let i = 0; i < gallery.steps.length; i++) {
    gallery.steps[i].hidden = i !== stepId;
  }

  gallery.current = stepId;
}

function nextGalleryStep(exampleId) {
  showGalleryStep(exampleId, exampleGalleries[exampleId].current + 1);
}

function prevGalleryStep(exampleId) {
  showGalleryStep(exampleId, exampleGalleries[exampleId].current - 1);
}

// append a previous and next button to each step individually
function appendGalleryButtons(exampleId) {
  const figures = exampleGalleries[exampleId].steps;
  for (let figure of figures) {
    const figcaption = figure.querySelector("figcaption");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttoncontainer");

    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.addEventListener("click", () => prevGalleryStep(exampleId));

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.addEventListener("click", () => nextGalleryStep(exampleId));

    buttonContainer.appendChild(prevButton);
    buttonContainer.appendChild(nextButton);
    figure.insertBefore(buttonContainer, figcaption);
  }
}
