"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModalState from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useSongUploadModalState from "@/hooks/useSongUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

interface LibraryProps {
  songs: Song[];
}

const Library = ({ songs }: LibraryProps) => {
  const authModalState = useAuthModalState();
  const songuploadModalState = useSongUploadModalState();
  const { user } = useUser();

  const onPlay = useOnPlay(songs);

  //adding or uploading a new song
  const onUploadSong = () => {
    //if you are not logged in open login modal
    if (!user) {
      authModalState.onOpen();
    }

    //TODO check for subscriptions

    return songuploadModalState.onOpen();
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onUploadSong}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>

      <div
        className="
         flex
         flex-col
         gap-y-2
         mt-4
         px-3
       "
      >
        {songs.map((item) => (
          <MediaItem
            onClickItem={(id: string) => onPlay(id)}
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
