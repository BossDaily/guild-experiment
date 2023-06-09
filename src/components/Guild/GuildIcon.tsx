"use client";

import { NextPage } from "next";
import Image from "next/image";

type Props = {
  guildId: String;
  guildIcon: String | null;
};

export default function GuildIcon({
  guildIcon,
  guildId,
}: Props) {
  return (
    <>
      {guildIcon ? (
        <Image
          src={`https://cdn.discordapp.com/icons/${guildId}/${guildIcon}.png`}
          width={96}
          height={96}
          className="rounded-full"
          alt="Guild Icon"
        />
      ) : (
        <Image
          src={`https://cdn.discordapp.com/embed/avatars/${Math.floor(
            Math.random() * 6
          )}.png`}
          width={96}
          height={96}
          className="rounded-full"
          alt="Default Guild Icon"
        />
      )}
    </>
  );
}
