"use client";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "@/_constants/Colors";
import { FONT_LEXEND } from "@/_constants/Fonts";
import Link from "next/link";
type NavbarItem = {
  name: string;
  route: string;
};

export default function NavBar() {
  const navbarClassname =
    "fixed left-1/2 transform -translate-x-1/2 top-5 bg-white/30 backdrop-blur-lg shadow-lg rounded-xl px-6 py-3 flex gap-6 items-center";
  const navbarItems: NavbarItem[] = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Work Experience",
      route: "/work-experience",
    },
    {
      name: "Pet Projects",
      route: "/",
    },
    {
      name: "Contact Me!",
      route: "/",
    },
  ];
  const navitemClassname = `${FONT_LEXEND.className}`;
  return (
    <nav className={navbarClassname}>
      {navbarItems.map((item, key) => {
        return (
          <Link
            href={item.route}
            key={key}
            className={navitemClassname}
            onMouseEnter={(e) => (e.currentTarget.style.color = COLOR_PRIMARY)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = COLOR_SECONDARY)
            }
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
