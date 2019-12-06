import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import MessageList from './MessageList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faCactus, faMonkey } from '@fortawesome/pro-duotone-svg-icons'

class Messages extends Component {
  _initFirebase = false;

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      messages: [],
      limit: 25,
    };
  }

  firebaseInit = () => {
    if (this.props.firebase && !this._initFirebase) {
      this._initFirebase = true;

      this.onListenForMessages();
    }
  };

  componentDidMount() {
    this.firebaseInit();
  }

  componentDidUpdate() {
    this.firebaseInit();
  }

  onListenForMessages = () => {
    this.setState({ loading: true });

    this.props.firebase
      .messages()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', snapshot => {
        const messageObject = snapshot.val();

        if (messageObject) {
          const messageList = Object.keys(messageObject).map(key => ({
            ...messageObject[key],
            uid: key,
          }));



          this.setState({
            messages: messageList,
            loading: false,
          });
        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onCreateMessage = (event, authUser) => {

    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.uid,
      userName: authUser.username,
      email: authUser.email,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ text: '' });

    event.preventDefault();
  };

  onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;

    this.props.firebase.message(message.uid).set({
      ...messageSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForMessages,
    );
  };

  render() {
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div style={{ height: '300px' }}>


            <nav className="panel smooth-shadow">
              <p className="panel-heading">
                Live Discussion
                </p>

              <div className="panel-block has-background-white">
                <p className="title is-size-6 has-text-info">Q: What does is mean to be a Veteran?</p>
              </div>


              {loading &&
                <div className="panel-block has-background-white">
                  <progress className="progress is-small is-primary" max="100">100%</progress>
                </div>
              }

              <div className="chat-history">
                {messages && (
                  <MessageList
                    authUser={authUser}
                    messages={messages}
                    onEditMessage={this.onEditMessage}
                    onRemoveMessage={this.onRemoveMessage}
                  />
                )}
                {!messages &&
                  <div className="no-messages">
                    <h5>
                      <FontAwesomeIcon icon={faMonkey} className="fa-7x" /><br />
                      No messages found.
                    </h5>
                  </div>
                }
              </div>

              {/* {!loading && messages && (
                <a className="panel-block has-background-dark has-text-white" onClick={this.onNextPage}>Load more...</a>
              )} */}

              <div className="panel-block has-background-white">
                <form
                  style={{ width: '100%' }}
                  onSubmit={event =>
                    this.onCreateMessage(event, authUser)
                  }
                >
                  <div className="field is-grouped">
                    <p className="control is-expanded">
                      <input
                        className="input"
                        type="text"
                        value={text}
                        placeholder="Say something..."
                        onChange={this.onChangeText}
                      />  </p>
                    <p className="control">
                      <button className="button is-dark" type="submit">
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </button>
                    </p>
                  </div>
                </form>
              </div>

            </nav>

          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Messages);
