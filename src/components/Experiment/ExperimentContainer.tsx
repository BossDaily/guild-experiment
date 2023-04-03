'use client'

import ExperimentCard from "@/components/Experiment/ExperimentCard";
import { Experiment } from "../../../experiment";

export default async function Home({exp}: {exp: Experiment[]}) {
  const experiments = exp;
  

  return (
    <main>
      <div>
        <div className="justify-center grid grid-rows-1 gap-4 md:grid-cols-4 px-4">
          {
            // @ts-ignore
          experiments.reverse().map((experiment) => (
            <ExperimentCard
              key={experiment.data.id}
              id={experiment.data.hash}
              name={experiment.data.title}
              description={experiment.data.description}
            />
          ))}
        </div>
      </div>
    </main>
  );
}