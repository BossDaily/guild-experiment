"use client";

import ExperimentCard from "@/components/Experiment/ExperimentCard";
import { Experiment } from "../../../experiment";
import React, { useState } from "react";
import { TextInput } from "flowbite-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import GuildCard from "./GuildCard";
import { APIGuild } from "discord-api-types/v10";

export default function Home({ glds }: { gld: APIGuild[] }) {
  

  const [inputText, setInputText] = useState("");
  let inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const gldsFiltered = glds.filter((gld) => {
    return gld.data.title.toLowerCase().includes(inputText);
  });

  return (
    <div className="flex flex-col bg-zinc-900">
      <div className="self-center flex-none max-w-md pb-4">
        {/* @ts-ignore */}
        <TextInput
          onChange={inputHandler}
          className="hover:shadow-cornflower-blue-400 hover:shadow-xl rounded-xl "
          // @ts-ignore
          icon={MagnifyingGlassIcon}
          style={{ backgroundColor: "rgb(0 0 0 / var(--tw-bg-opacity))" }}
        />
      </div>
      <div className="justify-center grid grid-rows-1 gap-4 md:grid-cols-2 lg:grid-cols-4 px-4">
        {
          // @ts-ignore
          gldsFiltered.reverse().map((gld: APIGuild) => (
            <GuildCard
              key={gld.id}
              guildIcon={gld.icon}
              guildName={gld.name}
              guildId={gld.id}
            />
          ))
        }
      </div>
    </div>
  );
}
