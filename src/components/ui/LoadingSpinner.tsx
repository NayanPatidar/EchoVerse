// components/LoadingSpinner.js
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <style jsx>{`
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-left-color: rgba(255, 255, 255, 1);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
