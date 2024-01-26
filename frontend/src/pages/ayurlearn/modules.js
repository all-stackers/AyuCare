import React from "react";
import Navbar from "@/components/ayurlearn/Navbar";
import ModuleCard from "@/components/ayurlearn/ModuleCard";
import modules from "@/utils/modules";

const Modules = (text) => {
  

  return (
    <div className="modules">
      <Navbar link={"modules"} />
      <div className="container w-full flex flex-col ">
        <h1 className="learn_heading">Modules</h1>

        <div className="flex flex-row ">
          <div className="prompt_layout">
            {modules.map((module) => (
              <ModuleCard
                number={module.number}
                color={module.color}
                title={module.title}
                content={module.content}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modules;
