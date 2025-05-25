"use client";
import React from "react";
import { useSideBarContext } from "@/models/Contexts";
import { LanguageLevel } from "@/models/apiClient";
import DisplayLevel from "@/scripts/language-level-converter";
import { GoogleLogin } from "@react-oauth/google";
import handleThirdPartyLoginResponse from "@/scripts/handle-third-party-login-response";

export default function Sidebar() {
  const sidebarContext = useSideBarContext();

  const handleLevelClick = (level: LanguageLevel) => {
    sidebarContext.setFilterOptions({
      ...sidebarContext.filterOptions,
      LanguageLevel:
        sidebarContext.filterOptions.LanguageLevel === level ? null : level,
    });
  };

  return (
    <aside
      id="sidebar"
      className="flex flex-col h-screen p-4 bg-gray-800 shadow-md"
    >
      <nav className="flex flex-col gap-4">
        <h1 className="text-2xl font-black leading-8 text-blue-300">
          <a href="/">AnkiGPT</a>
        </h1>
        <a href="/generate" className="text-gray-300 hover:text-blue-300">
          Generate deck
        </a>
      </nav>
      <ul className="flex flex-col mt-4">
        <li>
          <h2 className="text-lg font-bold text-gray-300">Filter Options</h2>
        </li>
        {Object.values(LanguageLevel)
          .filter((value) => !isNaN(Number(value)))
          .map((value) => (
            <li
              key={value}
              onClick={() => handleLevelClick(value as LanguageLevel)}
              className="flex items-center justify-between p-2 bg-gray-700 rounded-md mb-2 hover:bg-gray-600 cursor-pointer"
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
      <div className="flex h-full mb-4 items-end text-gray-300">
        {sidebarContext.user ? (
          <div className="flex flex-col space-y-4">
            <p>Welcome, {sidebarContext.user.userName}</p>
            <p>Email: {sidebarContext.user.email}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <p>Please log in to access your account.</p>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleThirdPartyLoginResponse(
                  credentialResponse,
                  sidebarContext.setUser,
                  sidebarContext.setError
                );
              }}
              onError={() => {
                sidebarContext.setError("Failed to log in with Google.");
              }}
            />
          </div>
        )}
        {sidebarContext.Error && <>{sidebarContext.Error}</>}
      </div>
    </aside>
  );
}
