import Image from "next/image";
import NavBar from "../components/NavBar";
import ExperimentCard from "@/components/Experiment/ExperimentCard";

const experimentData = async () => {
  const res = await fetch("https://api.rollouts.advaith.io/", { next: {revalidate: 100 }});

  return res.json();
};

export default async function Home() {
  const experiments = await experimentData();

  return (
    <main>
      <div>
        <NavBar />
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
