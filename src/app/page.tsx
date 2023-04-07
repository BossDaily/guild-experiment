import Image from "next/image";
import NavBar from "../components/NavBar";
import ExperimentCard from "@/components/Experiment/ExperimentCard";
import ExperimentContainer from "@/components/Experiment/ExperimentContainer";
import { Experiment } from "../../experiment";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const fetchCache = 'force-no-store'

export async function generateMetadata(): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  let avatar = `https://media.discordapp.net/attachments/996891985157828638/1084314805407584296/cow.gif?size=20`
  if (session) {
    avatar = `${session.discordUser.image_url}?size=20`
  }
  return {
    icons: {
      icon: avatar
    }
  };
}
const experimentData = async (): Promise<Experiment[]> => {
  const res = await fetch("https://api.rollouts.advaith.io/", {
    next: { revalidate: 60 },
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
