import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <a className="button is-primary is-outlined has-text-weight-bold" onClick={firebase ? firebase.doSignOut : () => { }}>
    Sign Out
</a>
);

export default withFirebase(SignOutButton);
