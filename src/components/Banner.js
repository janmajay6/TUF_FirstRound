// src/components/Banner.js
import React, { useState, useEffect } from 'react';

function Banner({ data, setBannerData }) {
  const [timeLeft, setTimeLeft] = useState(data.timer);

  useEffect(() => {
    // If timer is not set or banner is not visible, exit early
    if (data.timer <= 0 || !data.visible) return;

    setTimeLeft(data.timer); // Initialize countdown with the timer value

    const timerId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerId); // Clear interval when time is up
          setBannerData(prevData => ({
            ...prevData,
            visible: false,
          }));
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount or timer change
    return () => clearInterval(timerId);
  }, [data.timer, data.visible, setBannerData]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!data.visible) return null;

  return (
    <div className="banner">
      <p>{data.description}</p>
      <a href={data.link} target="_blank" rel="noopener noreferrer">Link</a>
      <div>Time Left: {formatTime(timeLeft)}</div>
    </div>
  );
}

export default Banner;
