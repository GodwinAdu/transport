"use client"
import{ useState, useEffect } from 'react';
import moment from 'moment';
// import 'moment/locale/en';

const DateTimeComponent = () => {
  const [currentTime, setCurrentTime] = useState(moment());
  const [isMounted, setIsMounted] = useState(false);

 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }


  return (
    <div className="text-center">
      <div className="flex gap-4 items-center">
      <p className="text-md font-semibold hidden md:block text-white/70">{currentTime.format('dddd')}{","}</p>
      <p className="text-md font-bold text-white/70">{currentTime.format('h:mm:ss A')}</p>
      </div>
      <p className="text-xs text-white/70">{currentTime.format('MMMM DD, YYYY')}</p>
    </div>
  );
};

export default DateTimeComponent;
