import React from "react";
import { IoVolumeHighSharp } from "react-icons/io5";
import { useVideo } from "../../hooks/usevideo";
import { GoMute } from "react-icons/go";

export const VolumeOfVideo: React.FC<{
  videoReference: React.RefObject<HTMLVideoElement>;
}> = ({ videoReference }) => {
  const { videoState, handleVolumeChange } = useVideo();
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleVolumeChange(videoReference, Number(e.target.value));
  };

  return (
    <>
      <button className="button mute-btn" data-volume-level="high">
        {videoState.volume > 0 ? (
          <IoVolumeHighSharp className="volume-high-icon" />
        ) : (
          <GoMute className="volume-muted-icon" />
        )}
      </button>
      <div>
        <input
          type="range"
          className="mute-btn-range"
          name="mute-btn-range"
          min="0"
          max="100"
          value={videoState.volume}
          onChange={handleVolume}
        />
      </div>
    </>
  );
};
