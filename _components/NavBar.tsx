"use client";
import {
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_WHITE,
} from "@/_constants/Colors";
import { FONT_LEXEND } from "@/_constants/Fonts";
import { LoggedInUser } from "@/_models/LoggedInUser";
import { getLoggedInUser } from "@/utils/AuthUtils";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AvatarWithDropdown from "./AvatarWithDropdown";
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
    // {
    //   name: "Contact Me!",
    //   route: "/",
    // },
  ];

  return (
    <motion.div
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
              backgroundColor: isActive ? COLOR_PRIMARY : "transparent",
              scale: isActive ? 1.05 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              mass: 0.5,
            }}
          >
            <Link
              href={item.route}
              className={navitemClassname}
              style={{ color: isActive ? COLOR_WHITE : COLOR_SECONDARY }}
              onClick={() => setSelectedItem(item.name)}
            >
              {item.name}
            </Link>
          </motion.div>
        );
      })}
      <LoginButton />
    </motion.div>
  );
}

function LoginButton() {
  const buttonContainerClassname = "flex items-center space-x-4";
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser>();
  useEffect(() => {
    if (!loggedInUser) setLoggedInUser(getLoggedInUser());
    else setIsLoggedIn(true);
  }, [loggedInUser]);
  return (
    <>
      {!isLoggedIn ? (
        <div className={buttonContainerClassname}>
          <button
            className="px-6 py-2 text-white font-semibold rounded-xl shadow-md transition"
            style={{ background: COLOR_PRIMARY }}
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      ) : (
        <AvatarWithDropdown avatarUrl="/airplane.ico" onLogout={() => {}} />
      )}
    </>
  );
}
