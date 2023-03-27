"use client";

import { NextPage } from "next";
import { ReactNode } from "react";
import Image from "next/image";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { useSession, signIn, signOut } from "next-auth/react";

type Props = {
  children: ReactNode;
};

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <Navbar
          fluid={true}
          style={{ "background-color": "rgb(0 0 0 / var(--tw-bg-opacity))" }}
        >
          <div className="flex md:order-2" >
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Image
                  src={session.discordUser.image_url}
                  className="mr-5 rounded-full"
                  alt="Flowbite Logo"
                  width={52}
                  height={52}
                />
              }
              placement="bottom-end"
              style={{ "background-color": "rgb(0 0 0 / var(--tw-bg-opacity))" }}
            >
              <Dropdown.Header >
                <span className="block text-sm">
                  {session.discordUser.username}
                </span>
                <span className="block truncate text-sm font-medium">
                  {session.discordUser.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link href=""><p className="text-white"></p>Home</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar fluid={true}>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <p onClick={() => signIn()} className="text-white">
                  Sign in
                </p>
              }
            ></Dropdown>
            <Navbar.Toggle />
          </div>
        </Navbar>
      </div>
    );
  }
}
