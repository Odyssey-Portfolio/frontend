"use client";
import {
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_WHITE,
} from "@/_constants/Colors";
import { FONT_LEXEND } from "@/_constants/Fonts";
import { SUCCESS } from "@/_constants/ResponseCodes";
import { LoggedInUser } from "@/_models/LoggedInUser";
import { selectAuthData } from "@/_redux/auth/authSelector";
import { logoutThunk } from "@/_redux/auth/authThunk";
import { setSnackbarMessage } from "@/_redux/snackbar/snackbarActions";
import { AppDispatch } from "@/_redux/store";
import { getLoggedInUser } from "@/utils/AuthUtils";
import { nanoid } from "@reduxjs/toolkit";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AvatarWithDropdown from "./AvatarWithDropdown";
type NavbarItem = {
  name: string;
  route: string;
};

export default function NavBar() {
  const navbarClassname = `fixed transform top-5 bg-white/30 backdrop-blur-lg flex flex-wrap justify-center
     shadow-lg rounded-xl px-2 py-2 md:px-6 md:py-3 flex gap-4 items-center z-20 w-11/12 md:w-fit`;
  const highligherClassname = `rounded-3xl p-2`;
  const navitemClassname = `${FONT_LEXEND.className} flex flex-row text-center select-none text-sm sm:text-base`;
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
      name: "About",
      route: "/about-portfolio",
    },
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
      <AvatarButton />
    </motion.div>
  );
}

function AvatarButton() {
  const buttonContainerClassname = "flex items-center space-x-4";
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser>();
  const authData = useSelector(selectAuthData);
  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  useEffect(() => {
    if (!loggedInUser) setLoggedInUser(getLoggedInUser());
    else setIsLoggedIn(true);
  }, [loggedInUser]);

  useEffect(() => {
    if (authData && authData.statusCode === SUCCESS) {
      dispatch(
        setSnackbarMessage({
          id: nanoid(),
          message: authData.message,
          type: "success",
        })
      );
      window.location.href = "/";
    } else if (authData && authData.statusCode !== SUCCESS) {
      dispatch(
        setSnackbarMessage({
          id: nanoid(),
          message: authData.message,
          type: "error",
        })
      );
    }
    // return () => {
    //   dispatch(clearAuthData());
    // };
  }, [dispatch, router, authData]);
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
        <AvatarWithDropdown avatarUrl="/airplane.ico" onLogout={handleLogout} />
      )}
    </>
  );
}
