import React from "react";
import { FaForward } from "react-icons/fa";
interface PropsSKipDuration {
  SkipDurationStyle: React.CSSProperties;
  skipForwardFunction: any;
}

const SkipDurationForward = (props: PropsSKipDuration) => {
  return (
    <div style={props.SkipDurationStyle} onClick={() =>  props.skipForwardFunction(10)}>
      <FaForward />
      <span className="sr-only">10 seconds</span>
    </div>
  );
};

export default SkipDurationForward;
