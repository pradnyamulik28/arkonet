import React, { useEffect } from 'react';

const ChatBot = () => {
  useEffect(() => {
    // Load the Tawk.to chat widget script
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://embed.tawk.to/6527a86feb150b3fb9a0a556/1hchejth1';
    s.charset = 'UTF-8';
    s.setAttribute('crossorigin', '*');

    // Append the script to the document
    document.body.appendChild(s);

    // Make sure to replace 'YOUR_WIDGET_ID' and 'YOUR_WIDGET_KEY' with your actual Tawk.to widget ID and key.
  }, []);

  return <div>{/* Your component content */}</div>;
};

export default ChatBot;