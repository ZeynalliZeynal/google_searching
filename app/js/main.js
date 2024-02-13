'use strict';

const searchForm = document.querySelector('.search-bar');
const searchInput = document.querySelector('input[type="search"]');
const tilesContainer = document.querySelector('.google__tiles__container');
const tileModal = document.querySelector('[data-tile-modal]');
const tileAdd = document.querySelector('[data-tile="add"]');
const tileModalForm = document.querySelector('.google__tiles__modal__form');
const tileModalNameInput = document.querySelector('input[data-input="Name"]');
const tileModalURLInput = document.querySelector('input[data-input="URL"]');
const tileModalSubmitBtn = document.querySelector(
  '[data-tile-modal] button[type="submit"]'
);
const tileModalCancelBtn = document.querySelector(
  '[data-tile-modal] button[type="button"]'
);

let tilesArr = [];
let localData = JSON.parse(localStorage.getItem('tiles'));
if (localData) {
  tilesArr = localData;
  displayData(tilesArr);
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let searchValue = searchInput.value;
  const variables = {
    inputValue: searchValue,
  };
  saveVariable(variables);

  window.location.href = './../../results.html';
});

tileAdd.addEventListener('click', () => {
  tileModal.showModal();
  tileModal.classList.add('modal-active');
});

tileModalCancelBtn.addEventListener('click', () => {
  tileModal.close();
  tileModal.classList.remove('modal-active');
});

tileModalURLInput.addEventListener('input', (event) => {
  if (!event.target.value) {
    tileModalSubmitBtn.disabled = true;
    tileModalSubmitBtn.classList.remove('active-done');
  } else {
    tileModalSubmitBtn.disabled = false;
    tileModalSubmitBtn.classList.add('active-done');
  }
});

tileModalForm.addEventListener('submit', (event) => {
  event.preventDefault();
  tilesArr.push({
    name: tileModalNameInput.value,
    url:
      `${
        tileModalURLInput.value.toLowerCase().includes('https://')
          ? ''
          : 'https://'
      }` + tileModalURLInput.value.toLowerCase(),
    imgURL: tileModalURLInput.value,
  });
  tileModal.close();
  tileModalNameInput.value = '';
  tileModalURLInput.value = '';
  tileModalSubmitBtn.disabled = true;
  tileModalSubmitBtn.classList.remove('active-done');
  displayData(tilesArr);
  setTimeout(() => {
    setTile(tilesArr);
  }, 10);
});

// Local Storage
function saveVariable(param) {
  localStorage.setItem('variables', JSON.stringify(param));
}

function setTile(obj) {
  localStorage.setItem('tiles', JSON.stringify(obj));
}

// display data
function displayData(data) {
  tilesContainer.innerHTML = '';
  data.forEach((item) => {
    const { name, imgURL, url } = item;
    tilesContainer.insertAdjacentHTML(
      'afterbegin',
      `
      <a href=${url} class="google__tiles__tile" target='_blank'>
        <div class="google__tiles__tile__icon">
          <img
            src="https://www.google.com/s2/favicons?domain=${imgURL}&sz=32"
            alt=${name}
          />
        </div>
        <p class="google__tiles__tile__title">${name}</p>
        <div class="google__tiles__tile__dots">
          <span class="google__tiles__tile__dots__icon">
            <i class="bi bi-three-dots-vertical"></i>
          </span>
        </div>
      </a>
    `
    );
  });
}
// document.addEventListener('change')
