import React, { useContext } from "react";
import { VideoContextType } from "../models/video-context.model";
import { VideoContext } from "../contexts/create-context";

export const useVideo = (): VideoContextType => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVolume must be used within a VolumeProvider");
  }
  return context;
};
