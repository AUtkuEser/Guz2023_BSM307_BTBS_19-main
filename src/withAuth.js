import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = WrappedComponent => {
  return class extends Component {
    state = {
      authenticated: true,
    };

    componentDidMount() {
      // Check if user is authenticated
      const authenticated = localStorage.getItem('authenticated');
      if (authenticated) {
        this.setState({ authenticated: true });
      }
    }
// acces tokeni alıp serverda verify token endpointine istek atıcaz sonrasında oradan dönen değer başarılı değilse refresh token devreye girecek.
    render() {
      const { authenticated } = this.state;

      if (!authenticated) {
        return <Navigate to="/login" />;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withAuth;