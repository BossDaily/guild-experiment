import "./globals.css";

import Provider from "./provider";
import { ThemeModeScript } from "flowbite-react";
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
      <head>
        <ThemeModeScript />
      </head>
      <body className="bg-shark-900">
          <Provider>{children}</Provider>
      </body>
    </html>
  );
}
