import { createContext } from "react";
import { VideoContextType } from "../../models/video-context.model";
import { videoStateDefaultValue } from "../../defaults/video.d";

export const VideoContext = createContext<VideoContextType>(
  videoStateDefaultValue()
);
