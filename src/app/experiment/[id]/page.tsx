import { NextPage } from "next";
import path from "node:path";
import { ReactNode } from "react";
import fs, { read, readdirSync } from "fs";

const experimentData = async () => {
  const res = await fetch("https://api.rollouts.advaith.io/");
  return res.json();
};




export default async function Home({ params }) {
  const { id } = params;

  const experiments = await experimentData();
  const experiment = await experiments.find((experiment) => experiment.data.hash == id);
  console.log(experiment)
  

  return <div className="text-white">Experiment: {experiment.data.title}</div>;
}