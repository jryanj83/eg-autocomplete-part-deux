'use client';

import React from 'react';
import { Box, Alert, Button } from '@mui/material';

import type { Props, State } from './types';

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 2 }}>
          <Alert 
            severity="error" 
            action={
              <Button 
                color="inherit" 
                size="small" 
                onClick={this.handleReset}
              >
                Try Again
              </Button>
            }
          >
            {this.state.error?.message || 'Something went wrong'}
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
} 