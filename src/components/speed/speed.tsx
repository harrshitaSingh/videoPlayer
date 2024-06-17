import React from "react";
import { useVideo } from "../../hooks/usevideo";

const VIDEOSPEED: React.FC<{
  videoReference: React.RefObject<HTMLVideoElement>;
}> = ({ videoReference }) => {
  const { videoState, handleSpeedChange } = useVideo();
  return (
    <button
      className="button speed-btn"
      onClick={() => handleSpeedChange(videoReference)}
    >
      {videoState.videoSpeed}x
    </button>
  );
};

export default VIDEOSPEED;
