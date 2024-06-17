import React from "react";
import { VideoContextType } from "../models/video-context.model";
import { video } from "../models/video.model";

export function videoStateDefaultValue(): VideoContextType {
  return {
    videoState: {
      isPlaying: false,
      volume: 50,
      videoSpeed: 1,
      currentTime: 0,
    },
    playPauseToggle: (
      videoRef: React.RefObject<HTMLVideoElement>,
      videoState: video
    ) => {},
    handleVolumeChange: (value: number) => {},
    handleSpeedChange: () => {},
    seek: (time: number) => {},
  };
}
