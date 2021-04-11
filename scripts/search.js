import { numbers } from './numbers.js';

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
  number.innerHTML = item.value.number;

  parent.appendChild(country);
  parent.appendChild(number);
}

const config = {
  placeHolder: 'Search for your country...',
  data: {
      src: numbers,
      key: ['name'],
  },
  trigger: {
		event: ["input", "focus"]
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
}
const autoCompleteJS = new autoComplete(config);
