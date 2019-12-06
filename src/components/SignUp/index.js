import React, { Component } from 'react';
import { Link, navigate } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/pro-duotone-svg-icons'

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
  isLoading: false
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin, isLoading } = this.state;
    const roles = {};
    this.setState({ ...this.state, isLoading: true });

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles,
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        navigate(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error, isLoading: false });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>

          <div className="columns">
            <div className="column is-4 is-offset-4">

              <div className="field">
                <div className="control">
                  <input
                    className="input is-medium"
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Full Name"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input is-medium"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="email"
                    placeholder="Email Address"
                  />
                  <span className="icon is-medium is-left">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                </div>
              </div>

              <div className="columns">
                <div className="column">

                  <div className="field">
                    <div className="control has-icons-left">
                      <input
                        className="input is-medium"
                        name="passwordOne"
                        value={passwordOne}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password"
                      />
                      <span className="icon is-medium is-left">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </div>
                  </div>

                </div>
                <div className="column">

                  <div className="field">
                    <div className="control has-icons-left">
                      <input
                        className="input is-medium"
                        name="passwordTwo"
                        value={passwordTwo}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Confirm"
                      />
                      <span className="icon is-medium is-left">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {error && <article className="message is-danger">
                <div className="message-body">{error.message}</div>
              </article>}

              <button disabled={isInvalid} type="submit" className={`${this.state.isLoading ? 'is-loading' : ''} button is-primary is-pulled-right is-medium is-fullwidth`}>Continue</button>

            </div>
          </div>
        </form>

      </React.Fragment>
    );
  }
}

const SignUpLink = () => (
  <p className="has-text-white has-text-centered is-block">
    Don't have an account? <Link className="has-text-white has-text-weight-bold" to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withFirebase(SignUpFormBase);

export { SignUpLink };
