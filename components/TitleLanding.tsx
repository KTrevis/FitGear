import React from "react";
import "@/app/style/style.css";

const TitleLanding = () => {
  return (
    <>
      <div className="mainTitle inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/20 to-white/80">
		Parlez à notre <br /> vendeur virtuel
        </p>
      </div>
    </>
  );
};

export default TitleLanding;
