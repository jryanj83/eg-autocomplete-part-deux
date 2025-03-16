import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddressLookupSection from '../address-lookup-section';
import type { UserData } from '../types';

// Mock the MUI components
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mui-container">{children}</div>
  ),
  Box: ({ children, component }: { children: React.ReactNode; component?: string }) => (
    <div data-testid="mui-box" data-component={component}>{children}</div>
  ),
  Autocomplete: ({ renderInput }: { 
    renderInput: (params: { inputProps: Record<string, unknown> }) => React.ReactNode 
  }) => (
    <div data-testid="mui-autocomplete">
      {renderInput({
        inputProps: { 'data-testid': 'autocomplete-input' }
      })}
    </div>
  ),
  TextField: (props: { 
    inputProps: Record<string, unknown>;
    label?: string;
  }) => (
    <input
      data-testid="mui-textfield"
      {...props.inputProps}
      placeholder={props.label}
    />
  ),
}));

// Mock the MUI X Data Grid
jest.mock('@mui/x-data-grid', () => ({
  DataGrid: ({ rows, onRowClick }: { 
    rows: Array<{ id: number; name: string }>;
    onRowClick: (params: { id: number }) => void;
  }) => (
    <div data-testid="mui-datagrid">
      {rows.map((row) => (
        <div
          key={row.id}
          data-testid={`grid-row-${row.id}`}
          onClick={() => onRowClick({ id: row.id })}
        >
          {row.name}
        </div>
      ))}
    </div>
  ),
}));

// Mock the AddressLookupDrawer component
jest.mock('./address-lookup-drawer', () => ({
  AddressLookupDrawer: ({ selectedUser, onClose }: { 
    selectedUser: UserData | null;
    onClose: () => void;
  }) => (
    <div data-testid="address-lookup-drawer" data-selected-user={selectedUser?.id}>
      {selectedUser && <div>User Details: {selectedUser.name}</div>}
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

describe('AddressLookupSection', () => {
  const mockUsers: UserData[] = [
    {
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
    },
    {
      id: 2,
      name: 'Jane Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      address: {
        street: '456 Oak St',
        suite: 'Unit 2',
        city: 'Boston',
        zipcode: '02109',
        geo: {
          lat: '42.3601',
          lng: '-71.0589'
        }
      },
      phone: '1-234-567-8901',
      website: 'janesmith.com',
      company: {
        name: 'Test Corp',
        catchPhrase: 'Testing for success',
        bs: 'test synergy'
      }
    }
  ];

  it('should render the component with initial data', () => {
    render(<AddressLookupSection initialData={mockUsers} />);
    
    expect(screen.getByTestId('mui-container')).toBeInTheDocument();
    expect(screen.getByTestId('mui-autocomplete')).toBeInTheDocument();
    expect(screen.getByTestId('mui-datagrid')).toBeInTheDocument();
  });

  it('should display all users in the data grid initially', () => {
    render(<AddressLookupSection initialData={mockUsers} />);
    
    mockUsers.forEach(user => {
      expect(screen.getByTestId(`grid-row-${user.id}`)).toBeInTheDocument();
    });
  });

  it('should open drawer when a user row is clicked', () => {
    render(<AddressLookupSection initialData={mockUsers} />);
    
    // Initially, no user should be selected
    expect(screen.getByTestId('address-lookup-drawer')).not.toHaveAttribute('data-selected-user');
    
    // Click on the first user's row
    fireEvent.click(screen.getByTestId('grid-row-1'));
    
    // Drawer should now show the selected user
    expect(screen.getByTestId('address-lookup-drawer')).toHaveAttribute('data-selected-user', '1');
    expect(screen.getByText('User Details: John Doe')).toBeInTheDocument();
  });

  it('should close drawer when close button is clicked', () => {
    render(<AddressLookupSection initialData={mockUsers} />);
    
    // Open the drawer first
    fireEvent.click(screen.getByTestId('grid-row-1'));
    expect(screen.getByText('User Details: John Doe')).toBeInTheDocument();
    
    // Click close button
    fireEvent.click(screen.getByText('Close'));
    
    // Drawer should not show user details anymore
    expect(screen.queryByText('User Details: John Doe')).not.toBeInTheDocument();
  });

  it('should render with empty initial data', () => {
    render(<AddressLookupSection initialData={[]} />);
    
    expect(screen.getByTestId('mui-container')).toBeInTheDocument();
    expect(screen.getByTestId('mui-autocomplete')).toBeInTheDocument();
    expect(screen.getByTestId('mui-datagrid')).toBeInTheDocument();
  });
}); 