{
  /* @ts-expect-error Async Server Component */
}

import Image from "next/image";
import NavBar from "../components/NavBar";
import ExperimentCard from "@/components/Experiment/ExperimentCard";
import ExperimentContainer from "@/components/Experiment/ExperimentContainer";
import { Experiment } from "../../experiment";

const experimentData = async (): Promise<Experiment[]> => {
  const res = await fetch("https://api.rollouts.advaith.io/", {
    next: { revalidate: 100 },
  });

  return res.json();
};

export default async function Home() {
  const experiments = await experimentData();

  return (
    <main>
      <div>
        <NavBar />
        <ExperimentContainer exp={experiments} />
        <div className="justify-center grid grid-rows-1 gap-4 md:grid-cols-4 px-4"></div>
      </div>
    </main>
  );
}
