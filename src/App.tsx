import React from "react";
import VideoContainer from "./container/VideoPLayer/VideoPlayer";
import { VideoProvider } from "./contexts/videoContext";
const App = () => {
  return (   
    <div style={{ width: "100vw", height: "100vh" }}>
      <VideoProvider>
        <VideoContainer />
      </VideoProvider>
    </div>
  );
};

export default App;
