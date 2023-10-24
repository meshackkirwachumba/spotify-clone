"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const playerState = usePlayer();

  const { song } = useGetSongById(playerState.activeId);

  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !playerState.activeId) {
    return null;
  }

  return (
    <div
      className="
       flex
       bottom-0
       bg-black
       w-full
       py-2
       h-[80px]
       px-4
     "
    >
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;
