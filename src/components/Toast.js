import React, { useEffect, useState } from 'react';
import '../styles/toast.css';

const Toast = () => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.showToast = (msg) => {
      setMessage(msg);
      setVisible(true);
      setTimeout(() => setVisible(false), 2000);
    };
  }, []);

  return (
    <div className={`toast ${visible ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default Toast;
