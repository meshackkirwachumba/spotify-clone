"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import React from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModalState from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  const router = useRouter();
  const { onOpen } = useAuthModalState();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  //handle supabase logout
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    //Reset any playing songs in future
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out");
    }
  };
  return (
    <div
      className={twMerge(
        `
         h-fit
         bg-gradient-to-b
         from-emerald-800
         p-6
     `,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        {/*display on large screen  view */}
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>

        {/* display on mobile view xs, sm */}
        <div className="flex md:hidden gap-x-2  items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>

        {/* display on both views header contents  */}
        <div className="flex justify-between items-center  gap-x-4">
          {user ? (
            <div className="flex items-center gap-x-4">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={onOpen}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Signup
                </Button>
              </div>
              <div>
                <Button onClick={onOpen} className="bg-white px-6 py-2">
                  Login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

export default Header;
