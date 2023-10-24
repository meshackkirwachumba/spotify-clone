"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import React from "react";

interface MediaItemProps {
  data: Song;
  onClickItem?: (id: string) => void;
}

const MediaItem = ({ data, onClickItem }: MediaItemProps) => {
  const imageUrl = useLoadImage(data);

  const handleItemClick = () => {
    if (onClickItem) {
      return onClickItem(data.id);
    }

    //Default turn on player
  };
  return (
    <div
      onClick={handleItemClick}
      className="
        flex
        items-center
        gap-x-3
        cursor-pointer
        hover:bg-neutral-800/50
        w-full
        p-2
        rounded-md
     "
    >
      {/* image wrapper div */}
      <div
        className="
           relative
           rounded-md
           min-h-[48px]
           min-w-[48px]
           overflow-hidden
         "
      >
        <Image
          alt="media item"
          fill
          src={imageUrl || "/images/liked.png"}
          className="object-cover"
        />
      </div>
      {/* title wrapper div*/}
      <div
        className="
        flex
        flex-col
        gap-y-1
        overflow-hidden
       "
      >
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
