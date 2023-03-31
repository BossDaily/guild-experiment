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

  console.log(guilds.length);

  //console.log(exp.rollout[3].map((pop) => populationCheck(pop, exp.data)));

  let guildsWithExperiment: APIGuild[] = [];

  if (guilds && typeof guilds[Symbol.iterator] === 'function') {
    await Promise.all(guilds.map(async (guild) => {
      // @ts-ignore
      const gldCheck = await checkGuild(exp?.data.id, guild.id);
      if (gldCheck.valid == true) {
        guildsWithExperiment.push(guild);
      }
    }));
  }

  console.log(guildsWithExperiment);

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h1>{exp?.data.title}</h1>
      {
        guildsWithExperiment.length == 0 ? (
      guildsWithExperiment.map((guild) => {
        return (
          <div className="bg-gray-700 rounded-lg p-4" key={guild.id}>
            <div className="text-white text-2xl">{guild.name}</div>
            <div className="text-white text-lg">{guild.id}</div>
          </div>
        );
      }) ) : (
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="text-white text-2xl">No guilds with this experiment</div>
          </div>
          )}
    
      <div>hi</div>
    </div>
  );
}
