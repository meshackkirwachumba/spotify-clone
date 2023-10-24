"use client";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent = ({ song, songUrl }: PlayerContentProps) => {
  const playerState = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (playerState.ids.length === 0) {
      return;
    }

    const currentIndex = playerState.ids.findIndex(
      (id) => id === playerState.activeId
    );

    const nextSong = playerState.ids[currentIndex + 1];

    if (!nextSong) {
      return playerState.setId(playerState.ids[0]);
    }

    playerState.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (playerState.ids.length === 0) {
      return;
    }

    const currentIndex = playerState.ids.findIndex(
      (id) => id === playerState.activeId
    );

    const previousSong = playerState.ids[currentIndex - 1];

    if (!previousSong) {
      return playerState.setId(playerState.ids[playerState.ids.length - 1]);
    }

    playerState.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };
  return (
    <div
      className="
       grid
       grid-cols-2
       md:grid-cols-3
       h-full
     "
    >
      <div
        className="
          flex
          w-full
          justify-start
         "
      >
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      {/* mobile view controller*/}
      <div
        className="
         flex
         md:hidden
         col-auto
         w-full
         justify-end
         items-center
       "
      >
        <div
          onClick={handlePlay}
          className="
           w-10
           h-10
           flex
           items-center
           justify-center
           rounded-full
         bg-white
           p-1
           cursor-pointer
         "
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      {/* desktop controller */}
      <div
        className="
         hidden
         h-full
         md:flex
         justify-center
         items-center
         w-full
         max-w-[722px]
         gap-x-6
       "
      >
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="
           text-neutral-400
           cursor-pointer
           hover:text-white
           transition
         "
        />
        <div
          onClick={handlePlay}
          className="
            flex
            items-center
            justify-center
            h-10
            w-10
            rounded-full
            bg-white
            p-1
            cursor-pointer
         "
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="
            text-neutral-400
            cursor-pointer
            hover:text-white
            transition
           "
        />
      </div>

      {/* speaker controls */}
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="
            size={34}
           "
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
