import { useState, useEffect } from "react";
const TimeExpired = ({ start = true, onChange, reset = false, time = 5 }) => {
  let date = new Date();
  const [timeExpired, setTimeExpired] = useState(
    localStorage.getItem("timeExpired")
  );
  const [timeCurrent, setTimeCurrent] = useState(date.getTime());
  const [timeCountDown, setTimeCountDown] = useState(time);

  useEffect(() => {
    if (!start) return 1;
    let interval;
    interval = setInterval(() => {
      setTimeCountDown((p) => {
        return p - 1;
      });
    }, 1000);
    if (reset) return clearInterval(interval);
    if (+timeCountDown == 0) {
      clearInterval(interval);
      onChange(true);
      return;
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timeCountDown]);

  return <>{start && <>{timeCountDown}</>}</>;
};
export default TimeExpired;
