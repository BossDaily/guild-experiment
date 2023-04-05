import "./globals.css";

import FlowbiteProvider from "./flowbiteprovider";
import Provider from "./provider";
import { Flowbite } from "flowbite-react";
import { customtheme as theme } from "../app/theme";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiment Checker",
  description: "Shows all the guilds you're in that have access to an experiment",
  openGraph: {
    images: [
      'https://media.discordapp.net/attachments/996891985157828638/1084314805407584296/cow.gif'
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-900">
        <FlowbiteProvider>
          <Provider>{children}</Provider>
        </FlowbiteProvider>
      </body>
    </html>
  );
}
