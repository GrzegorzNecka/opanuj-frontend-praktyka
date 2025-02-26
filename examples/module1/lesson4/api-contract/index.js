import axios from 'axios';

const contentEl = document.querySelector('#content');
const button = document.querySelector('#button');
const API_URL = 'http://localhost:3000/api/data/users';
button.addEventListener('click', async () => {
  button.innerHTML = 'Pobieram...';
  try {
    const {
      data: { users },
    } = await axios.get(API_URL);
    renderUsers(users, contentEl);
    button.innerHTML = 'Wyszukaj';
  } catch (error) {
    alert('Błąd pobierania danych!');
    button.innerHTML = 'Spróbuj ponownie';
  }
});

function renderUsers(users, container) {
  container.innerHTML = '';

  users.forEach((user) => {
    container.innerHTML += `<p>${user.name}</p>`;
  });
}
