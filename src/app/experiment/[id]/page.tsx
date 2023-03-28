import { NextPage } from "next";
import path from "node:path";
import { ReactNode } from "react";
import fs, { read, readdirSync } from "fs";



export default async function Home({ params }) {
  

  const { id } = params;

  return <div className="text-white">Experiment: {id}</div>;
}