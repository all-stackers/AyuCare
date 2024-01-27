import React from "react";
import { useCalendlyEventListener, InlineWidget } from "react-calendly";

const calendy = () => {
  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: (e) => console.log(e.data.payload),
  });

  return (
    <div className="App">
      <InlineWidget url="https://calendly.com/ghosalkarharsh454" />
    </div>
  );
};

export default calendy;