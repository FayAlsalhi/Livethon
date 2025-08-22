"use client";

import React from "react";

type TimelineStage = {
  date: string;
  month: string;
  title: string;
  description: string;
  secondLine?: string;
  highlight?: string | null;
  highlightText?: string;
  position: "left" | "right" | "center";
};

export function Timeline({ stages }: { stages: TimelineStage[] }) {
  return (
    <div className="max-w-5xl mx-auto relative">
      {/* Central dashed line */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-[48px] sm:bottom-[64px] w-1"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.9) 66.6%, transparent 33.3%)",
          backgroundSize: "100% 50px",
        }}
      ></div>

      {stages.map((stage, index) => {
        const isLeft = stage.position === "left";
        const isCenter = stage.position === "center";

        return (
          <div
            key={index}
            className={`relative mb-16 py-10 sm:flex sm:items-center ${
              isCenter ? "sm:justify-center" : ""
            }`}
          >
            {/* Content Card */}
            <div
              className={`w-[90%] sm:w-5/12 ${
                isCenter
                  ? "mx-auto"
                  : isLeft
                  ? "sm:mr-auto sm:ml-8 mx-auto"
                  : "sm:ml-auto sm:mr-8 mx-auto"
              } border-[3px] border-[#C0B7E8] rounded-[25px]`}
            >
              <div
                className={`p-6 rounded-[25px] relative ${
                  isCenter ? "pt-12" : ""
                }`}
                style={{
                  background: "rgba(52, 48, 69, 0.8)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
                }}
              >
                {/* Mobile date badge */}
                <div className="sm:hidden flex justify-center -mt-10 mb-2 ">
                  <div
                    className="w-16 h-16 rounded-full flex flex-col items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #C8B6FF 0%, #8176AF 100%)",
                      boxShadow: "0 0 0 6px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <span className="text-2xl font-bold text-[#343045]">
                      {stage.date}
                    </span>
                    <span className="text-xs text-[#343045]">
                      {stage.month}
                    </span>
                  </div>
                </div>

                <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 border-b-2 border-[#B9D440] text-center">
                  {stage.title}
                </h4>
                <p className="text-gray-300 text-md sm:text-lg md:text-xl lg:text-xl xl:text-2xl mt-10 text-center">
                  {stage.description}
                </p>
                {stage.secondLine && (
                  <p
                    className={`text-md sm:text-lg md:text-xl lg:text-xl xl:text-2xl mt-3 text-center ${
                      isCenter ? "text-[#B9D440]" : "text-gray-300"
                    }`}
                  >
                    {stage.secondLine}
                    {stage.highlight && (
                      <>
                        {" "}
                        <span className="px-3 py-1 rounded-full text-[#FFD230] font-bold text-4xl text-center">
                          {stage.highlight}
                        </span>
                        {" "}
                        {stage.highlightText}
                      </>
                    )}
                  </p>
                )}
                {!stage.secondLine && stage.highlight && (
                  <p className="text-gray-300 text-base text-center">
                    <span className="px-3 py-1 rounded-full text-[#FFD230] font-bold text-4xl text-center">
                      {stage.highlight}
                    </span>
                    {" "}
                    {stage.highlightText}
                  </p>
                )}
              </div>
            </div>

            {/* Date Circle (hidden on mobile) */}
            <div
              className={`hidden sm:block absolute left-1/2 z-10 ${
                isCenter
                  ? "top-0 -translate-x-1/2 -translate-y-1/2"
                  : "top-1/2 -translate-x-1/2 -translate-y-1/2"
              }`}
            >
              <div
                className="w-30 h-30 rounded-full flex flex-col items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #C8B6FF 0%, #8176AF 100%)",
                  boxShadow: "0 0 0 10px rgba(0, 0, 0, 0.32)",
                }}
              >
                <span className="text-4xl font-bold text-[#343045]">
                  {stage.date}
                </span>
                <span className="text-2xl text-[#343045]">{stage.month}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Timeline;


