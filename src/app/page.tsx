import Image from "next/image";
import NavBar from "../components/NavBar";
import ExperimentCard from "@/components/Experiment/ExperimentCard";

const experimentData = async () => {
  const res = await fetch("https://api.rollouts.advaith.io/");

  return res.json();
};

export default async function Home() {
  const experiments = await experimentData();

  return (
    <main>
      <div>
        <NavBar />
        {experiments.reverse().map((experiment) => (
          <ExperimentCard
            key={experiment.data.id}
            id={experiment.data.id}
            name={experiment.data.title}
          />
        ))}
      </div>
    </main>
  );
}
