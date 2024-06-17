import { FaBackward, FaForward } from "react-icons/fa";
import { PlayPauseVideo } from "../../components/play-pause/play-pause";
import { VolumeOfVideo } from "../../components/volume/volume";
import VIDEOSPEED from "../../components/speed/speed";
import ScreenManagement from "../../components/screen/screen";
import VideoDuration from "../../components/Duration/duration";
import "./video-controls.css";
import TimelineComponent from "../../components/Timeline/timeline";
import { VideoPropsModel, VideoRefModel } from "../../models/propsModel";

export const ButtonControls: React.FC<VideoPropsModel> = ({
  videoReference,
  divRef,
}) => {
  return (
    <>
      <div className="play-pause-volume">
        <PlayPauseVideo videoReference={videoReference} />
        <VolumeOfVideo videoReference={videoReference} />
        <VideoDuration videoReference={videoReference} />
      </div>
      <div className="fullscreen-speed">
        <VIDEOSPEED videoReference={videoReference} />
        <ScreenManagement videoReference={videoReference} divRef={divRef} />
      </div>
    </>
  );
};

export const Timeline: React.FC<VideoRefModel> = ({ videoReference }) => {
  return (
    <>
      <TimelineComponent videoReference={videoReference} />
    </>
  );
};
