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
import { APIGuild } from "discord-api-types/v10";
import { checkGuild } from "@/lib/checkGuild";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import NavBar from "@/components/NavBar";
import GuildCard from "@/components/Guild/GuildCard";
import GuildContainer from "@/components/Guild/GuildContainer";
import { Button, Dropdown } from "flowbite-react";
import Client from "@/components/Client";

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

  const guildFetch = await fetch(
    `https://discord.com/api/v10/users/@me/guilds`,
    {
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${session?.accessToken}`,
      },
    }
  );

  const guilds: APIGuild[] = await guildFetch.json();

  const expFetch = await fetch(
    `https://experiments.dscrd.workers.dev/experiments/${exp?.data.id}`
  );
  const expInfo = await expFetch.json();
  let expFeatures: any[] = [];

  if (
    "rollout" in expInfo &&
    typeof expInfo.rollout.populations[Symbol.iterator] === "function"
  ) {
    await Promise.all(
      expInfo.rollout.populations.map(async (pop) => {
        pop.filters.map((feat) => {
          if (feat.type == "feature") {
            if (feat.features[0] !== "COMMUNITY")
              expFeatures.push(feat.features[0]);
          }
        });
      })
    );
  }

  let guildsWithExperiment: APIGuild[] = [];
  let guildMightHaveExperiment: APIGuild[] = [];

  if (guilds && typeof guilds[Symbol.iterator] === "function") {
    await Promise.all(
      guilds.map(async (guild) => {
        // @ts-ignore
        const gldCheck = await checkGuild(exp?.data.id, guild.id);
        // @ts-ignore
        if (gldCheck.valid == true) {
          guildMightHaveExperiment.push(guild);
          if (expFeatures.length == 0) {
            guildsWithExperiment.push(guild);
          } else if (
            guild.features.some((feat) => expFeatures.includes(feat))
          ) {
            guildsWithExperiment.push(guild);
          }
        }
      })
    );
  }

  console.log(expFeatures);
  console.log(guilds.length);
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
        <div className="self-center">
          <Client>
          {guildMightHaveExperiment.length !== 0 ? (
            <GuildContainer glds={guildMightHaveExperiment} />
          ) : (
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-white text-2xl overflow-hidden">
                No guilds with this experiment
              </div>
            </div>
          )}
          </Client>
        </div>

        <h2 className="self-center text-white font-bold text-4xl">
          {guildsWithExperiment.length}/{guilds.length}
        </h2>
      </div>
    </div>
  );
}
