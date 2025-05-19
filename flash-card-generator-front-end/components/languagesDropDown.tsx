"use client";
import React, { useState } from "react";
import { Language } from "@/models/apiClient";

interface DropdownProps {
  languages: Language[];
  formName: string;
}

export default function Dropdown(props: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen((old) => !old);
  };

  return (
    <>
      <div className="relative">
        <select
          id="languages"
          name={props.formName}
          required={true}
          className="block w-full p-2 bg-gray-800 text-gray-300 rounded-md border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
        >
          {props.languages.map((languageObj) => {
            const language = Language.fromJS(languageObj);
            return (
              <option
                value={language.textCode}
                key={language.enumCode}
              >
                {language.textCode}
              </option>
            );
          })}
        </select>
      </div>
      {isOpen ? (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black/40"
          onClick={toggle}
        ></div>
      ) : (
        <></>
      )}
    </>
  );
}
