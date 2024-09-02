import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="loading-spinner">
        {/* Usamos CSS para animar el spinner */}
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </div>
  );
};

export default Loading;
