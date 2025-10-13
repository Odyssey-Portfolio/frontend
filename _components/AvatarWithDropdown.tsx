"use client";

import { LogOut, UserPen } from "lucide-react";
import Image from "next/image";
import { JSX, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../_redux/auth/authThunk";
import { AppDispatch } from "../_redux/store";
import { useRouter } from "next/navigation";
interface AvatarDropdownProps {
  avatarUrl: string;
  name?: string;
}

export default function AvatarWithDropdown({
  avatarUrl,
  name,
}: AvatarDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuContainerClassname = `absolute right-0 z-50 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5`;
  const userAvatarClassname =
    "rounded-full border object-cover shadow transition hover:shadow-md";
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const actions: Omit<DropdownMenuItemProps, "toggleDropdown">[] = [
    {
      action: () => {
        router.push("my-profile");
      },
      icon: <UserPen className="w-4 h-4" />,
      label: "My Profile",
    },
    {
      action: () => {
        dispatch(logoutThunk());
      },
      icon: <LogOut className="w-4 h-4" />,
      label: "Logout",
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button onClick={() => setOpen(!open)} className="focus:outline-none">
        <Image
          src={avatarUrl}
          alt={name || "User Avatar"}
          width={40}
          height={40}
          className={userAvatarClassname}
        />
      </button>

      {open && (
        <div className={menuContainerClassname}>
          {actions.map((action, key) => {
            return (
              <DropdownMenuItem
                key={key}
                {...action}
                toggleDropdown={(value) => setOpen(value)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

interface DropdownMenuItemProps {
  toggleDropdown: (value: boolean) => void;
  action: () => void;
  label: string;
  icon: JSX.Element;
}
function DropdownMenuItem(props: DropdownMenuItemProps) {
  const menuItemClassname = `flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`;
  return (
    <button
      onClick={() => {
        props.toggleDropdown(false);
        props.action();
      }}
      className={menuItemClassname}
    >
      {props.icon}
      {props.label}
    </button>
  );
}
