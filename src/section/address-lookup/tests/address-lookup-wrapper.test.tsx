import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddressLookupWrapper from '../address-lookup-wrapper';
import type { UserData } from '@/app/types';
import { ComponentType } from 'react';

// Mock next/dynamic
jest.mock('next/dynamic', () => {
  return function mockDynamic(dynamicImport: () => Promise<ComponentType<unknown>>, options: { ssr?: boolean; loading?: ComponentType }) {
    // Return a mocked component that passes through props to the
    // component returned by the dynamic import
    const MockedComponent = (props: Record<string, unknown>) => {
      const mockComponent = (
        <div data-testid="mocked-dynamic-component">
          <div data-testid="dynamic-component-props">{JSON.stringify(props)}</div>
        </div>
      );
      
      // If there's a loading component and we want to test it, we could render it here
      if (options?.loading) {
        return (
          <>
            {mockComponent}
            <div data-testid="dynamic-loading">
              {React.createElement(options.loading)}
            </div>
          </>
        );
      }
      
      return mockComponent;
    };
    return MockedComponent;
  };
});

// Mock the Loading component
jest.mock('@/components/loading/loading', () => {
  return function MockLoading() {
    return <div data-testid="loading-component">Loading...</div>;
  };
});

describe('AddressLookupWrapper', () => {
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
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component with Suspense and dynamic import', () => {
    render(<AddressLookupWrapper initialData={mockUsers} />);
    
    // Check that the dynamic component is rendered
    expect(screen.getByTestId('mocked-dynamic-component')).toBeInTheDocument();
    
    // Check that props are correctly passed to the dynamically imported component
    const propsElement = screen.getByTestId('dynamic-component-props');
    expect(propsElement).toBeInTheDocument();
    
    // Check that the initialData prop is correctly passed
    const props = JSON.parse(propsElement.textContent || '{}');
    expect(props).toHaveProperty('initialData');
    expect(props.initialData).toEqual(mockUsers);
  });

  it('should render the loading component from dynamic import options', () => {
    render(<AddressLookupWrapper initialData={mockUsers} />);
    
    // Verify that the loading component from dynamic import is rendered
    const loadingElement = screen.getByTestId('dynamic-loading');
    expect(loadingElement).toBeInTheDocument();
    
    // Check that it contains the Loading component
    expect(screen.getAllByTestId('loading-component')).toHaveLength(1);
  });

  it('should render with empty initial data', () => {
    render(<AddressLookupWrapper initialData={[]} />);
    
    // Check that the component still renders with empty data
    expect(screen.getByTestId('mocked-dynamic-component')).toBeInTheDocument();
    
    // Check that empty initialData is passed correctly
    const propsElement = screen.getByTestId('dynamic-component-props');
    const props = JSON.parse(propsElement.textContent || '{}');
    expect(props).toHaveProperty('initialData');
    expect(props.initialData).toEqual([]);
  });
}); 