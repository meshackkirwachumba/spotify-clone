import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "./getSongs";

const getSongsSearchedByTitle = async (
  titleStringData: string
): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  //if there is no title searched get all songs
  if (!titleStringData) {
    const allSongs = getSongs();
    return allSongs;
  }

  //get data as per your search
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${titleStringData}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return (data as any) || [];
};

export default getSongsSearchedByTitle;
