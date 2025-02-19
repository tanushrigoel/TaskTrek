import React from "react";

function Hero() {
  return (
    <div>
      <div
        className="py-[72px] relative overflow-clip px-6"
        style={{
          background:
            "linear-gradient(to bottom, #000, #200D42 34%, #4F21A1 65%, #A46EDB 82%)",
        }}
      >
        <div className="container">
          <h1 className="text-7xl font-bold tracking-tighter text-center mt-8">
            One Task at a Time
          </h1>
          <p className="text-center text-xl mt-8 max-w-2xl mx-auto">
            Celebrate the joy of accomplishment with an app designed to track
            progress, motivate your efforts, and celebrate your successes
          </p>
          <div className="flex justify-center mt-8">
            <button className="bg-white text-black py-3 px-5 rounded-lg font-medium">
              Get for free
            </button>
          </div>
        </div>
      </div>
      {/* <div
        className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-[50%]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0) 40%, #A46EDB 75%, #4F21A1 100%)",
          boxShadow: "inset 0 0 80px 60px rgba(148, 64, 237, 0.3)",
          filter: "blur(60px)",
          opacity: 0.9,
        }}
      ></div> */}
    </div>
  );
}

export default Hero;
