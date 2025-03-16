import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorBoundary } from './error-boundry';

// Create a component that throws an error
const ErrorThrowingComponent = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div data-testid="normal-component">Normal Component Content</div>;
};

describe('ErrorBoundary', () => {
  // Suppress console.error during tests
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div data-testid="test-child">Test Child</div>
      </ErrorBoundary>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('should render error UI when an error occurs', () => {
    // Using jest.spyOn to mock the console.error for this specific test
    jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Suppress React's error boundary warning in test environment
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    
    // Error message should be displayed
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    
    // Try Again button should be present
    expect(screen.getByText('Try Again')).toBeInTheDocument();
    
    spy.mockRestore();
  });

  it('should display generic error message when error has no message', () => {
    // Using jest.spyOn to mock the console.error for this specific test
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});
    
    // Create an error without a message
    const ErrorWithoutMessage = () => {
      throw new Error();
    };

    render(
      <ErrorBoundary>
        <ErrorWithoutMessage />
      </ErrorBoundary>
    );
    
    // Generic error message should be displayed
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    
    spy.mockRestore();
  });

  it('should reset error state when Try Again button is clicked', () => {
    // Using jest.spyOn to mock the console.error for this specific test
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});
    
    // Mock setState to verify it's called with the correct values
    const setStateMock = jest.fn();
    
    // Create a custom ErrorBoundary instance with mocked setState
    const originalSetState = ErrorBoundary.prototype.setState;
    ErrorBoundary.prototype.setState = setStateMock;
    
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    
    // Error message should be displayed
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    
    // Reset the mock to clear any calls during rendering
    setStateMock.mockClear();
    
    // Click Try Again button
    fireEvent.click(screen.getByText('Try Again'));
    
    // Verify that setState was called with the correct reset values
    expect(setStateMock).toHaveBeenCalledWith({
      hasError: false,
      error: null
    });
    
    // Restore the original setState method
    ErrorBoundary.prototype.setState = originalSetState;
    spy.mockRestore();
  });

  it('should call componentDidCatch when an error occurs', () => {
    // Using jest.spyOn to mock the console.error for this specific test
    const errorSpy = jest.spyOn(console, 'error');
    errorSpy.mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    
    // componentDidCatch should have called console.error
    expect(errorSpy).toHaveBeenCalled();
    
    errorSpy.mockRestore();
  });
}); 