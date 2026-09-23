"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();

  // Demo counters
  const [planCount] = useState(0);
  const [savedCount] = useState(0);

  const navItemStyle =
    "btn btn-ghost rounded-full px-5 text-sm font-medium";

  const activeNavStyle =
    "bg-[#1A2312] text-[var(--primary-color)] hover:bg-[#1A2312]";

  const navItems = (
    <>
      <li>
        <Link
          href="/"
          className={`${navItemStyle} ${
            pathname === "/" ? activeNavStyle : ""
          }`}
        >
          Workouts
        </Link>
      </li>

      <li>
        <Link
          href="/my-plan"
          className={`${navItemStyle} ${
            pathname === "/my-plan" ? activeNavStyle : ""
          }`}
        >
          My Plan
        </Link>
      </li>
    </>
  );

  return (
    <header className="border-t border-[#202124] bg-[#0C0D0F] text-[#A7A9B0]">
      <div className="navbar mx-auto min-h-22 max-w-375 px-4 sm:px-6 lg:px-8">
        {/* ==================== LEFT ==================== */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-square"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={-1}
              className="menu dropdown-content z-50 mt-3 w-52 rounded-box border border-[#202124] bg-[#0C0D0F] p-2 shadow-xl"
            >
              {navItems}
            </ul>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="btn btn-ghost gap-2 px-2 text-xl hover:bg-transparent"
          >
            <Image
              src="/logo.png"
              alt="FITLOG"
              width={32}
              height={32}
              priority
            />

            <span className="font-oswald font-bold tracking-wide text-white">
              FITLOG
            </span>
          </Link>
        </div>

        {/* ==================== CENTER ==================== */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center gap-1 p-0">
            {navItems}
          </ul>
        </div>

        {/* ==================== RIGHT ==================== */}
        <div className="navbar-end gap-1 sm:gap-3">
          {/* Plan */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 px-2 py-2 text-sm font-medium transition-colors hover:text-white sm:px-3"
          >
            <span>Plan</span>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-(--primary-color) px-1.5 text-xs font-bold text-black">
              {planCount}
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 px-2 py-2 text-sm font-medium transition-colors hover:text-white sm:px-3"
          >
            <span>Saved</span>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-[#34363C] px-1.5 text-xs text-[#A7A9B0]">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;