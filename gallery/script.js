const PAGE_SIZE = 9;
let CURRENT_PAGE = 0;
const DEBUG = true;

const grid = document.getElementById("grid");
let cards = DEBUG ? createTestCards(20) : cardData.cards;

function createTestCards(amount) {
  let ret = [];

  for (let i = 0; i < amount; i++) {
    ret.push({ id: i });
  }

  return ret;
}

function renderCard(id) {
  const img = document.createElement(DEBUG ? "div" : "img");
  if (DEBUG) {
    img.textContent = id;
    img.style = "width: 100px; height: 100px; background-color: indianred;";
  } else {
    img.src = `../assets/cards/${id}.png`;
    img.classList.add("card");
  }

  grid.appendChild(img);
}

function renderCards(cards, pageIndex = 0) {
  let isMultiPage = cards.length > PAGE_SIZE;
  let totalPages = isMultiPage ? Math.trunc(cards.length / PAGE_SIZE) + 1 : 1;

  if (pageIndex < 0 || pageIndex >= totalPages) {
    return;
  }

  console.log(`rendering page with index ${pageIndex}`);
  CURRENT_PAGE = pageIndex;
  appendPageButtons(totalPages);

  // clear the grid for the new search results
  grid.replaceChildren();

  // render the current page of cards
  let startIndex = isMultiPage ? pageIndex * PAGE_SIZE : 0;
  let endIndex = startIndex + PAGE_SIZE;
  if (endIndex > cards.length) {
    endIndex = cards.length;
  }

  for (let i = startIndex; i < endIndex; i++) {
    renderCard(cards[i].id, true);
  }
}

function appendPageButtons(totalPages) {
  const pages = document.getElementById("pages");
  pages.replaceChildren();

  for (let i = 0; i < totalPages; i++) {
    let button = document.createElement("button");
    button.textContent = i + 1;
    button.addEventListener("click", (e) => {
      let targetPageIndex = +e.target.textContent - 1;

      if (targetPageIndex !== CURRENT_PAGE) {
        renderCards(cards, targetPageIndex);
      }
    });

    if (i === CURRENT_PAGE) {
      button.classList.add("currentpage");
    }

    pages.appendChild(button);
  }
}

function searchCards(searchText) {
  if (searchText.length !== 0) {
    // parse search text and set current card results
    // cards = filterCards(cards, searchText);
  }

  renderCards(cards);
}

document
  .getElementById("prevpage")
  .addEventListener("click", () => renderCards(cards, CURRENT_PAGE - 1));
document
  .getElementById("nextpage")
  .addEventListener("click", () => renderCards(cards, CURRENT_PAGE + 1));

searchCards(cards);
