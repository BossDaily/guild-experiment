"use client";

import { Flowbite } from "flowbite-react";
import { customtheme as theme } from "../app/theme";
import { ReactNode } from "react";


export default function Provider({ children }: {children: ReactNode}) {
  return <Flowbite theme={{ theme }}>{children}</Flowbite>;
}