'use strict';

const searchForm = document.querySelector('.search-bar');
const searchInput = document.querySelector('input[type="search"]');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let searchValue = searchInput.value;
  const variables = {
    inputValue: searchValue,
  };
  saveVariable(variables);

  window.location.href = './../../results.html';
});

// Local Storage
function saveVariable(param) {
  localStorage.setItem('variables', JSON.stringify(param));
}
