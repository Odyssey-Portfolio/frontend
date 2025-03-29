"use client";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "@/_constants/Colors";
import { FONT_LEXEND } from "@/_constants/Fonts";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
type NavbarItem = {
  name: string;
  route: string;
};

export default function NavBar() {
  const navbarClassname = `fixed transform  top-5 bg-white/30 backdrop-blur-lg
     shadow-lg rounded-xl px-6 py-3 flex gap-4 items-center z-20`;
  const highligherClassname = `rounded-3xl p-2`;
  const navitemClassname = `${FONT_LEXEND.className} flex flex-row text-center select-none`;
  const [selectedItem, setSelectedItem] = useState<string>("Home");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
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
      name: "Projects",
      route: "/projects",
    },
    {
      name: "Blogs",
      route: "/blogs",
    },
    {
      name: "Contact Me!",
      route: "/",
    },    
  ];

  return (
    <motion.nav
      className={navbarClassname}
      animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {navbarItems.map((item, key) => {
        const isActive = selectedItem === item.name;
        return (
          <motion.div
            key={key}
            className={highligherClassname}
            animate={{
              borderWidth: isActive ? 2 : 0,
              borderColor: COLOR_PRIMARY,
            }}
            transition={{ stiffness: 100, damping: 10 }}
          >
            <Link
              href={item.route}
              className={navitemClassname}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = COLOR_PRIMARY)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = COLOR_SECONDARY)
              }
              onClick={() => setSelectedItem(item.name)}
            >
              {item.name}
            </Link>
          </motion.div>
        );
      })}
    </motion.nav>
  );
}
