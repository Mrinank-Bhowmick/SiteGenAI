"use client";

import { useState } from "react";
import HeroSlider from "@/components/elements/HeroSlider/HeroSlider";
import StickyScrollRevealDemo from "@/components/elements/StickyScrollReveal/StickyScrollReveal";
import CardHoverEffect from "@/components/elements/CardHoverEffect/CardHoverEffect";
import PromptBar from "@/components/ui/prompt-bar";
import RearrangeComponents from "@/components/site/rearrange-components";
import { SpotlightPreview } from "@/components/elements/Spotlight/Spotlight";
import { BentoGridDemo } from "@/components/elements/BentoGrid/bentogrid";
import { TimelineDemo } from "@/components/elements/TimelineScroll/TimelineScroll";
import { BackgroundBeamsDemo } from "@/components/elements/BackgroundBeam/BackgroundBeam";

const componentsMap: { [key: string]: any } = {
  heroslider: {
    JSXelement: (title: string) => <HeroSlider images={[]} title={title} />,
    images: [],
    title: "This is hero section",
  },
  cardhovereffect: {
    JSXelement: () => (
      <CardHoverEffect
        projects={[
          { title: "Stripeo", description: "Money", link: "stripecom" },
          { title: "Stripe", description: "Money", link: "stripcom" },
          { title: "Stripee", description: "Money", link: "stripe.com" },
        ]}
      />
    ),
  },
  spotlight: {
    JSXelement: () => <SpotlightPreview />,
  },
  bentogrid: {
    JSXelement: () => <BentoGridDemo />,
  },
  stickyscrollreveal: {
    JSXelement: () => <StickyScrollRevealDemo />,
  },
  timelinescroll: {
    JSXelement: () => <TimelineDemo />,
  },
  backgroundbeams: {
    JSXelement: () => <BackgroundBeamsDemo />,
  },
};

const finalResult = [];

const Page = () => {
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState(componentsMap.HeroSlider?.title || "");
  const list = ["spotlight", "timelinescroll", "bentogrid", "backgroundbeams"];
  const [renderComponents, setRenderComponents] = useState(list);

  const rearrange = () => {
    setRenderComponents((prev) => {
      const newComponents = [...prev];
      newComponents.pop();
      return newComponents;
    });
  };

  return (
    <div className="flex">
      <div className="w-[300px] flex flex-col">
        {/* <div>Components sidebar</div>
        {componentsMap.HeroSlider?.title !== undefined && (
          <input
            type="text"
            className="text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        )} */}
        {/* <div>
          <button onClick={rearrange}>RearrangeButton</button>
        </div> */}
        <div className="font-bold flex justify-center p-4">
          Rearrange Components
        </div>
        <RearrangeComponents
          list={renderComponents}
          setRenderComponents={setRenderComponents}
        />
      </div>
      <div className="flex-grow">
        {renderComponents.map((componentsKey) => (
          <div key={componentsKey}>
            {componentsMap[componentsKey].JSXelement(
              componentsMap[componentsKey].title ? title : undefined
            )}
          </div>
        ))}
      </div>
      <PromptBar />
    </div>
  );
};

export default Page;
