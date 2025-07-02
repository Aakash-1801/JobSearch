import React, { useState } from 'react';
import './Accordion.css';

function Accordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <h4>{question}</h4>
        <span>{isOpen ? '^' : '⌄'}</span>
      </div>
      {isOpen && (
        <div className="accordion-body">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default Accordion;
