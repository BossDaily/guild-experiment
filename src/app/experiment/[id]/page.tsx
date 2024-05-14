import { NextPage } from "next";
import path from "node:path";
import { ReactNode } from "react";
import fs, { read, readdirSync } from "fs";
import {
  Experiment as Exp,
  Filter,
  FilterType,
  Population,
} from "../../../../experiment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Routes, type APIUser, type APIGuild } from "discord-api-types/v10";
import { REST } from "@discordjs/rest";
import { checkGuild } from "@/lib/checkGuild";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import NavBar from "@/components/NavBar";
import GuildCard from "@/components/Guild/GuildCard";
import GuildContainer from "@/components/Guild/GuildContainer";
import { Button, Dropdown } from "flowbite-react";
import Extra from "@/components/ExtraGuilds";

const experimentData: () => Promise<Exp[]> = async () => {
  const res = await fetch("https://api.rollouts.advaith.io/");
  return res.json();
};

export default async function Home({ params }: { params: Params }) {
  const { id } = params;

  const experiments = await experimentData();

  const experiment = experiments.find(
    (experiment) => experiment.data.hash == id
  );
  const exp = experiments.find((experiment) => experiment.data.hash == id);

  const session = await getServerSession(authOptions);

  const userRest = new REST({ authPrefix: "Bearer" }).setToken(
    session?.accessToken
  );
  let guildsWithExperiment: APIGuild[] = [];
  const guilds = await userRest
    .get(Routes.userGuilds())
    .then((res) => res as APIGuild[]);

  for (const guild of guilds) {
    let bodyContent = JSON.stringify({
      experiment_id: `${id}`,
      guild: {
        id: guild.id,
        features: guild.features,
      },
    });

    const expFetch = await fetch("https://dux.xhyrom.dev/v2/eligible", {
      method: "POST",
      body: bodyContent,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const expInfo = await expFetch.json();
    if (expInfo.status === 404 ) {
      console.error("Error 404")
      break;
    }


    if (expInfo.eligible) {
      guildsWithExperiment.push(guild);
    }

  }

  return (
    <div>
      <NavBar />
      <div className="flex flex-col gap-4">
        <h2 className="self-center text-white font-bold text-4xl">
          {exp?.data.title}
        </h2>
        <div className="">
          {guildsWithExperiment.length !== 0 ? (
            <GuildContainer glds={guildsWithExperiment} />
          ) : (
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-white text-2xl overflow-hidden">
                No guilds with this experiment
              </div>
            </div>
          )}
        </div>
        <h2 className="self-center text-white font-bold text-4xl">
          {guildsWithExperiment.length}/{guilds.length}
        </h2>
      </div>
    </div>
  );
}
