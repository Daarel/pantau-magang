import React, { useState,useEffect } from 'react';

const Card = () => {
  const [visible, setVisible] = useState(true);
    const [show, setShow] = useState(false);
  
    useEffect(() => {
      // delay dikit biar transisi masuk jalan
      const enterTimer = setTimeout(() => setShow(true), 150);
  
      // auto close setelah 3 detik
      const autoCloseTimer = setTimeout(() => {
        closeWithAnimation();
      }, 3000);
  
      return () => {
        clearTimeout(enterTimer);
        clearTimeout(autoCloseTimer);
      };
    }, []);
  
    const closeWithAnimation = () => {
      setShow(false); // mulai animasi keluar
      setTimeout(() => setVisible(false), 500); // setelah animasi baru di-unmount
    };
  
    if (!visible) return null;

  return (
    <div className="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50">
      <div className={`error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px] 
        transition-all duration-500 ease-in-out
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}>
        <div className="flex gap-2">
          <div className="text-[#d65563] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <div>
            <p className="text-white">Please try again</p>
            <p className="text-gray-500">This is the description part</p>
          </div>
        </div>
        <button 
        onClick={closeWithAnimation}
        className="text-gray-600 hover:bg-white/10 p-1 rounded-md transition-colors ease-linear">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Card;
