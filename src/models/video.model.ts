export interface video {
  isPlaying: boolean;
  volume: number;
  videoSpeed: number;
  currentTime: number;
  screenHandler: boolean;
  picture_In_picture: boolean;
}

export interface VideoState {
  videoState: video;
}
