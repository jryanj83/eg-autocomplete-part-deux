import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddressLookupDrawer } from '../address-lookup-drawer';
import type { UserData } from '../types';

// Mock the components
jest.mock('@/components/todo-list/todo-list', () => {
  return {
    TodoList: function MockTodoList({ userId }: { userId: number }) {
      return React.createElement('div', {
        'data-testid': 'todo-list',
        'data-userid': userId
      }, 'Mocked TodoList');
    }
  };
});

jest.mock('@/components/user-avatar/user-avatar', () => {
  return {
    UserAvatar: function MockUserAvatar({ name }: { name: string }) {
      return React.createElement('div', {
        'data-testid': 'user-avatar',
        'data-name': name
      }, 'Mocked Avatar');
    }
  };
});

describe('AddressLookupDrawer', () => {
  const mockUser: UserData = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    address: {
      street: '123 Main St',
      suite: 'Apt 4B',
      city: 'Boston',
      zipcode: '02108',
      geo: {
        lat: '42.3601',
        lng: '-71.0589'
      }
    },
    phone: '1-234-567-8900',
    website: 'johndoe.com',
    company: {
      name: 'Example Corp',
      catchPhrase: 'Making examples since forever',
      bs: 'example synergy'
    }
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render content when selectedUser is null', () => {
    render(<AddressLookupDrawer selectedUser={null} onClose={mockOnClose} />);
    
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('should render user information when selectedUser is provided', () => {
    render(<AddressLookupDrawer selectedUser={mockUser} onClose={mockOnClose} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    
    // Use a more flexible text matching for the address
    const addressElement = screen.getByText(content => {
      const hasStreet = content.includes('123 Main St');
      const hasSuite = content.includes('Apt 4B');
      const hasCityZip = content.includes('Boston') && content.includes('02108');
      return hasStreet && hasSuite && hasCityZip;
    });
    expect(addressElement).toBeInTheDocument();
  });

  it('should render address without suite when not provided', () => {
    const userWithoutSuite: UserData = {
      ...mockUser,
      address: {
        ...mockUser.address,
        suite: ''
      }
    };

    render(<AddressLookupDrawer selectedUser={userWithoutSuite} onClose={mockOnClose} />);
    
    // Use a more flexible text matching for the address
    const addressElement = screen.getByText(content => {
      const hasStreet = content.includes('123 Main St');
      const hasCityZip = content.includes('Boston') && content.includes('02108');
      return hasStreet && hasCityZip;
    });
    expect(addressElement).toBeInTheDocument();
    expect(screen.queryByText('Apt 4B')).not.toBeInTheDocument();
  });

  it('should render TodoList component with correct userId', () => {
    render(<AddressLookupDrawer selectedUser={mockUser} onClose={mockOnClose} />);
    
    const todoListComponent = screen.getByTestId('todo-list');
    expect(todoListComponent).toBeInTheDocument();
    expect(todoListComponent).toHaveAttribute('data-userid', '1');
  });

  it('should call onClose when drawer is closed', () => {
    render(<AddressLookupDrawer selectedUser={mockUser} onClose={mockOnClose} />);
    
    // Simulate the Drawer's onClose event
    const drawer = screen.getByRole('presentation');
    drawer.click(); // This will trigger the backdrop click which calls onClose
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
}); 