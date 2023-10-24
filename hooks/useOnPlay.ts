import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModalState from "./useAuthModal";
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[]) => {
  const playerState = usePlayer();
  const authModalState = useAuthModalState();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModalState.onOpen();
    }

    playerState.setId(id);
    playerState.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
