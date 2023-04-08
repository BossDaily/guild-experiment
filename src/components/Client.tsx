"use client";

import { Button, Dropdown } from "flowbite-react";
import { ReactNode } from "react";

export default function Client({ children }: { children: ReactNode }) {
  return (
    <div>
      <Dropdown
        label={
          <Button
            className="bg-corn"
            style={{ backgroundColor: "rgb(68 69 231)" }}
          >
            Guilds that might have this
          </Button>
        }
        arrowIcon={false}
        inline={true}
        placement="auto"
      >
        {children}
      </Dropdown>
    </div>
  );
}
