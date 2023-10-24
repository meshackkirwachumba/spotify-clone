"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";

interface UILayoutProps {
  children: React.ReactNode;
  songs: Song[];
}

const UILayout = ({ children, songs }: UILayoutProps) => {
  const pathname = usePathname();

  const playerState = usePlayer();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );
  return (
    <div
      className={twMerge(
        `
      flex
      h-full
    `,
        playerState.activeId && "h-[calc(100%-80px)]"
      )}
    >
      {/* sidebar component */}
      <div
        className="
         hidden
         md:flex
         flex-col
         gap-y-2
         bg-black
         h-full
         w-[300px]
         p-2
        "
      >
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-5">
            {/* home, search links */}
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>

      {/* main component everything falls here */}
      <main
        className="
         h-full 
         flex-1
         overflow-y-auto
         py-2
        "
      >
        {children}
      </main>
    </div>
  );
};

export default UILayout;
