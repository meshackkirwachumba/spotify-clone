"use client";

import AuthModal from "@/components/AuthModal";
import UploadSongModal from "@/components/UploadSongModal";
import React, { useEffect, useState } from "react";

//Ensuring none of the modals can be opened during server side rendering
//This ModalProvider component will host all modals created
const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  //if useEffect loads we are in client not server state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  //if useEffect does not load or run return null
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div>
        <UploadSongModal />
        <AuthModal />
      </div>
    </>
  );
};

export default ModalProvider;
