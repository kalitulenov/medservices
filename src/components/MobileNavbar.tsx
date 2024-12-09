
"use client";

import Link from "next/link";
import React, { useState } from "react";

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden flex flex-col border-2 items-end">
      <button
        className="text-white focus:outline-none "
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
          />
        </svg>
      </button>

      <div className={`md:hidden ${isOpen ? "block" 
                      : 
                      "hidden"} transition-transform transform 
                      ${isOpen ? "translate-y-0" : "translate-y-full"}`} >
        <div className="flex flex-col items-center p-8 space-y-2">
          <Link href={"#home"} className="link">
            Home
          </Link>
          <Link href={"#about"} className="link">
            About
          </Link>
          <Link href={"#services"} className="link">
            Services
          </Link>
          <Link href={"#contact"} className="link">
            Contact
          </Link>
        </div>
      </div>

    </div>)};
