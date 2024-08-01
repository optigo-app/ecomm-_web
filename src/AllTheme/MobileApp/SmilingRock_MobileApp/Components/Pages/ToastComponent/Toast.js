import React, { useState, useEffect } from 'react';

const Toast = ({
  message,
  show,
  duration = 3000,
  onClose,
  bgColor = '#333',
  textColor = '#fff',
  width = '250px',
  fontSize = '17px',
  padding = '16px',
  borderRadius = '12px'
}) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose && onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  const toastStyle = {
    visibility: visible ? 'visible' : 'hidden',
    minWidth: width,
    maxWidth: '80%',
    margin: '0 auto',
    backgroundColor: bgColor,
    color: textColor,
    textAlign: 'center',
    borderRadius: borderRadius,
    position: 'fixed',
    left: '50%',
    bottom: '30px',
    transform: 'translateX(-50%)',
    zIndex: 111111,
    fontSize: fontSize,
    padding: padding,
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
    opacity: visible ? 1 : 0,
    transition: 'opacity 0.3s, visibility 0.3s',
  };

  return <div style={toastStyle}>{message}</div>;
};

export default Toast;
