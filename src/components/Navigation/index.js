import React from 'react';
import { Link } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlagUsa } from '@fortawesome/pro-duotone-svg-icons'

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = () => (
  <AuthUserContext.Consumer>

    {(authUser) => (
      <nav className="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <h1 className="is-size-4 has-text-weight-bold">
              <FontAwesomeIcon icon={faFlagUsa} style={{ marginRight: '10px' }} />
              VetPoll</h1>
          </a>

          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to={ROUTES.LANDING} className="navbar-item">Home</Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Polls</a>

              <div className="navbar-dropdown">
                <a className="navbar-item">
                  About
        </a>
                <a className="navbar-item">
                  Jobs
        </a>
                <a className="navbar-item">
                  Contact
        </a>
                <hr className="navbar-divider" />
                <a className="navbar-item">
                  Report an issue
        </a>
              </div>
            </div>
          </div>

          <div className="navbar-end">

            {authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />}

          </div>
        </div>
      </nav>

    )}

  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => {
  return (
    <React.Fragment>
      <div className="navbar-item">
        <div className="buttons">
          {!!authUser.roles[ROLES.ADMIN] && (
            <Link to={ROUTES.ADMIN} className="button is-primary">Admin</Link>
          )}
          <SignOutButton />
        </div>
      </div>
    </React.Fragment>
  )
};

const NavigationNonAuth = () => {
  return (
    <React.Fragment>
      <div className="navbar-item">
        <div className="buttons">
          <Link to={ROUTES.SIGN_UP} className="button is-light is-outlined">Register</Link>
          <Link to={ROUTES.SIGN_IN} className="button is-primary has-text-weight-bold">Sign In</Link>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Navigation;
