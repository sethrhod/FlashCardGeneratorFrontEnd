'use client';
import React from "react";
import {useSideBarContext} from "@/models/Contexts";
import { LanguageLevel } from "@/models/apiClient";

export default function Sidebar() {

  const sidebarContext = useSideBarContext();

  const handleLevelClick = (level: LanguageLevel) => {
      sidebarContext.setFilterOptions({
        ...sidebarContext.filterOptions,
        LanguageLevel:
          sidebarContext.filterOptions.LanguageLevel === level ? null : level,
      });
    }

  const displayLevel = (level: LanguageLevel) => {
    switch (level) {
      case LanguageLevel._0:
        return "A1";
      case LanguageLevel._1:
        return "A2";
      case LanguageLevel._2:
        return "B1";
      case LanguageLevel._3:
        return "B2";
      case LanguageLevel._4:
        return "C1";
      case LanguageLevel._5:
        return "C2";
      default:
        return "Unknown Level";
    }
  }

  return (
    <aside id="sidebar" className="flex flex-col p-4 bg-gray-800 shadow-md">
      <h1 className="text-2xl font-black leading-8 text-blue-300">AnkiGPT</h1>
      <nav className="flex flex-col gap-4 mt-4">
        <a href="/">Home</a>
        <a href="/decks">Decks</a>
      </nav>
      <ul className="flex flex-col mt-4">
        <li>
          <h2 className="text-lg font-bold text-gray-300">Filter Options</h2>
        </li>
        {Object.values(LanguageLevel)
          .filter((value) => !isNaN(Number(value))).map((value) => (
          <li key={value} onClick={() => handleLevelClick(value as LanguageLevel)} className="flex items-center justify-between p-2 bg-gray-700 rounded-md mb-2 hover:bg-gray-600 cursor-pointer">
            <span className="text-gray-300">{displayLevel(value as LanguageLevel)}</span>
            <input
              type="checkbox"
              readOnly
              checked={sidebarContext.filterOptions.LanguageLevel == value}
              className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
            />
          </li>
        ))}
      </ul>
    </aside>
  );
}