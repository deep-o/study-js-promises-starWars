async function runLoad() {
  const load = await import('./main.js');
  load.default();
}

function loadResourse(src) {
  return fetch(src).then((res) => res.json());
}

function createDesr(data) {
  const section = document.createElement('section');
  const title = document.createElement('h1');
  const link = document.createElement('a');
  const text = document.createElement('p');
  const numeric = ['', 'I', 'II', 'III', 'IV', 'V', 'VI'];

  title.classList.add('mb-3');
  link.classList.add('btn', 'btn-primary', 'mb-3');
  text.classList.add('lead');

  link.href = 'index.html';

  title.textContent = `Episode ${numeric[data.episode_id]} ${data.title}`;
  link.textContent = 'Back to episode';
  text.textContent = data.opening_crawl;

  section.append(title);
  section.append(link);
  section.append(text);

  link.addEventListener('click', (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    history.pushState(null, '', link.href);
    runLoad();
  });

  return section;
}

function createList(data, text) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const list = document.createElement('ul');

  title.textContent = text;
  list.classList.add('list-group');

  data.forEach((item) => {
    const listItem = document.createElement('li');
    const textItem = document.createElement('p');

    listItem.classList.add('list-group-item', 'border-0');
    textItem.classList.add('lead', 'mb-0');
    textItem.textContent = item;

    listItem.append(textItem);
    list.append(listItem);
  });

  section.append(title);
  section.append(list);
  return section;
}

function getFromServer(list, title) {
  return Promise.all(list.map((src) => loadResourse(src)))
    .then((items) => {
      const arr = items.map((item) => item.name);
      const section = createList(arr, title);
      return section;
    });
}

// eslint-disable-next-line import/prefer-default-export
export function render(data) {
  const container = document.createElement('div');
  container.classList.add('container', 'py-4');

  const descr = createDesr(data);
  const planets = getFromServer(data.planets, 'Planets');
  const species = getFromServer(data.species, 'Species');
  const starships = getFromServer(data.starships, 'Starships');

  Promise.all([planets, species, starships])
    .then(([arr1, arr2, arr3]) => {
      container.append(descr);
      container.append(arr1);
      container.append(arr2);
      container.append(arr3);
    });

  return container;
}
