"use client";

import { NextPage } from "next";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

export default function Component({
  name,
  id,
}) {
  return <Link href="/[id]">{name}</Link>;
}
