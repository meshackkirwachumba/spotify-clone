import getSongsSearchedByTitle from "@/actions/getSongsSearchedByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import React from "react";
import SearchContent from "./components/SearchContent";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

export const revalidate = 0;

const SearchPage = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsSearchedByTitle(searchParams.title);

  return (
    <div
      className="
      bg-neutral-900
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
     "
    >
      {/* header search */}
      <Header className="from-bg-neutral-900">
        <div className="flex flex-col gap-y-6 mb-2">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
          <SearchInput />
        </div>
      </Header>

      {/* search results */}
      <SearchContent songs={songs} />
    </div>
  );
};

export default SearchPage;
