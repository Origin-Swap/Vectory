import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LottieAnimation = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <DotLottieReact
        src="https://lottie.host/a1191570-a60d-4288-9c4a-fb5c97614cee/Mafc86Lhh9.lottie"
        loop
        autoplay
        style={{ width: '250px', height: '250px' }}
      />
    </div>
  );
};



export default LottieAnimation;
