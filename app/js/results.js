'use strict';

class Storage {
  static getVariable() {
    return JSON.parse(localStorage.getItem('variables'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = Storage.getVariable().inputValue;
  document.title = searchInput + ' - Google Search';
});

const url = 'https://pixabay.com/api/?key=24090419-925e057925ba4cc124682bb5f';
async function getData() {
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

getData();
