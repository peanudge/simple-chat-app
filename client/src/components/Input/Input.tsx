import React from "react";
import "./Input.css";
interface IProps {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const Input: React.FC<IProps> = ({ message, setMessage, sendMessage }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
    <button className="sendButton" onClick={(event) => sendMessage(event)}>
      Send
    </button>
  </form>
);

export default Input;
