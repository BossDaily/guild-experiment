"use client";

import { Button, Dropdown, Modal } from "flowbite-react";
import { ReactNode } from "react";

export default function Client({ children }: { children: ReactNode }) {
  return (
    <div>
      <Modal
        
        
      >
        {children}
      </Modal>
    </div>
  );
}
