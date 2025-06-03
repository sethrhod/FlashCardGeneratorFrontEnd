"use client";
import React from "react";
import FilterOptions from "./filterOptions";
import LoginComponent from "./loginComponent";
import NavOptions from "./navComponent";

export default function Sidebar() {
  return (
    <aside
      id="sidebar"
      className="flex flex-col h-screen p-4 bg-gray-800 shadow-md"
    >
      <NavOptions />
      <FilterOptions />
      <LoginComponent />
    </aside>
  );
}
