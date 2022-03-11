const URL = 'https://swapi.dev/api/';
const cssPromises = {};
const appContainer = document.getElementById('app');

function loadResourse(src) {
  // JavaScript module
  if (src.endsWith('.js')) {
    return import(src);
  }
  // CSS файл
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise((resolve) => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }
  // данные с сервера
  return fetch(src).then((res) => res.json());
}

function renderPage(modulName, apiUrl, css) {
  Promise.all([modulName, apiUrl, css].map((src) => loadResourse(src)))
    .then(([pageModule, data]) => {
      appContainer.innerHTML = '';
      appContainer.append(pageModule.render(data));
    });
}

export default function runRendering() {
  // eslint-disable-next-line no-restricted-globals
  const searchParams = new URLSearchParams(location.search);
  const filmId = searchParams.get('filmId');
  if (filmId) {
    renderPage(
      './films-details.js',
      `${URL}films/${filmId}`,
      'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
    );
  } else {
    renderPage(
      './films-list.js',
      `${URL}films`,
      'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
    );
  }
}

runRendering();

window.addEventListener('popstate', () => runRendering());
