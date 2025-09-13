"use client";

import { FC, useEffect, useState } from "react";

const DashboardClock: FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h2
        className='text-white text-2xl max-sm:text-lg mb-2'
        suppressHydrationWarning
      >
        {time.toLocaleDateString("id-ID", { dateStyle: "full" })}
      </h2>
      <p className='text-white text-lg max-sm:text-sm' suppressHydrationWarning>
        {time.toLocaleTimeString("id-ID", { hour12: false })}
      </p>
    </>
  );
};

export default DashboardClock;
