"use client";

import { useEffect, useState } from "react";
import HeroSlider from "@/components/elements/HeroSlider/HeroSlider";
import StickyScrollRevealDemo from "@/components/elements/StickyScrollReveal/StickyScrollReveal";
import CardHoverEffect from "@/components/elements/CardHoverEffect/CardHoverEffect";
import PromptBar from "@/components/ui/prompt-bar";
import RearrangeComponents from "@/components/site/rearrange-components";
import { SpotlightPreview } from "@/components/elements/Spotlight/Spotlight";
import { BentoGridThirdDemo } from "@/components/elements/BentoGrid/bentogrid";
import { TimelineDemo } from "@/components/elements/TimelineScroll/TimelineScroll";
import { BackgroundBeamsDemo } from "@/components/elements/BackgroundBeam/BackgroundBeam";
import { CoverDemo } from "@/components/elements/CoverHeading/CoverHeading";
import { FaPlus } from "react-icons/fa";

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
    JSXelement: () => <BentoGridThirdDemo />,
  },
  // stickyscrollreveal: {
  //   JSXelement: () => <StickyScrollRevealDemo />,
  // },
  timelinescroll: {
    JSXelement: () => <TimelineDemo />,
  },
  backgroundbeams: {
    JSXelement: () => <BackgroundBeamsDemo />,
  },
};

const Page = () => {
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState(componentsMap.HeroSlider?.title || "");
  const [list, setList] = useState<string[]>([]); //    "spotlight","bentogrid","timelinescroll","backgroundbeams",
  const [renderComponents, setRenderComponents] = useState(list);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollToBottomSlowly = () => {
    const scrollHeight = document.body.scrollHeight;
    const scrollStep = 10; // Adjust the step size for slower or faster scrolling
    const scrollInterval = 10; // Adjust the interval for smoother scrolling

    const scrollIntervalId = setInterval(() => {
      const currentScroll = window.scrollY;
      if (currentScroll + window.innerHeight < scrollHeight) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollIntervalId);
      }
    }, scrollInterval);
  };
  useEffect(() => {
    if (currentIndex < renderComponents.length) {
      scrollToBottomSlowly();
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      // Scroll to the bottom at the end of the rendering process
      scrollToBottomSlowly();
    }
  }, [currentIndex, renderComponents.length]);

  const getComponentsFromLLM = async (prompt: string) => {
    const response = await fetch("/api/llm");
    if (!response.ok) {
      throw new Error("Error while fetching response");
    }
    const result: { list: string } = await response.json();

    // Remove any unwanted characters like newlines and extra quotes
    const components_list: string = result.list.trim().replace(/["]/g, "");

    // Split the string by commas to create an array of components
    const list = components_list.split(",").map((item) => item.trim());

    setRenderComponents(list);
    setList(list);
  };

  return (
    <div className="flex">
      <div className="w-[350px] flex flex-col bg-neutral-900 h-screen">
        <div className="font-bold text-2xl flex justify-center p-4">
          Rearrange Components
        </div>
        {
          <RearrangeComponents
            list={renderComponents}
            setRenderComponents={setRenderComponents}
          />
        }
      </div>
      <div className="flex-grow">
        {renderComponents.length !== 0 ? (
          <>
            {renderComponents.slice(0, currentIndex).map((componentsKey) => (
              <div key={componentsKey}>
                {componentsMap[componentsKey].JSXelement(
                  componentsMap[componentsKey].title ? title : undefined
                )}
              </div>
            ))}
            {currentIndex < renderComponents.length && (
              <div className="flex items-center justify-center h-[50vh]">
                <div className="loading-animation">Loading...</div>
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center h-screen">
            <div className="border-dotted border-4 rounded-3xl border-gray-500 border-opacity-50 ml-4 mr-4 mt-4 mb-4">
              <CoverDemo />
              <div className="flex justify-center opacity-50">
                <FaPlus size={32} color="white" />
              </div>
            </div>
          </div>
        )}
      </div>
      <PromptBar getComponentsFromLLM={getComponentsFromLLM} />
    </div>
  );
};

export default Page;
