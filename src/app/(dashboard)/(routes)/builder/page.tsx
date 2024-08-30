"use client";

import { useState } from "react";
import HeroSlider from "@/components/elements/HeroSlider/HeroSlider";
import StickyScrollRevealDemo from "@/components/elements/StickyScrollReveal/StickyScrollReveal";
import CardHoverEffect from "@/components/elements/CardHoverEffect/CardHoverEffect";
import PromptBar from "@/components/ui/prompt-bar";

const componentsMap: { [key: string]: any } = {
  HeroSlider: {
    JSXelement: (title: string) => <HeroSlider images={[]} title={title} />,
    images: [],
    title: "This is hero section",
  },
  CardHoverEffect: {
    JSXelement: () => (
      <CardHoverEffect
        projects={[
          { title: "Stripe", description: "Money", link: "stripe.com" },
        ]}
      />
    ),
  },
};

const renderComponents = ["HeroSlider", "CardHoverEffect"];
const finalResult = [];

const Page = () => {
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState(componentsMap.HeroSlider?.title || "");

  return (
    <div className="flex">
      <div className="w-[350px]">
        <div>Components sidebar</div>
        {componentsMap.HeroSlider?.title !== undefined && (
          <input
            type="text"
            className="text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        )}
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
