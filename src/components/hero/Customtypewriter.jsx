"use client"
import React from "react";
import { Typewriter } from "react-simple-typewriter";

function Customtypewriter() {
  return (
    <Typewriter
      words={[
        "Innovative Solutions",
        "Secure Transactions",
        "AI-Powered Systems",
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
