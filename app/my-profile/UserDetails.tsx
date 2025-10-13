"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import TextInput from "../../_components/AtomicComponents/TextInput";

interface UserProfileForm {
  name: string;
  email: string;
}
export default function UserDetails() {
  const [hovered, setHovered] = useState(false);
  const profilePageColumnClassname = `grid grid-cols-12`;
  const username = "Viet Anh"; // example
  const methods = useForm<UserProfileForm>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: UserProfileForm) => {
    console.log("Updated profile:", data);
  };

  // 🌸 Classname constants
  const containerClassname =
    "w-full mx-auto rounded-2xl shadow-md p-6 space-y-6 bg-white";
  const topSectionClassname = "flex items-center space-x-4";
  const avatarWrapperClassname = `relative w-20 h-20 rounded-full overflow-hidden border-2 transition-all duration-300 ${
    hovered ? "border-blue-500 scale-105" : "border-gray-300"
  }`;
  const avatarOverlayClassname =
    "absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-sm";
  const greetingTextClassname = "text-gray-600 text-sm";
  const usernameTextClassname = "text-xl font-semibold";
  const formContainerClassname = "space-y-4";
  const submitButtonClassname =
    "w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition";

  return (
    <div className={containerClassname}>
      {/* --- Top Section --- */}
      <div className={topSectionClassname}>
        <div
          className={avatarWrapperClassname}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src="/airplane.png"
            alt="User Avatar"
            fill
            sizes="80px"
            className="object-cover"
            priority
          />
          {hovered && <div className={avatarOverlayClassname}>Change</div>}
        </div>

        <div>
          <p className={greetingTextClassname}>Good Morning,</p>
          <p className={usernameTextClassname}>{username}</p>
        </div>
      </div>

      {/* --- Bottom Section --- */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={formContainerClassname}
      >
        <TextInput
          label="Name"
          type="text"
          {...register("name", { required: "Name is required" })}
          error={errors.name?.message}
        />

        <TextInput
          label="Email"
          type="email"
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message}
        />

        <button type="submit" className={submitButtonClassname}>
          Save Changes
        </button>
      </form>
    </div>
  );
}
