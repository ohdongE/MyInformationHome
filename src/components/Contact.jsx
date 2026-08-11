import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/components/Contact.css';

const EMAIL = 'dhtjddnjs562@gmail.com';

function Contact() {
  const { t } = useLanguage();
  const [emailOpen, setEmailOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setEmailOpen(false);
    setCopied(false);
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <span className="section-label">{t.contact.label}</span>
        <h2>{t.contact.title}</h2>
        <p className="contact-intro">{t.contact.intro}</p>

        <div className="contact-links">
          <button
            type="button"
            className={`contact-link contact-email ${emailOpen ? 'open' : ''}`}
            onClick={() => (emailOpen ? handleCopy() : setEmailOpen(true))}
          >
            {emailOpen && (
              <span className="contact-email-close" onClick={handleClose}>
                ×
              </span>
            )}
            <span className="contact-email-text">
              {emailOpen ? (copied ? t.contact.copied : EMAIL) : t.contact.email}
            </span>
          </button>

          <a href="https://github.com/ohdongE" className="contact-link" target="_blank" rel="noopener noreferrer">
            {t.contact.github}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
