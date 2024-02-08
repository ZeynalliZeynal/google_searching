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
