import React, { Component } from 'react';
import Moment from 'react-moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/pro-duotone-svg-icons'
import Avatar from 'react-avatar';

class MessageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.message.text,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);
    this.setState({ editMode: false });
  };

  render() {
    const { authUser, message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (

      <li>
        <div className={`message-data ${message.userId !== authUser.uid ? 'has-text-right' : ''}`}>
          <h5 className="title has-text-dark is-size-7" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
            <span className={`message-icon ${message.userId !== authUser.uid ? 'is-pulled-right' : 'is-pulled-left'}`}>
              <figure className="image is-32x32">
                <Avatar email={message.email || null} name={!message.email ? message.userName : null} size={32} className="is-rounded" />
              </figure>
            </span>
            {message.userId !== authUser.uid ? message.userName : 'You'}
          </h5>
        </div>
        <div className={`message ${message.userId !== authUser.uid ? 'other-message' : ''}`}>
          {editMode ? (

            <div className="field is-grouped">
              <p className="control is-expanded">
                <input
                  className="input"
                  type="text"
                  value={editText}
                  onChange={this.onChangeEditText}
                />
              </p>
              <p className="control">
                <button className="button is-dark" onClick={this.onSaveEditText}>
                  <FontAwesomeIcon icon={faSave} />
                </button>
              </p>
            </div>

          ) : (
              <div>
                <h6 className="is-size-5">
                  {message.text}
                </h6>
                <span className="is-success">
                  <Moment className="is-size-7" fromNow>{message.createdAt}</Moment>&nbsp;
                  {message.editedAt && <span className="is-size-7">&nbsp;(Edited)</span>}
                  {message.userId === authUser.uid &&
                    <button className="button is-small is-text is-rounded is-pulled-right" onClick={this.onToggleEditMode}>
                      Edit
                    </button>}
                </span>
              </div>
            )}
        </div>
      </li>

    );
  }
}

export default MessageItem;
