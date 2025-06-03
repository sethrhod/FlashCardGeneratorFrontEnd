"use client";
import { IBackView, IFlashCard, IFrontView } from "@/lib/apiClient";
import LanguageLevelConverter from "@/scripts/language-level-converter";
import FindLanguageName from "@/scripts/language-name-finder";
import { useState } from "react";

type CardProps = {
  card: IFlashCard;
};

export default function Card({ card }: CardProps) {
  var [visibleFace, setVisibleFace] = useState(true);

  function Face(face: IFrontView | IBackView) {
    return (
      <div className="absolute flex flex-col items-center w-full h-full justify-between p-4 bg-white shadow-md rounded-lg text-black">
        <p className="self-start">{LanguageLevelConverter(card.level)}</p>
        <p className="text-2xl">{face.text}</p>
        <div className="flex flex-row w-full items-center justify-between">
          <div>
            <p>{FindLanguageName(face.language.textCode)}</p>
            {face.region ?? <p>{face.region}</p>}
          </div>
          <button
            className="mt-2 p-2 bg-blue-500 text-white rounded"
            onClick={() => setVisibleFace(!visibleFace)}
          >
            Flip
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex flex-col items-center w-[500px] h-[300px]">
      {visibleFace ? (
        <Face
          text={card.frontView.text}
          language={card.frontView.language}
          region={card.frontView.region}
        />
      ) : (
        <Face
          text={card.backView.text}
          language={card.backView.language}
          region={card.backView.region}
        />
      )}
    </div>
  );
}
