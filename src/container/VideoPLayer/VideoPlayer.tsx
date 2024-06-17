import React, { CSSProperties, useEffect, useRef, useState } from "react";
import * as Controls from "../video-controls/video-controls";
import "./video-player.css";
import { useVideo } from "../../hooks/usevideo";
import { debounce } from "lodash";
import { FaBackward, FaForward } from "react-icons/fa";

const VideoContainer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef(null);
  const skipForwordRef = useRef(null);
  const skipBackwardRef = useRef(null);

  const {
    playPauseToggle,
    handleSpeedChange,
    handleVolumeChange,
    seek,
    FullScreen,
    PictureInPicutureScreen,
  } = useVideo();
  useEffect(() => {}, [videoRef]);

  const handleKeyEvents = (e: any) => {
    switch (e.key.toLowerCase()) {
      case " ": {
        playPauseToggle(videoRef);
        break;
      }

      case "arrowright": {
        seek(videoRef, 5 , skipForwordRef);
        break;
      }
      case "arrowleft": {
        seek(videoRef, -5, skipBackwardRef);
        break;
      }
      case "p": {
        handleSpeedChange(videoRef);
        break;
      }

      case "arrowup": {
        if (videoRef.current != null) {
          handleVolumeChange(videoRef, videoRef.current.volume * 100 + 10);
        }
        break;
      }
      case "arrowdown": {
        if (videoRef.current != null) {
          handleVolumeChange(videoRef, videoRef.current.volume * 100 - 10);
        }
        break;
      }

      case "f": {
        FullScreen(videoRef, videoContainerRef);
        break;
      }
      case "i": {
        PictureInPicutureScreen(videoRef, videoContainerRef);
        break;
      }

      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyEvents);
  }, []);

  return (
    <div className="video-container" ref={videoContainerRef}>
      <div style={{ ...Skip, left: "10%" }} ref={skipBackwardRef}>
        <FaBackward />
        <span>10 seconds</span>
      </div>

      <div style={{ ...Skip, right: "10%" }} ref={skipForwordRef}>
        <FaForward />
        <span className="sr-only">10 seconds</span>
      </div>

      <div className="controls-container">
        <Controls.Timeline videoReference={videoRef} />
        <div className="controls">
          <Controls.ButtonControls
            videoReference={videoRef}
            divRef={videoContainerRef}
          />
        </div>
      </div>
      <video
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        width={"100%"}
        height={"86%"}
        autoPlay={false}
        ref={videoRef}
        controls={false}
      />
    </div>
  );
};

export default VideoContainer;

const Skip: CSSProperties = {
  display: "none",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  background: "#333",
  borderRadius: "50%",
  height: "4vmax",
  width: "4vmax",
  boxShadow: "10px 0px 130px -15px rgba(255, 255, 255, 1)",
  zIndex: 1,
  position: "absolute",
  cursor: "pointer",
  fontSize: "0.7vmax",
};
