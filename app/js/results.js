'use strict';

const cardContainer = document.querySelector('.cards-container');
const searchInputEl = document.querySelector('.search-bar__input input');
const resultAmount = document.querySelector('.about-result');
const searchBar = document.querySelector('.search-bar');
const loadingGif = document.querySelector('.loading');
const notFoundGif = document.querySelector('.not-found');

let globalData = [];

document.addEventListener('DOMContentLoaded', () => {
  const { inputValue } = getVariable();
  searchInputEl.value = inputValue;
  document.title = inputValue + ' - Google Search';

  displayData(inputValue);
  searchBar.addEventListener('submit', (event) => {
    event.preventDefault();
    displayData(searchInputEl.value);
    document.title = searchInputEl.value + ' - Google Search';
  });

  // getData().then((data) => {
  //   const dataHits = data.hits;
  //   globalData = [...dataHits];
  //   let filteredList = searchData(inputValue);
  //   displayData(filteredList);
  //   searchBar.addEventListener('submit', () => {
  //     filteredList = searchData(searchInputEl.value);
  //     displayData(filteredList);
  //   });
  // });
});

// Render data
async function displayData(searchInput) {
  try {
    loadingGif.classList.add('active');
    notFoundGif.classList.remove('active');

    const startTime = performance.now();

    cardContainer.innerHTML = '';

    const data = await getData(searchInput);
    const endTime = performance.now();
    resultAmount.innerHTML = `About ${data.hits.length} results (${(
      (endTime - startTime) /
      1000
    ).toFixed(2)} seconds)`;

    data.hits.forEach((item) => {
      const {
        id,
        largeImageURL,
        pageURL,
        previewURL,
        tags,
        type,
        user,
        userImageURL,
      } = item;
      const html = `
            <div class="cards-container__card">
                <a href=${pageURL} class="cards-container__card__img">
                  <img
                    src=${largeImageURL}
                    alt=${type}
                  />
                </a>
                <a href=${pageURL} class="cards-container__card__info">
                  <div class="cards-container__card__info__title">
                    <span
                      class="cards-container__card__info__title__user-icon"
                    >
                      <img
                        src=${userImageURL}
                        alt=${user}
                      />
                    </span>
                    <span class="cards-container__card__info__title__user-name"
                      >${user}</span
                    >
                  </div>
                  <p class="cards-container__card__info__desc">${tags}</p>
                </a>
              </div>
          `;
      cardContainer.insertAdjacentHTML('afterbegin', html);
    });

    if (data.hits.length === 0) notFoundGif.classList.add('active');
  } catch (error) {
    console.error(error);
  } finally {
    loadingGif.classList.remove('active');
  }
}
// Get data from API
async function getData(param) {
  // if (param.includes(' ')) param = param.replace(' ', '+');
  try {
    const url = `https://pixabay.com/api/?key=32660245-e1542596698e30211c3f03482&q=${param}&image_type=photo`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

// Search data
// function searchData(param) {
//   return globalData.filter(
//     (item) =>
//       item.tags.toLowerCase().includes(param.toLowerCase()) ||
//       item.user.toLowerCase().includes(param.toLowerCase())
//   );
// }

// Local Storage
function getVariable() {
  return JSON.parse(localStorage.getItem('variables'));
}
