"use client";

import { NextPage } from "next";
import Image from "next/image";

type Props = {
  guildId: String;
  guildIcon: String | null;
};

export default function GuildIconLG({
  guildIcon,
  guildId,
}: Props) {
  return (
    <>
      {guildIcon ? (
        <Image
          src={`https://cdn.discordapp.com/icons/${guildId}/${guildIcon}.png`}
          layout="fill"
          className="blur-md rounded-xl"
          alt="Guild Icon"
        />
      ) : (
        <Image
          src={`https://cdn.discordapp.com/embed/avatars/${Math.floor(
            Math.random() * 7
          )}.png`}
          className="blur-md"
          alt="Default Guild Icon"
        />
      )}
    </>
  );
}