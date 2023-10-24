"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import PlayButton from "./PlayButton";

interface SongItemProps {
  onClickSong: (id: string) => void;
  data: Song;
}

const SongItem = ({ onClickSong, data }: SongItemProps) => {
  const imagePath = useLoadImage(data);
  return (
    <div
      onClick={() => onClickSong(data.id)}
      className="
         relative
         group
         flex
         flex-col
         items-center
         justify-center
         rounded-md
         overflow-hidden
         gap-x-4
         bg-neutral-400/5
         cursor-pointer
         hover:bg-neutral-400/10
         transition
         p-3
     "
    >
      {/* image wrapper */}
      <div
        className="
         relative
         aspect-square
         w-full
         h-full
         rounded-md
         overflow-hidden
       "
      >
        <Image
          alt="image"
          fill
          src={imagePath || "/images/liked.png"}
          className="object-cover"
        />
      </div>
      {/* text wrapper */}
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="truncate w-full font-semibold">{data.title}</p>
        <p
          className="
            text-neutral-400
            text-sm
            pb-4
            w-full
            truncate
           "
        >
          By {data.author}
        </p>
      </div>
      {/* play button */}
      <div
        className="
          absolute
          bottom-24
          right-5
       "
      >
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
