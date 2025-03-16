import React from 'react';
import '@testing-library/jest-dom';
import { ComponentType } from 'react';

// Fast mock implementation for fetch
global.fetch = jest.fn().mockImplementation(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([])
  }) as unknown as Promise<Response>
);

// Faster mock implementation for todos action
jest.mock('@/actions/todos', () => ({
  fetchUserTodos: jest.fn().mockReturnValue(Promise.resolve([
    { id: 1, userId: 1, title: 'Test todo', completed: false }
  ]))
}));

// Mock next/dynamic to avoid dynamic import overhead
jest.mock('next/dynamic', () => {
  return function mockDynamic(dynamicImport: () => Promise<ComponentType<unknown>>) {
    return dynamicImport();
  };
});

// Lightweight mock for MUI components
jest.mock('@mui/material', () => {
  const actual = jest.requireActual('@mui/material');
  return {
    ...actual,
    Drawer: jest.fn(({ children, open, onClose }) => {
      if (!open) return null;
      return React.createElement('div', { role: 'presentation', onClick: onClose }, children);
    })
  };
}); 