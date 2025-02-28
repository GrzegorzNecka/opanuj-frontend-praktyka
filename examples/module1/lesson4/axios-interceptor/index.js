import axios from 'axios';

let durationTime = '';
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const startTime = Date.now();
  config.headers['X-Start-Time'] = startTime;
  return config;
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  const endTime = Date.now();
  const duration = endTime - response.config.headers['X-Start-Time'];
  console.log(`Request to ${response.config.url} took ${duration}ms`);

  // Dodaj duration bezpośrednio do obiektu response zamiast zmiennej globalnej
  response.duration = duration;

  return response;
});

// Przechwytuj cały response, nie tylko data/articles
const response = await axios.get('/api/data/articles?timeout=3000');
const {
  data: { articles },
} = response;

// Teraz masz dostęp do duration z response
document.querySelector('#data').innerHTML = `${response.duration}ms`;
