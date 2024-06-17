import React, { useEffect, useRef, useState } from "react";
import Utility from "../../service/utility";

const TimelineComponent: React.FC<{
  videoReference: React.RefObject<HTMLVideoElement>;
}> = ({ videoReference }) => {
  const timelineRef = useRef<any>(null);
  const timeLineContainerRef = useRef<any>();
  const labelRef = useRef<any>();
  const [label, setLabel] = useState("");
  const [segments, setSegments] = useState([
    { start: 0, end: 30, label: "Introduction" },
    { start: 30, end: 70, label: "Basic Concepts" },
    { start: 70, end: 120, label: "Coding Examples" },
    { start: 120, end: 160, label: "Error Handling" },
    { start: 160, end: 200, label: "Optimizing Performance" },
    { start: 200, end: 240, label: "Testing Strategies" },
    { start: 240, end: 290, label: "Frameworks Overview" },
    { start: 290, end: 340, label: "Deployment Strategies" },
    { start: 340, end: 390, label: "Security Measures" },
    { start: 390, end: 596, label: "Conclusion and Q&A" },
  ]);

  const segmentHandler = (): void => {  
    if (videoReference && videoReference.current != null) {
      segments.forEach((each) => {
        const segmentDiv = document.createElement("div");
        const previewEle = document.createElement("div");
        const progressEle = document.createElement("div");
        segmentDiv.classList.add("timeline-segments");
        previewEle.classList.add("timeline-segments-preview");
        progressEle.classList.add("timeline-segments-progress");

        segmentDiv.style.width = `${
          ((each.end - each.start) / (videoReference.current?.duration || 1)) *
            100 -
          0.2
        }%`;

        segmentDiv.appendChild(previewEle);
        segmentDiv.appendChild(progressEle);
        timelineRef.current.appendChild(segmentDiv);
      });
    }
  };

  function progessTimeline(): void {
    const progressEles: any = document.querySelectorAll(
      ".timeline-segments-progress"
    );

    segments.forEach((each, index) => {
      if (videoReference.current != null) {
        if (each.end > videoReference.current.currentTime) {
          progressEles[index].style.right =
            ((each.end - videoReference.current.currentTime) /
              (each.end - each.start)) *
              100 +
            "%";
        } else {
          progressEles[index].style.right = 0;
        }
      }
    });
  }

  const UpdateTimeLinePreview = (preview_position: number) => {
    const previewEles: any = document.querySelectorAll(
      ".timeline-segments-preview"
    );

    preview_position != 0 &&
      segments.forEach((each, index) => {
        if (videoReference.current != null) {
          if (each.end > preview_position * videoReference.current.duration) {
            if (previewEles[index]) {
              previewEles[index].style.right =
                ((each.end -
                  preview_position * videoReference.current.duration) /
                  (each.end - each.start)) *
                  100 +
                "%";
            }
          } else {
            if (previewEles[index]) {
              previewEles[index].style.right = 0;
            }
          }
        }
      });
  };

  const changeCurrentTimeOnClick = (e: any) => {
    if (videoReference.current != null) {
      const rect = timeLineContainerRef.current.getBoundingClientRect();
      const duration = videoReference.current.duration;
      const minWidth = Math.min(Math.max(0, e.x - rect.x), rect.width);
      const percent = minWidth / rect.width;
      videoReference.current.currentTime = percent * duration;
    }
  };

  function previewViaMouseOverOrMove(e: any): number {
    const rect = timeLineContainerRef.current.getBoundingClientRect();
    const minWidth = Math.min(Math.max(0, e.x - rect.x), rect.width);
    const percent = minWidth / rect.width;
    return percent;
  }

  function previewViaBuffer(): number {
    if (videoReference.current == null) return 0;
    const bufferedRanges = videoReference.current.buffered;
    const percent = bufferedRanges.end(0) / videoReference.current.duration;
    return percent;
  }

  function setCurrentLabel(preview_position: any) {
    if (videoReference.current) {
      let currentPos = preview_position * videoReference.current.duration;
      preview_position != 0 &&
        segments.forEach((each, index) => {
          if (each.start < currentPos && each.end > currentPos) {
            setLabel(each.label);
          }
        });

      labelRef.current.innerHTML = `<div>${label}</div> <div>${Utility.formatTime(
        preview_position * videoReference.current.duration
      )}</div>`;
    }
  }

  function updateTimeline(e: any) {
    let preview_position = 0;

    switch (e.type) {
      case "timeupdate": {
        progessTimeline();
        preview_position = previewViaBuffer();
        break;
      }

      case "click": {
        changeCurrentTimeOnClick(e);
        break;
      }

      case "mousemove": {
        preview_position = previewViaMouseOverOrMove(e);
        labelRef.current.style.setProperty("--label-percent", preview_position);
        labelRef.current.style.setProperty(
          "--label-width",
          labelRef.current.offsetWidth / 2
        );
        setCurrentLabel(preview_position);

        break;
      }

      default: {
        break;
      }
    }

    UpdateTimeLinePreview(preview_position);
  }

  useEffect(() => {
    const videoElement = videoReference.current;
    const timelineContainerElement = timeLineContainerRef.current;
    if (videoElement) {
      videoElement.addEventListener("loadedmetadata", segmentHandler);
      videoElement.addEventListener("timeupdate", updateTimeline);
      timelineContainerElement.addEventListener("click", updateTimeline);
      timelineContainerElement.addEventListener("mousemove", updateTimeline);
    }
    return () => {
      videoElement?.removeEventListener("loadedmetadata", segmentHandler);
      videoElement?.removeEventListener("timeupdate", updateTimeline);
      timelineContainerElement.removeEventListener("click", updateTimeline);
      timelineContainerElement.removeEventListener ("mousemove", updateTimeline);
    };
  }, [segmentHandler, updateTimeline]);

  return (
    <div className="timeline-container" ref={timeLineContainerRef}>
      <div className="timeline" ref={timelineRef}>
        <div className="timeline-label" ref={labelRef}>
          0:00
        </div>
      </div>
    </div>
  );
};

export default TimelineComponent;
