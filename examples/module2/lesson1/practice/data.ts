interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

export const initialBooks: Book[] = [
  {
    id: 0,
    title: '1984',
    author: 'George Orwell',
    year: 1949,
  },
  {
    id: 1,
    title: 'Władca Pierścieni',
    author: 'J.R.R. Tolkien',
    year: 1954,
  },
  {
    id: 2,
    title: 'Mistrz i Małgorzata',
    author: 'Michaił Bułhakow',
    year: 1967,
  },
  {
    id: 3,
    title: 'Sto lat samotności',
    author: 'Gabriel García Márquez',
    year: 1967,
  },
  {
    id: 4,
    title: 'Mały Książę',
    author: 'Antoine de Saint-Exupéry',
    year: 1943,
  },
  {
    id: 5,
    title: 'Duma i uprzedzenie',
    author: 'Jane Austen',
    year: 1813,
  },
  {
    id: 6,
    title: 'Zbrodnia i kara',
    author: 'Fiodor Dostojewski',
    year: 1866,
  },
  {
    id: 7,
    title: 'Proces',
    author: 'Franz Kafka',
    year: 1925,
  },
  {
    id: 8,
    title: 'Solaris',
    author: 'Stanisław Lem',
    year: 1961,
  },
  {
    id: 9,
    title: 'Wiedźmin: Ostatnie życzenie',
    author: 'Andrzej Sapkowski',
    year: 1993,
  },
];
