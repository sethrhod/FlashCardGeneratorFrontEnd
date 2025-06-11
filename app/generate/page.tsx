'use client';
import Dropdown from "@/components/languagesDropDown";
import { useLanguagesContext, useSideBarContext } from "@/models/Contexts";
import React, { useActionState, useEffect } from "react";
import handleGenerationRequestSubmission from "../actions/handleGenerationRequestSubmission";
import { useSession } from "next-auth/react";

const initialState = {
  message: '',
  token: '',
}

export default function Generate() {
  const session = useSession();
  initialState.token = session.data?.accessToken || '';
  const [state, formAction, pending] = useActionState(handleGenerationRequestSubmission, initialState);

    const languagesContext = useLanguagesContext();
    const sidebarState = useSideBarContext();
  
    useEffect(() => {
      sidebarState.setDeckOptionsVisible(false);
      sidebarState.setFilterOptionsVisible(false);
      sidebarState.setHeader("Generate Deck");
    }, []);
  
    return (
          <>
            <form action={formAction} className="flex flex-col gap-4 justify-center items-center p-4">
              <p className="text-gray-500">
                Generate a new deck based on the selected filters and options.
              </p>
              <p aria-live="polite">{state?.message}</p>
              <div className="justify-center items-center p-4">
                <div className="flex flex-col m-6">
                  <label htmlFor="deck-name" className="md:text-2xl font-semibold mb-1">
                    Deck Name
                  </label>
                  <input
                    required={true}
                    type="text"
                    id="deck-name"
                    name="deck-name"
                    className="border border-gray-300 rounded-md p-2"
                    placeholder="Enter deck name"
                  />
                </div>
                <div className="flex flex-col m-6">
                  <label htmlFor="original-language" className="md:text-2xl font-semibold mb-1">
                    Original Language
                  </label>
                  <Dropdown
                    languages={languagesContext.availableLanguages}
                    formName="original-language"
                  />
                </div>
                <div className="flex flex-col m-6">
                  <label htmlFor="target-language" className="md:text-2xl font-semibold mb-1">
                    Target Language
                  </label>
                  <Dropdown
                    languages={languagesContext.availableLanguages}
                    formName="target-language"
                  />
                </div>
                <div className="flex flex-col m-6">
                  <label htmlFor="language-level" className="md:text-2xl font-semibold mb-1">
                    Language Level
                  </label>
                  <select
                    id="language-level"
                    name="language-level"
                    required={true}
                    className="block w-full p-2 bg-gray-800 text-gray-300 rounded-md border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                  >
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                disabled={pending}
                className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
              >
                Generate Deck
              </button>
            </form>
          </>
    );
}
