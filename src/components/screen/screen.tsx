import React from "react";
import { RiFullscreenExitFill, RiFullscreenFill } from "react-icons/ri";
import { useVideo } from "../../hooks/usevideo";

const ScreenManagement: React.FC<{
  videoReference: React.RefObject<HTMLVideoElement>;
  divRef: React.RefObject<HTMLDivElement>;
}> = ({ videoReference, divRef }) => {
  const { videoState, FullScreen } = useVideo();
  return (
    <>
      <button className="button full-screen-btn">
        {videoState.screenHandler == false ? (
          <RiFullscreenFill
            className="open"
            onClick={() => FullScreen(videoReference, divRef)}
          />
        ) : (
          <RiFullscreenExitFill
            className="close"
            onClick={() => FullScreen(videoReference, divRef)}
          />
        )}
      </button>
    </>
  );
};

export default ScreenManagement;
