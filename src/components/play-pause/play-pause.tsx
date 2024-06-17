import React, { useEffect } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useVideo } from "../../hooks/usevideo";

export const PlayPauseVideo: React.FC<{
  videoReference: React.RefObject<HTMLVideoElement>;
}> = ({ videoReference }) => {
  const { videoState, playPauseToggle } = useVideo();

  const handleToggle = () => {
    playPauseToggle(videoReference);
  };

  return (
    <button className="button play-pause-btn" onClick={handleToggle}>
      {videoState.isPlaying ? (
        <BsFillPauseFill className="pause-icon" />
      ) : (
        <BsFillPlayFill className="play-icon" />
      )}
    </button>
  );
};
