// @vitest-environment jsdom

import { describe, test, expect } from 'vitest';
import { renderItems } from './renderer';

const users: User[] = [
  { id: 1, name: 'John', age: 30, role: 'user' },
  { id: 2, name: 'Jane', age: 25, role: 'admin' },
  { id: 3, name: 'Jack', age: 40, role: 'user' },
];

describe('User renderer', () => {
  test('should render all users if admin is rendering the list', () => {
    localStorage.setItem('userRole', 'admin');

    const container = document.createElement('div');
    renderItems(container, users);
    expect(Array.from(container.querySelectorAll('li'))).toHaveLength(3);
  });

  test('should render only regular users if non-admin is rendering the list', () => {
    localStorage.setItem('userRole', 'user');

    const container = document.createElement('div');
    renderItems(container, users);

    expect(Array.from(container.querySelectorAll('li'))).toHaveLength(2);
  });

  test('should render user details correctly', () => {
    localStorage.setItem('userRole', 'users');

    const container = document.createElement('div');
    renderItems(container, users);

    const listItems = container.querySelectorAll('li');

    expect(listItems[0].textContent).toContain('Name: John, Age: 30');
    expect(listItems[1].textContent).toContain('Name: Jack, Age: 40');
  });
});
