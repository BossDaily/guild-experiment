"use client";

import ExperimentCard from "@/components/Experiment/ExperimentCard";
import { Experiment } from "../../../experiment";
import { useState } from "react";
import { TextInput } from "flowbite-react";

export default function Home({ exp }: { exp: Experiment[] }) {
  const experiments = exp;

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const expFiltered = experiments.filter((exp) => {
    return exp.data.title.toLowerCase().includes(inputText);
  });

  return (
    <div className="flex flex-col">
      <div className="self-center flex-none max-w-md pb-4">
        <TextInput onChange={inputHandler} className="" />
      </div>
      <div className="justify-center grid grid-rows-1 gap-4 md:grid-cols-2 lg:grid-cols-4 px-4">
        {
          // @ts-ignore
          expFiltered.reverse().map((experiment) => (
            <ExperimentCard
              key={experiment.data.id}
              id={experiment.data.hash}
              name={experiment.data.title}
              description={experiment.data.description}
            />
          ))
        }
      </div>
    </div>
  );
}
