"use client";

import React from "react";
import VariantsComponent from "@/components/common/VariantsComponent";
import { Link } from "@nextui-org/react";
// import Earth from "@/components/common/Earth";
import dynamic from "next/dynamic";

const AboutSection = () => {
  const Earth = dynamic(() => import("@/components/common/Earth"), {
    ssr: false,
  });
  return (
    <section
      id="about"
      className="w-full flex flex-col lg:flex-row mt-16 md:mt-32 relative h-fit md:h-screen"
    >
      <div className="w-full lg:w-1/2 h-96 md:h-full lg:-translate-x-32">
        <VariantsComponent
          direction="x"
          startDistance={-100}
          delay={0.1}
          className="w-full h-full"
        >
          <Earth />
        </VariantsComponent>
      </div>
      <div className="flex flex-col w-full lg:w-1/2 justify-center px-4 md:px-16 max-w-screen-2xl mx-auto">
        <VariantsComponent direction="x" startDistance={-100} delay={0.2}>
          <p className="uppercase text-primary text-xs">About us</p>
        </VariantsComponent>
        <h1 className="text-primary text-4xl md:text-5xl font-semibold">
          <VariantsComponent direction="x" startDistance={-100} delay={0.3}>
            <b className="text-hightLight font-semibold leading-normal">
              What Is
            </b>
          </VariantsComponent>
          <VariantsComponent direction="x" startDistance={-100} delay={0.5}>
            <b className="text-primary font-semibold">The Binary Network?</b>
          </VariantsComponent>
        </h1>
        <VariantsComponent direction="x" startDistance={-100} delay={0.7}>
          <p className="w-full lg:w-3/5 text-base lg:text-xl mt-5 md:mt-10">
            The Binary Network is a Layer 2 solution built by The Binary
            Holdings on OP Stack. It serves as a bridge between Web2 and Web3,
            integrating directly into telco and banking applications. This
            integration supports the development and deployment of dApps used by
            over 40 million users.
          </p>
        </VariantsComponent>
        <VariantsComponent direction="x" startDistance={-100} delay={0.8}>
          <Link
            href="https://docs.thebinaryholdings.com/"
            target="_blank"
            className="mt-5 md:mt-10 underline text-xs w-fit"
          >
            Read Our Documentation
          </Link>
        </VariantsComponent>
      </div>
    </section>
  );
};

export default AboutSection;
