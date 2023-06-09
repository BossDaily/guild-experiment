"use client";

import { NextPage } from "next";
import { ReactNode } from "react";
import Image from "next/image";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

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
          style={{ backgroundColor: "rgb(35 39 42 / var(--tw-bg-opacity))" }}
        >
          <div className="flex md:order-2" >
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Image
                  src={
                    // @ts-ignore
                    session.discordUser.image_url
                  }
                  className="mr-5 rounded-full"
                  alt="Flowbite Logo"
                  width={52}
                  height={52}
                />
              }
              placement="bottom-end"
              color="red"
              style={{ backgroundColor: "rgb(0 0 0)" }}
            >
              <Dropdown.Header >
                <span className="block text-sm">
                  {
                    // @ts-ignore
                    session.discordUser.email
                  }
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={() => signOut()} >Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link>
              <Link href="/" className="">Home</Link>
            </Navbar.Link>
            
            
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar
          fluid={true}
          style={{ backgroundColor: "rgb(35 39 42 / var(--tw-bg-opacity))" }}
        >
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline={true}
              style={{ backgroundColor: "rgb(0 0 0 / var(--tw-bg-opacity))" }}
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
