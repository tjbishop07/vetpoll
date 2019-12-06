import React, { Component, Fragment } from 'react';

import Navigation from './Navigation';
import getFirebase, { FirebaseContext } from './Firebase';
import withAuthentication from './Session/withAuthentication';

class Layout extends Component {
  state = {
    firebase: null,
  };

  componentDidMount() {
    const app = import('firebase/app');
    const auth = import('firebase/auth');
    const database = import('firebase/database');

    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0]);

      this.setState({ firebase });
    });
  }

  render() {
    return (
      <FirebaseContext.Provider value={this.state.firebase}>
        <AppWithAuthentication {...this.props} />
      </FirebaseContext.Provider>
    );
  }
}

const AppWithAuthentication = withAuthentication(({ children }) => (
  <div style={{
    height: '100%',
    display: 'flex',
    flexDirection: "column"
  }}>    <Navigation />
    <div className="container is-fluid" style={{ marginTop: '70px' }}>
      {children}
    </div>
    <footer className="footer is-fixed-bottom is-transparent is-paddingless is-marginless">
      <div className="content has-text-centered is-size-7">
        <p>
          <strong>VetPoll - www.vetpoll.com</strong><br />
          Made with [LOVE] by U.S. Veterans #<span style={{ color: '#FF0000' }}>Vets</span>Who<span style={{ color: '#0000FF' }}>Code</span>
    </p>
      </div>
    </footer>
  </div>
));

export default Layout;
