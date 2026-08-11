import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/components/Chatbot.css';

function getReply(input, t) {
  const lower = input.toLowerCase();
  const matched = t.chatbot.scriptedReplies.find((item) =>
    item.keywords.some((keyword) => lower.includes(keyword.toLowerCase()))
  );
  return matched ? matched.reply : t.chatbot.defaultReply;
}

function Chatbot() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: t.chatbot.greeting },
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    setMessages([{ sender: 'bot', text: t.chatbot.greeting }]);
  }, [t]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    const botMessage = { sender: 'bot', text: getReply(input, t) };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbot">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>{t.chatbot.windowTitle}</span>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.chatbot.placeholder}
            />
            <button onClick={handleSend}>{t.chatbot.send}</button>
          </div>
        </div>
      )}

      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '×' : '💬'}
      </button>
    </div>
  );
}

export default Chatbot;
