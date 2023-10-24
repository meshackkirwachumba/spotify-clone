"use client";

import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import ReusableModal from "./ReusableModal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModalState from "@/hooks/useAuthModal";
import { useEffect } from "react";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModalState();

  const closeModal = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  //once we successfully register or login close the modal automatically
  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  return (
    <ReusableModal
      title="Welcome back"
      description="Login to your account!"
      isOpen={isOpen}
      onChange={closeModal}
    >
      <Auth
        supabaseClient={supabaseClient}
        theme="dark"
        providers={["github", "google"]}
        magicLink
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
    </ReusableModal>
  );
};

export default AuthModal;
