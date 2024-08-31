import React from "react";
import RearrangeComponents from "./rearrange-components";

const Sidebar = ({ renderComponents, setRenderComponents }) => {
  return (
    <div>
      <div className="w-[350px] flex flex-col bg-neutral-900 h-screen">
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
          <div onClick={() => getComponentsFromLLM("Make a dev")}>call llm</div>
        </div> */}
        <div className="font-bold flex justify-center p-4">
          Rearrange Components
        </div>
        {
          <RearrangeComponents
            list={renderComponents}
            setRenderComponents={setRenderComponents}
          />
        }
      </div>
    </div>
  );
};

export default Sidebar;
