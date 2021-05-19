import { numbers } from './numbers.js';

const inputField = document.querySelector('#autoComplete');
const actionLink = document.querySelector('.action');
const exitLink = document.querySelector('.exit');

// AUTOCOMPLETE INIT

const noResultsMessage = (list, query) => {
  const message = document.createElement('li');
  message.setAttribute('class', 'no-result');
  message.setAttribute('tabindex', '1');
  message.innerHTML = `Sorry we found no results for "${query}"`;
  list.appendChild(message);
};

const createItem = (item, parent) => {
  parent.innerHTML = '';

  const country = document.createElement('span');
  country.innerHTML = item.match;
  
  const number = document.createElement('span');
  number.setAttribute('class', 'autoComplete_result__number');
  number.innerHTML = item.value.number;

  parent.appendChild(country);
  parent.appendChild(number);
}

const config = {
  placeHolder: 'Search for country...',
  data: {
      src: numbers,
      key: ['name'],
  },
  trigger: {
		event: ["input", "focus"],
	},
  resultsList: {
    noResults: noResultsMessage,
    maxResults: 50,
  },
  resultItem: {
    highlight: {
      render: true,
    },
    content: createItem,
  },
  onSelection: (feedback) => {
    const selectedValue = feedback.selection.value;

    inputField.value = selectedValue.name;
    actionLink.innerHTML = `CALL<br />${selectedValue.name}: ${selectedValue.action}`;
    actionLink.setAttribute('href', `tel:${selectedValue.action}`);
    actionLink.setAttribute('class', 'action');
  },
}
const autoCompleteJS = new autoComplete(config);


// AUTOCOMPLETE SLIDE TO TOP

const onOpenResults = (ev) => {
  document.querySelector('.search').scrollIntoView();
}

inputField.addEventListener('open', onOpenResults);


// REMOVE PAGE FROM BROWSER HISTORY
exitLink.addEventListener('click', () => {
  window.location.replace('http://google.com');
});