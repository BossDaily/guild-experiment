"use client";

import { NextPage } from "next";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Card } from "flowbite-react";

type Props = {
  children: ReactNode;
};

export default function Component({ name, id, description }) {
  return (
    <div className="max-w-sm">
      <Card style={{ "background-color": "rgb(0 0 0 / var(--tw-bg-opacity))" }} >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description.map((desc) => (
            <p
              className="font-normal text-gray-700 dark:text-gray-400"
              key={desc}
            >
              {desc}
            </p>
          ))}
        </p>
        <Link href={`/experiment/${id}`}>
          <Button>Guilds With this</Button>
        </Link>
      </Card>
    </div>
  );
}
