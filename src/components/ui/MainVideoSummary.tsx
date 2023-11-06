import { Chapter, Unit } from "@prisma/client";
import React from "react";

type Props = {
  chapter: Chapter;
  unit: Unit;
  unitIndex: number;
  chapterIndex: number;
};

const MainVideoSummary = ({
  chapter,
  unit,
  unitIndex,
  chapterIndex,
}: Props) => {
  return (
    <div className="flex-[2] mt-16">
      <h4 className="text-sm uppercase text-secondary-foreground/60">
        Unit {unitIndex + 1} » Chapter {chapterIndex + 1}
      </h4>
      <h1 className="text-4xl font-bold">{chapter.name}</h1>
      <iframe
        title="Chapter Video"
        className="w-full mt-4 aspect-video max-h-[24rem]"
        src={`https://www.youtube.com/embed/${chapter.videoId}`}
        allowFullScreen
      />
      <div className="mt-4">
        <h3 className="text-3xl font-semibold">Summary</h3>
        <p className="text-secondary-foreground/80">{chapter.summary}</p>
      </div>
    </div>
  );
};

export default MainVideoSummary;
