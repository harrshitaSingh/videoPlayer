import React, { createContext, useEffect, useState } from "react";
import { videoStateDefaultValue } from "../defaults/video.d";
import { video } from "../models/video.model";
import { VideoContext } from "./create-context";

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [videoRefr, setVideoRefr] = useState<any>();
  const [videoState, setVideoState] = useState<video>({
    isPlaying: false,
    volume: 0,
    videoSpeed: 1,
    currentTime: 0,
    screenHandler: false,
    picture_In_picture: false,
  });

  useEffect(() => {
    if (videoRefr == null) return;
    setVideoState((prevState) => ({
      ...prevState,
      isPlaying: true,
      volume: videoRefr.current.volume * 100,
    }));
  }, [videoRefr]);

  const playPauseToggle = (videoRef: React.RefObject<HTMLVideoElement>) => {
    setVideoState((prevState) => ({
      ...prevState,
      isPlaying: !prevState.isPlaying,
    }));
    setVideoRefr(videoRef);
  };

  useEffect(() => {
    if (videoRefr == null) return;
    if (!videoState.isPlaying) {
      videoRefr.current?.pause();
    } else {
      videoRefr.current?.play();
    }
  }, [videoState.isPlaying]);

  const handleVolumeChange = (
    videoRef: React.RefObject<HTMLVideoElement>,
    value: any
  ) => {
    if (videoRef.current != null && checkConditionOfVolume(value)) {
      const videoVolume = parseFloat(value) / 100;
      videoRef.current.volume = Number(videoVolume?.toFixed(1));
      const newVolume = videoRef.current.volume * 100;
      setVideoState((prevState) => ({
        ...prevState,
        volume: newVolume,
      }));
    } else {
      return;
    }
  };

  function checkConditionOfVolume(value: any) {
    return typeof value != "string" && value <= 100 && value >= 0;
  }

  const handleSpeedChange = (videoRef: React.RefObject<HTMLVideoElement>) => {
    const speedArr = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    let speed: any;

    if (videoRef.current != null) {
      const currentSpeed = videoRef.current.playbackRate;
      if (currentSpeed === speedArr[speedArr.length - 1]) {
        speed = speedArr[0];
        videoRef.current.playbackRate = speed;
      } else {
        videoRef.current.playbackRate += 0.25;
        speed = videoRef.current.playbackRate;
      }

      setVideoState((prevState) => ({
        ...prevState,
        videoSpeed: speed,
      }));
    }
  };

  const seek = (
    videoRef: React.RefObject<HTMLVideoElement>,
    time: number,
    divRef: React.RefObject<HTMLDivElement>
  ) => {
    if (videoRef.current != null && divRef.current != null) {
      if (
        time > 0 &&
        videoRef.current.currentTime < videoRef.current.duration
      ) {
        divRef.current.style.display = "inline-flex";
        setTimeout(() => {
          if (divRef.current) {
            divRef.current.style.display = "none";
          }
        }, 500);
      } else if (time >= -5 && videoRef.current.currentTime > 0) {
        divRef.current.style.display = "inline-flex";
        setTimeout(() => {
          if (divRef.current) {
            divRef.current.style.display = "none";
          }
        }, 500);
      }
      videoRef.current.currentTime = videoRef.current.currentTime + time;
    }
  };

  const FullScreen = (
    videoRef: React.RefObject<HTMLVideoElement>,
    divRef: React.RefObject<HTMLDivElement>
  ) => {
    if (videoRef.current != null) {
      if (document.fullscreenElement == null) {
        divRef.current?.requestFullscreen();
        videoRef.current.style.borderRadius = "0px";
      } else {
        document.exitFullscreen();
        videoRef.current.style.borderRadius = "15px";
      }
      setVideoState((prevState) => ({
        ...prevState,
        screenHandler: !prevState.screenHandler,
      }));
    }
  };

  const PictureInPicutureScreen = (
    videoRef: React.RefObject<HTMLVideoElement>,
    divRef: React.RefObject<HTMLDivElement>
  ) => {
    if (divRef.current != null && videoRef.current != null) {
      if (divRef.current.classList.contains("mini-player")) {
        divRef.current.classList.remove("mini-player");
        document.exitPictureInPicture();
      } else {
        videoRef.current.requestPictureInPicture();
        divRef.current.classList.add("mini-player");
      }
    }
  };

  return (
    <VideoContext.Provider
      value={{
        videoState,
        playPauseToggle,
        handleVolumeChange,
        handleSpeedChange,
        seek,
        FullScreen,
        PictureInPicutureScreen,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
