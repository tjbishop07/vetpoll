import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faCheck, faInboxIn } from '@fortawesome/pro-duotone-svg-icons'

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password');

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props);

      this.state = { isSent: false };
    }

    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }));
    };

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <div>
                {this.state.isSent ? (
                  <div className="notification is-success has-text-dark has-text-weight-bold">
                    <button className="delete"></button>
                    <span className="icon is-pulled-left"><FontAwesomeIcon icon={faCheck} /></span>
                    E-mail confirmation has been sent (don't forget to check your spam folder)
                  </div>
                ) : (
                    <article className="message is-warning">
                      <div className="message-header">
                        <p>One more thing...</p>
                      </div>
                      <div className="message-body">
                        <div className="columns">
                          <div className="column is-10">
                          <span className="icon is-pulled-left"><FontAwesomeIcon icon={faInboxIn} /></span>
                            We sent a verfication e-mail to your inbox. 
                            Please check your e-mail (spam folder too!) and click the link to complete the verification process.
                          </div>
                          <div className="column is-2">
                            <button
                              className="button is-dark is-fullwidth is-outlined"
                              type="button"
                              onClick={this.onSendEmailVerification}
                              disabled={this.state.isSent}
                            >
                              <span className="icon"><FontAwesomeIcon icon={faPaperPlane} /></span> <span>Resend</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  )}
              </div>
            ) : (
                <Component {...this.props} />
              )
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
