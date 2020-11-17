import React, { Component } from 'react'


class ErrorBoundaries extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
      }
      static getDerivedStateFromError(error) {
        return { hasError: true };
      }

} 
export default ErrorBoundaries; 