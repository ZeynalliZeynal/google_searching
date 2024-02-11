'use strict';

const cardContainer = document.querySelector('.cards-container');
const searchInputEl = document.querySelector('.search-bar__input input');
const searchBar = document.querySelector('.search-bar');
let globalData = [];

document.addEventListener('DOMContentLoaded', () => {
  const { inputValue } = getVariable();
  searchInputEl.value = inputValue;
  document.title = inputValue + ' - Google Search';

  getData().then((data) => {
    const dataHits = data.hits;
    globalData = [...dataHits];
    let filteredList = searchData(inputValue);
    displayData(filteredList);
    searchBar.addEventListener('submit', () => {
      filteredList = searchData(searchInputEl.value);
      displayData(filteredList);
    });
  });
});

// Render data
function displayData(data) {
  cardContainer.innerHTML = '';
  data.forEach((item) => {
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
}

// Get data from API
async function getData() {
  try {
    const url =
      'https://pixabay.com/api/?key=24090419-925e057925ba4cc124682bb5f';
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

// Search data
function searchData(param) {
  return globalData.filter(
    (item) =>
      item.tags.toLowerCase().includes(param.toLowerCase()) ||
      item.user.toLowerCase().includes(param.toLowerCase())
  );
}

// Local Storage
function getVariable() {
  return JSON.parse(localStorage.getItem('variables'));
}
