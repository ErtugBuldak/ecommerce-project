import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import dayjs from 'dayjs';
import LoadingSpinnerGIF from '../assets/loading-spinner.gif';
import './ChatInput.css';

function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function clearHistory() {
    setChatMessages([]);
    localStorage.setItem('messages', JSON.stringify([]));
  }

  async function sendMessage() {
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      },
      {
        message: <img src={LoadingSpinnerGIF} className="loading-spinner" />,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ];

    setChatMessages(newChatMessages);

    const response = await Chatbot.getResponseAsync(inputText);
    newChatMessages.pop();
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

    setInputText('');
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
      <button
        onClick={clearHistory}
        className="clear-button"
      >Clear</button>
    </div>
  );
}

export default ChatInput;