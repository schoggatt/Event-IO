import React, { useEffect, useState } from "react";

interface ICountdownTimerProps {
  targetDate: Date;
}

function CountdownTimer(props: ICountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = props.targetDate.getTime() - now;

      const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor(
        (difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
      );
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ months, days, hours, minutes, seconds });

      if (difference < 0) {
        clearInterval(interval);
        setTimeLeft({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [props.targetDate]);

  return (
    <div>
      <div>{timeLeft.months} months</div>
      <div>{timeLeft.days} days</div>
      <div>{timeLeft.hours} hours</div>
      <div>{timeLeft.minutes} minutes</div>
      <div>{timeLeft.seconds} seconds</div>
    </div>
  );
}

export default CountdownTimer;
