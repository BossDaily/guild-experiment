"use client";

import { NextPage } from "next";
import { ReactNode } from "react";
import GuildIcon from "./GuildIcon";
import Link from "next/link";
import GuildIconLG from "./GuildIconLG";

type Props = {
  guildId: String;
  guildIcon: String | null;
  guildName: String;
};

export default function GuildCard({ guildIcon, guildId, guildName }: Props) {
  return (
    <div className="h-56 flex gap-4 flex-col w-72 sm:w-80 bg-black rounded-xl relative">
      <div className="py-2 pl-2 relative items-center justify-end overflow-hidden w-full h-full rounded-xl">
        <GuildIconLG guildIcon={guildIcon} guildId={guildId} />
      </div>
      <span className="absolute top-9 left-28 items-center justify-center">
        <GuildIcon guildIcon={guildIcon} guildId={guildId} />
      </span>
      <div className="flex flex-row justify-start">
        <h1 className="text-white flex-none font-helvetica font-bold text-xl px-2 pb-2">
          {guildName}
        </h1>
      </div>
    </div>
  );
}
