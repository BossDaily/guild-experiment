"use client";

import { NextPage } from "next";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Card } from "flowbite-react";

type Props = {
  children: ReactNode;
};

export default function Component({ name, id, description }: { name: string, id: number, description: string[]}) {
  return (
    <div className="max-w-xl ">
      <Card style={{ "backgroundColor": "rgb(0 0 0 / var(--tw-bg-opacity))" }} className="hover:shadow-cornflower-blue-400 hover:shadow-xl">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {
            // @ts-ignore
          description.map((desc) => (
            <p
              className="font-normal text-gray-700 dark:text-gray-400"
              key={desc}
            >
              {desc}
            </p>
          ))}
        </p>
        <Link href={`/experiment/${id}`}>
          <Button className="bg-corn" style={{'backgroundColor': 'rgb(68 69 231)'}}>Guilds With this</Button>
        </Link>
      </Card>
    </div>
  );
}
