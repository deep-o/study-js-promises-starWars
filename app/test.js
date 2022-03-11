export function hi() {
  console.log(`Привет`);
}

export function bye() {
  alert(`Пока`);
}

export default function() {
  alert("Модуль загружен (экспорт по умолчанию)!");
}
