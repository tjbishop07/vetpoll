import React, { Fragment } from 'react';

import { AuthUserContext } from '../components/Session';
import Layout from '../components/layout';
import Messages from '../components/Messages';

import Avatar from 'react-avatar';
import "./global.scss"


const LandingPage = (authUser) => (
  <Fragment>
    <AuthUserContext.Consumer>
      {authUser => (

        <div className="tile is-ancestor" style={{ paddingTop: '20px' }}>
          <div className="tile is-vertical is-8">
            <div className="tile">
              <div className="tile is-parent is-vertical">


                <div className="tile is-child">

                  {authUser ? <React.Fragment>

                    <div className="card-content card-abstract">

                      <article className="media">
                        <div className="media-left">
                          <figure className="image">
                            <Avatar className="is-rounded" email={authUser.email} name={authUser.username || 'Vet Poll'} />
                          </figure>
                        </div>
                        <div className="media-content has-text-white">
                          <strong className="has-text-white">{authUser.username}</strong> <small>{authUser.email}</small>
                          <br />
                          <span className="is-size-6">Short description about your self, service, etc.</span>
                        </div>
                      </article>
                    </div>
                    <footer className="card-footer">
                      <a href="#" className="card-footer-item has-text-white">New Poll</a>
                      <a href="#" className="card-footer-item has-text-white">Recent</a>
                    </footer>

                  </React.Fragment> : <React.Fragment>
                      <div className="has-text-white is-size-3">

                        <div className="effect-content">
                          <div className="effect-content__container">
                            <p className="effect-content__container__text">Hello</p>
                            <ul className="effect-content__container__list">
                              <li className="effect-content__container__list__item">Veteran!</li>
                              <li className="effect-content__container__list__item">Researcher!</li>
                              <li className="effect-content__container__list__item">Marketer!</li>
                              <li className="effect-content__container__list__item">You!</li>
                            </ul>
                          </div>
                        </div>

                        <p style={{ marginTop: '10px' }}>
                          We're here to help you find answers. Register or sign in to get started.
                        </p>

                      </div>
                    </React.Fragment>}

                </div>


                <article className="tile is-child notification is-warning">
                  <p className="title">#vetswhocode</p>
                  <p className="subtitle">Non-profit, Veteran-owned organization helping Veterans enter the Tech sector. <a href="#">Donate</a></p>
                </article>
              </div>
              <div className="tile is-parent">
                <article className="tile is-child notification is-info">
                  <p className="title">Featured Poll</p>
                  <p className="subtitle">"What Branch did you serve in?"</p>
                  <figure className="image is-4by3">
                    <img src="https://bulma.io/images/placeholders/640x480.png" />
                  </figure>
                </article>
              </div>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child notification is-danger">
                <p className="title">Search Polls</p>
                <p className="subtitle">Algolia search perhaps? Graph?</p>
                <div className="content">
                </div>
              </article>
            </div>
          </div>
          <div className="tile is-parent">
            <div className="tile is-child is-success">
              {authUser ? <Messages /> : ''}
            </div>
          </div>
        </div>

      )}

    </AuthUserContext.Consumer>
  </Fragment>
);

export default () => (
  <Layout>
    <LandingPage />
  </Layout>
);
