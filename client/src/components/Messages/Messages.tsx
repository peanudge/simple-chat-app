import React, { useEffect, useRef } from "react";
import Message from "./Message/Message";

import "./Messages.css";

interface IProps {
  messages: { user: string; text: string }[];
  name: string;
}

const Messages: React.FC<IProps> = ({ messages, name }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView(true);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="messages">
      {messages.map((message, i) => {
        return <Message key={i} message={message} name={name} />;
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default React.memo(Messages);
