import React from "react";
import { useCalendlyEventListener, InlineWidget } from "react-calendly";
import { useRouter } from "next/router";

const calendy = () => {
  const router = useRouter();

  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: (e) => router.push("/appointment/select-document"),
  });

  return (
    <div className="App">
      <InlineWidget url="https://calendly.com/ghosalkarharsh454" />
    </div>
  );
};

export default calendy;
