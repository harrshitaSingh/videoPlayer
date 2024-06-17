import React from "react";

const VideoDuration: React.FC<{
  videoReference: React.RefObject<HTMLVideoElement>;
}> = ({ videoReference }) => {
  return (
    <div className="duration-container">
      <span className="duration-start-time">0:00</span>/
      <span className="duration-end-time">0:00</span>
    </div>
  );
};

export default VideoDuration;
