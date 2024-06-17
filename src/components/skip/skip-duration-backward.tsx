import React from "react";
import { FaBackward } from "react-icons/fa";
interface PropsSKipDuration {
  SkipDurationStyle: React.CSSProperties;
  skipBackwardFunction?: any;
}

const SkipDurationBack = (props: PropsSKipDuration) => {
  return (
    <div style={props.SkipDurationStyle} onClick={() =>  props.skipBackwardFunction(10)}>
      <FaBackward />
      <span>10 seconds</span>
    </div>
  );
};

export default SkipDurationBack;
