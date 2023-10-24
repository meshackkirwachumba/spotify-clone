"use client";

import useAuthModalState from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
  songId: string;
}

const LikeButton = ({ songId }: LikeButtonProps) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModalState = useAuthModalState();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  ///useEffect run to check if the song is liked or disliked by me
  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [supabaseClient, songId, user?.id]);

  //dynamically render icon whether you like or not like
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  //like functionality
  const handleLike = async () => {
    if (!user) {
      return authModalState.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        song_id: songId,
        user_id: user.id,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success("Liked!");
      }
    }

    router.refresh();
  };

  return (
    <button
      onClick={handleLike}
      className="
        hover:opacity-75 transition"
    >
      <Icon color={isLiked ? "#22c55e" : "white"} />
    </button>
  );
};

export default LikeButton;
