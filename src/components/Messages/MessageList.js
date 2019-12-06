import React, { useEffect, useRef } from 'react'
import MessageItem from './MessageItem';

const MessageList = ({
  authUser,
  messages,
  onEditMessage,
  onRemoveMessage,
}) => {
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(scrollToBottom, [messages]);
  return (<React.Fragment>
    <ul>
      {messages.map(message => (
        <MessageItem
          authUser={authUser}
          key={message.uid}
          message={message}
          onEditMessage={onEditMessage}
          onRemoveMessage={onRemoveMessage}
        />
      ))}
    </ul>
    <div ref={messagesEndRef} />
  </React.Fragment>)
};

export default MessageList;
