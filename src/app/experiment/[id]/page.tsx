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
import { parseFilter } from "@/lib/parseFilter";
import { populationCheck } from "@/lib/populationCheck";

const andList = new Intl.ListFormat();
const orList = new Intl.ListFormat("en", { type: "disjunction" });

interface PopulationObject {
  s: number;
  e: number;
}

type PopulationArray = [number, PopulationObject[]];

const experimentData: () => Promise<Exp[]> = async () => {
  const res = await fetch("https://api.rollouts.advaith.io/");
  return res.json();
};


export default async function Home({ params }) {
  const { id } = params;

  const experiments = await experimentData();

  const experiment = experiments.find(
    (experiment) => experiment.data.hash == id
  );
  const exp = experiments.find((experiment) => experiment.data.hash == id);

  console.log(exp.rollout[3].map((pop) => populationCheck(pop, exp.data)));

  return (
    <div
      style={{
        background: "#2f3136",
        marginBottom: ".5rem",
        textAlign: "left",
        width: "800px",
        padding: "1rem",
        borderRadius: "3px",
        maxWidth: "100%",
      }}
      key={exp.data.id}
      id={exp.data.id}
    >
      <h2 style={{ fontSize: "1.5rem", marginTop: "5px", marginBottom: "5px" }}>
        <a href={`#${exp.data.id}`} className="text-white hover:decoration-1">
          {exp.data.title}
        </a>
      </h2>
      <p style={{ fontSize: ".9rem" }}>{exp.data.id}</p>
      <div>hi</div>
    </div>
  );
}
