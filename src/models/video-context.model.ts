import { VideoState, video } from "./video.model";

export interface VideoContextType extends VideoState {
  playPauseToggle: (ref: React.RefObject<HTMLVideoElement>) => void;
  handleVolumeChange: (
    ref: React.RefObject<HTMLVideoElement>,
    value: number
  ) => void;
  handleSpeedChange: (ref: React.RefObject<HTMLVideoElement>) => void;
  seek: (
    ref: React.RefObject<HTMLVideoElement>,
    time: number,
    divRef: React.RefObject<HTMLDivElement>
  ) => void;
  FullScreen: (
    ref: React.RefObject<HTMLVideoElement>,
    divRef: React.RefObject<HTMLDivElement>
  ) => void;
  PictureInPicutureScreen: (
    ref: React.RefObject<HTMLVideoElement>,
    divRef: React.RefObject<HTMLDivElement>
  ) => void;
}
