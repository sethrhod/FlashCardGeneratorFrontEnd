"use client";
import React, { useEffect } from "react";
import { IDeck } from "@/lib/apiClient";
import Card from "./flashCard";
import { useSideBarContext } from "@/models/Contexts";

interface deckProps {
  deck: IDeck | null;
}

export default function Deck(props: deckProps) {
  const sidebarState = useSideBarContext();

  useEffect(() => {
    sidebarState.setDeckOptionsVisible(false);
    sidebarState.setFilterOptionsVisible(false);
    sidebarState.setHeader(props.deck?.name || "Deck Details");
  }, []);

  return (
    <ul className="flex flex-col items-center w-full mt-4">
      {props.deck?.flashCards?.map((c) => (
        <li key={c.id} className="mb-4 w-full h-full flex justify-center">
          <Card card={c} />
        </li>
      ))}
    </ul>
  );
}
