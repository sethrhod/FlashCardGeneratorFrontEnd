import { LanguageLevel } from "@/models/apiClient";
import { useSideBarContext } from "@/models/Contexts";
import DisplayLevel from "@/scripts/language-level-converter";
import { ChevronDown } from "lucide-react";

import React, {useState} from "react";

export default function FilterOptions() {
  const [open, setOpen] = useState(false);
  const sidebarContext = useSideBarContext();

  const handleLevelClick = (level: LanguageLevel) => {
    sidebarContext.setFilterOptions({
      ...sidebarContext.filterOptions,
      LanguageLevel:
        sidebarContext.filterOptions.LanguageLevel === level ? null : level,
    });
  };

  

  return (
    <div className="bg-gray-700 p-4 shadow-md text-gray-300 hover:shadow-xl hover:text-blue-300 cursor-pointer transition-shadow duration-300 ease-in-out rounded-lg">
      <h2 onClick={() => setOpen(!open)}>
        Filter Options{" "}
        <span>
          {open ? <ChevronDown className="inline-block ml-1 rotate-180" size={16} /> : <ChevronDown className="inline-block ml-1" size={16} />}
        </span>
      </h2>
      <ul className="flex flex-col inset-shadow-sm rounded-lg overflow-auto bg-gray-800 max-h-96 transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "400px" : "0", overflowY: open ? "auto" : "hidden", marginTop: open ? "0.5rem" : "0", opacity: open ? 1 : 0 }}
      >
        {Object.values(LanguageLevel)
          .filter((value) => !isNaN(Number(value)))
          .map((value) => (
            <li
              key={value}
              onClick={() => handleLevelClick(value as LanguageLevel)}
              className="flex items-center justify-between p-2 border-b-2 border-b-gray-700 hover:bg-gray-700 cursor-pointer"
            >
              <span className="text-gray-300">
                {DisplayLevel(value as LanguageLevel)}
              </span>
              <input
                type="checkbox"
                readOnly
                checked={sidebarContext.filterOptions.LanguageLevel == value}
                className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
