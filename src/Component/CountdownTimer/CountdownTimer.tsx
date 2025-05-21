import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string; // Assuming this is already in Dubai time
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: any = {};

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
          2,
          "0"
        ),
        hours: String(
          Math.floor((difference / (1000 * 60 * 60)) % 24)
        ).padStart(2, "0"),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
          2,
          "0"
        ),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown-wrapper">
      {Object.entries(timeLeft).map(([label, value]) => {
        const shortLabel =
          label === "days"
            ? "D"
            : label === "hours"
            ? "H"
            : label === "minutes"
            ? "M"
            : "S";
        return (
          <div className="time-box" key={label}>
            <span className="number">{String(value).padStart(2, "0")}</span>
            <span className="short-label">{shortLabel}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CountdownTimer;
