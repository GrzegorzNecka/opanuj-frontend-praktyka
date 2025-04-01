// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { test, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BooksList from './BooksList';

afterEach(cleanup);

test('default controls are displayed', async () => {
  render(<BooksList />);

  expect(
    screen.getByLabelText('Add new book', { selector: 'input' })
  ).toBeInTheDocument();

  expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  expect(screen.getByLabelText('books')).toBeInTheDocument();
  expect(screen.getAllByLabelText('book-item')).toHaveLength(10);
});

test('add new book', async () => {
  render(<BooksList />);

  const input = screen.getByLabelText('Add new book', { selector: 'input' });
  await userEvent.type(input, 'Pan Tadeusz');

  const button = screen.getByRole('button', { name: 'Add' });
  await userEvent.click(button);

  expect(input).toHaveValue('');
  expect(screen.getByLabelText('books')).toBeInTheDocument();
  expect(screen.getAllByLabelText('book-item')).toHaveLength(11);
  expect(
    screen.getByText('Pan Tadeusz by Author 11 (2024)')
  ).toBeInTheDocument();
});

test('remove book', async () => {
  render(<BooksList />);

  const removeButton = screen
    .getByText('1984 by George Orwell (1949)')
    .parentElement?.querySelector('button');
  await userEvent.click(removeButton!);

  expect(
    screen.queryByText('1984 by George Orwell (1949)')
  ).not.toBeInTheDocument();
  expect(screen.getAllByLabelText('book-item')).toHaveLength(9);
});
