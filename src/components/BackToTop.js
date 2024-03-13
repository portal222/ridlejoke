import React, { useEffect, useState } from 'react';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import TravelExploreIcon from '@mui/icons-material/TravelExplore';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScrollVisibility = () => {
      window.pageYOffset > 300 ? setVisible(true) : setVisible(false);
    };
    window.addEventListener('scroll', handleScrollVisibility);
    return () => {
      window.removeEventListener('scroll', handleScrollVisibility);
    };
  }, []);
  const handleScrollOnTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {visible && (
        <span>
          <div onClick={handleScrollOnTop} className='back-to-top'>
            <div className='arrowup'>
              
              <KeyboardArrowUpIcon />
            </div>
          
          </div>
        </span>
      )}
    </div>
  );
}
