"use client"
import React from "react";
import { Typewriter } from "react-simple-typewriter";

function Customtypewriter() {
  return (
    <Typewriter
      words={[
        "Innovative Solution",
        "Secure Transactions",
        "AI-Powered System",
      ]}
      loop={true}
      cursor
      cursorStyle="_"
      typeSpeed={80}
      deleteSpeed={50}
      delaySpeed={2000}
    />
  );
}

export default Customtypewriter;
