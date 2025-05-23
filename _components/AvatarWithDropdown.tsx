// components/AvatarWithDropdown.tsx
"use client";

import { LogOut } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface AvatarDropdownProps {
  avatarUrl: string;
  name?: string;
  onLogout: () => void;
}

export default function AvatarWithDropdown({
  avatarUrl,
  name,
  onLogout,
}: AvatarDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
          className="rounded-full border object-cover shadow transition hover:shadow-md"
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <button
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
