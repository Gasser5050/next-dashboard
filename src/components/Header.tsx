"use client";

import Link from "next/link";
import { cn } from "../utils/cn";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  {
    label: "Posts",
    path: "/posts"
  },
  {
    label: "Users",
    path: "/users"
  },
  {
    label: "Todos",
    path: "/todos"
  }
];

function Header() {
  const pathname = usePathname();

  return (
    <header className="text-2xl text-[hsl(200,20%,95%)] bg-[hsl(200,100%,10%)] sticky top-0 z-20">
      <nav className="mx-auto flex items-center justify-between px-6 xs:px-8 sm:px-10 md:px-12 lg:px-15 py-3 sm:py-4">
        <Link className="text-3xl" href={"/"}>
          My App
        </Link>

        <ul className="flex text-xl md:text-2xl space-x-2 md:space-x-4 lg:space-x-6">
          {NAV_LINKS.map(link => {
            const isActive =
              pathname === link.path || pathname.startsWith(`${link.path}/`);

            return (
              <li key={link.label}>
                <Link
                  href={link.path}
                  className={cn(
                    "relative pb-1.5 after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2 after:h-0.5 md:after:h-[2.5px] after:transition-[width] after:duration-400 after:ease-in-out after:bg-current",
                    isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
