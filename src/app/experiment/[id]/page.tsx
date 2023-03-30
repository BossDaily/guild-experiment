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
function Population(population, data) {
  let popTotal = 0;
  let populationElements = population[0].map((bucket) => ({
    description:
      data.description.find((d) => d.startsWith(`Treatment ${bucket[0]}`)) ??
      "None",
    percentage: (() => {
      const sum = bucket[1].reduce(
        (total, range) => total + range.e - range.s,
        0
      );
      popTotal += sum;
      return (sum / 100).toFixed(2) + "%";
    })(),
    ranges: bucket[1].map((range) => `${range.s} - ${range.e}`).join(", "),
    color: bucket[0] > 0 ? "#46c46e" : "#ed4245",
  }));
  let filter = population[1][0]
    ? andList.format(population[1].map((f) => parseFilter(f)))
    : "";
  let totalPercentage = "";
  if (popTotal < 10_000) {
    totalPercentage = ((10_000 - popTotal) / 100).toFixed(2) + "%";
    populationElements = [
      ...populationElements,
      {
        description: data.description[0],
        percentage: totalPercentage,
        ranges: "",
        color: "#ed4245",
      },
    ];
  }
  console.log(populationElements);
  return {
    filter,
    populationElements,
    totalPercentage,
  };
}

export default async function Home({ params }) {
  const { id } = params;

  const experiments = await experimentData();

  const experiment = experiments.find(
    (experiment) => experiment.data.hash == id
  );
  const exp = experiments.find((experiment) => experiment.data.hash == id);

  console.log(exp.rollout[3].map((pop) => popu(pop, exp.data)));

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
