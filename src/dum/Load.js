import React, { useEffect, useState } from 'react';
import './App.css'; // Ensure you create this CSS file for styling

const Preloader = () => {
  const [loaded, setLoaded] = useState(false);
  const [width, setWidth] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Simulate load event timing
    const perfData = window.performance.timing;
    const estimatedTime = -(perfData.loadEventEnd - perfData.navigationStart);
    const time = parseInt((estimatedTime / 1000) % 60) * 100;

    const animateLoadbar = () => {
      const interval = setInterval(() => {
        setWidth(prevWidth => {
          if (prevWidth >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevWidth + 1;
        });
      }, time / 100);
    };

    const animatePercentage = () => {
      const range = 100;
      const stepTime = Math.abs(Math.floor(time / range));
      let current = 0;
      const interval = setInterval(() => {
        setPercentage(prevPercentage => {
          if (prevPercentage >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevPercentage + 1;
        });
        current++;
        if (current >= range) {
          clearInterval(interval);
        }
      }, stepTime);
    };

    // Start animations
    animateLoadbar();
    animatePercentage();

    // Simulate preloader fade-out
    setTimeout(() => {
      setLoaded(true);
    }, time);
  }, []);

  return (
    <div className={`preloader-wrap ${loaded ? 'fade-out' : ''}`}>
      <div className="loader">
        <div className="trackbar">
          <div className="loadbar" style={{ width: `${width}%` }}></div>
        </div>
      </div>
      <div className="percentage">{percentage}%</div>
    </div>
  );
};

export default Preloader;
