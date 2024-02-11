'use strict';

const cardContainer = document.querySelector('.cards-container');

class Data {
  async getData() {
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
}

class UI {
  displayData(data) {
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
}

class Storage {
  static getVariable() {
    return JSON.parse(localStorage.getItem('variables'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = Storage.getVariable().inputValue;
  document.title = searchInput + ' - Google Search';

  const data = new Data();
  const ui = new UI();
  data.getData().then((data) => {
    const dataHits = data.hits;
    console.log(data.hits);
    ui.displayData(dataHits);
  });
});
