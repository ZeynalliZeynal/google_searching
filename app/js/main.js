'use strict';

const searchForm = document.querySelector('.google__search-bar');
const searchInput = document.querySelector('input[type="search"]');

class Storage {
  static saveVariable(param) {
    localStorage.setItem('variables', JSON.stringify(param));
  }
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let searchValue = searchInput.value;
  const variables = {
    inputValue: searchValue,
  };
  Storage.saveVariable(variables);

  window.location.href = './../../results.html';
});
