import React from "react";
import Navbar from "@/components/ayurlearn/Navbar";
import videos from "@/utils/videos";
import VideoCard from "@/components/ayurlearn/VideoCard";

const Modules = () => {
  return (
    <div className="modules">
      <Navbar link={"videos"} />
      <div className="container w-full flex flex-col ">
        <h1 className="learn_heading">Video Modules</h1>

        <div className="flex flex-row ">
          <div className="prompt_layout">
            {videos.map((module) => (
              <VideoCard
                number={module.number}
                color={module.color}
                title={module.title}
                link={module.link}
                description={module.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modules;
