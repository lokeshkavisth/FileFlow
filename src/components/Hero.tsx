import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Spotlight from "./ui/spotlight";

const Hero: React.FC = () => {
  return (
    <div className="w-full  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-background bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <section className="py-20 lg:py-0 lg:min-h-screen  grid place-items-center">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Storing everything for you and your business needs.
            </h1>
            <p className="max-w-2xl mb-6 font-light  lg:mb-8 md:text-lg lg:text-xl ">
              Easy to use, reliable, private, and secure. It’s no wonder
              FileFlow is the choice for storing and sharing your most important
              files.
            </p>
            <Button>
              <Link href="/dashboard" className="flex items-center gap-4">
                Get started
                <ArrowRightIcon />
              </Link>
            </Button>
          </div>
          <div className="mt-10 lg:mt-0 lg:col-span-5 lg:flex">
            <video loop autoPlay muted controls={false} className="rounded-lg">
              <source
                src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
