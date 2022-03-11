async function runLoad() {
  const load = await import('./main.js');
  load.default();
}

// eslint-disable-next-line import/prefer-default-export
export function render(data) {
  const container = document.createElement('div');
  const title = document.createElement('h1');
  const list = document.createElement('ul');

  container.classList.add(
    'container',
    'py-4',
  );

  title.classList.add('mb-3');

  title.textContent = 'Список эпизодов';
  list.classList.add('list-group');

  data.results.forEach((el, i) => {
    const item = document.createElement('li');
    const link = document.createElement('a');

    item.append(link);
    list.append(item);

    item.classList.add('list-group-item', 'border-0');

    const numeric = ['', 'I', 'II', 'III', 'IV', 'V', 'VI'];
    const href = `?filmId=${i + 1}`;

    link.textContent = `Эпизод ${numeric[el.episode_id]} ${el.title}`;
    link.href = href;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      // eslint-disable-next-line no-restricted-globals
      history.pushState(null, '', link.href);
      runLoad();
    });
  });

  container.append(title);
  container.append(list);

  return container;
}
