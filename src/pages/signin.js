import React, { Fragment } from 'react';

import Layout from '../components/layout';
import SignInForm, {
  SignInGoogle,
  SignInFacebook,
  SignInTwitter,
} from '../components/SignIn';
import { SignUpLink } from '../components/SignUp';

const SignInPage = () => (
  <Fragment>
    <h1 className="title has-text-white has-text-centered is-size-3">Sign In</h1>
    <div className="columns">
      <div className="column is-4 is-offset-4">
        <SignInForm />
      </div>
    </div>
    <div className="columns">
      <div className="column is-4 is-offset-4">
        <SignInGoogle />
        {/* <SignInFacebook />
        <SignInTwitter /> */}
        {/* <SignUpLink /> */}
      </div>
    </div>
  </Fragment>
);

export default () => (
  <Layout>
    <SignInPage />
  </Layout>
);
