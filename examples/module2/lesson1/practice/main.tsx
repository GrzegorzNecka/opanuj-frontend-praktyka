import React from 'react';
import ReactDOM from 'react-dom/client';

import BooksList from './BooksList.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BooksList />
  </React.StrictMode>
);
