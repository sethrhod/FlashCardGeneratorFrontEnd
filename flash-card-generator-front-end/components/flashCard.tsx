'use client'
import { IFlashCard } from "@/models/apiClient";

type CardProps = {
  card: IFlashCard;
};

export default function Card({card} : CardProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center w-full justify-between p-4 bg-white shadow-md rounded-lg text-black">
        <div className="flex flex-row items-center">
          <p>{card.level}</p>
          <p>{card.frontView.language.textCode}</p>
          <p>{card.frontView.region}</p>
        </div>
        <p>{card.frontView.text}</p>
      </div>
      <div className="flex flex-col items-center w-full justify-between p-4 bg-white shadow-md rounded-lg text-black">
        <div className="flex flex-row items-center">
          <p>{card.backView.language.textCode}</p>
          <p>{card.backView.region}</p>
        </div>
        <p>{card.backView.text}</p>
    </div>
    </div>
  );
}