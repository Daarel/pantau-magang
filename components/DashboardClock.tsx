"use client";

import { FC, useEffect, useState } from "react";

const DashboardClock: FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <h2 className='text-white text-2xl max-sm:text-lg mb-2'>
        {time.toLocaleString("id-ID", { dateStyle: "full" })}
      </h2>
      <p className='text-white text-lg max-sm:text-sm'>
        {time.toLocaleTimeString("id-ID", { hour12: false })}
      </p>
    </>
  );
};

export default DashboardClock;
