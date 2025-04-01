import { useState } from 'react';
import { initialBooks } from './data';

export default function BooksList() {
  const [books, setBooks] = useState(initialBooks);
  const [text, setText] = useState('');

  return (
    <>
      <label className="text-white" htmlFor="add-book">
        Add new book
      </label>
      <input
        id="add-book"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={() => {
          setText('');
          setBooks([
            {
              id: books.length,
              title: text,
              author: 'Author ' + (books.length + 1),
              year: 2024,
            },
            ...books,
          ]);
        }}
      >
        Add
      </button>
      <ul aria-label="books" className="mt-4 max-w-md flex flex-col gap-2">
        {books.map((item) => (
          <li
            aria-label="book-item"
            className="flex items-center justify-between"
            key={item.id}
          >
            {item.title} by {item.author} ({item.year})
            <button
              className="ml-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              onClick={() => {
                setBooks(books.filter((book) => book.id !== item.id));
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
