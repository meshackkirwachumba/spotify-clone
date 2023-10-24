"use client";

import uniqid from "uniqid";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ReusableModal from "./ReusableModal";
import useSongUploadModalState from "@/hooks/useSongUploadModal";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadSongModal = () => {
  const uploadModalState = useSongUploadModalState();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  //react-hook-form
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  //save data in db
  const onSubmitData: SubmitHandler<FieldValues> = async (values) => {
    //upload data to supabase
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      //if the following fields are missing break from this function
      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }

      //generate a unique id
      const uniqueID = uniqid();

      //upload song file to songs bucket
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload");
      }
      //upload image file to images bucket
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed image upload");
      }
      /////////// upload to db
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      //When success
      router.refresh();
      setIsLoading(false);
      toast.success("Song created!");
      reset();
      uploadModalState.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  //if the modal is open close it
  const closeUploadModal = (open: boolean) => {
    if (!open) {
      //everytime you close the modal we reset the form
      reset();
      uploadModalState.onClose();
    }
  };

  /////////
  return (
    <ReusableModal
      title="Add a Song "
      description="Upload an mp3 file"
      isOpen={uploadModalState.isOpen}
      onChange={closeUploadModal}
    >
      <form
        onSubmit={handleSubmit(onSubmitData)}
        className="flex flex-col gap-y-4"
      >
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song author"
        />
        <div>
          <p className="pb-1">Select a song file</p>
          <Input
            id="song"
            type="file"
            accept=".mp3"
            disabled={isLoading}
            {...register("song", { required: true })}
            placeholder="Song author"
          />
        </div>
        <div>
          <p className="pb-1">Select an image</p>
          <Input
            id="image"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register("image", { required: true })}
            placeholder="Song author"
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          Create
        </Button>
      </form>
    </ReusableModal>
  );
};

export default UploadSongModal;
