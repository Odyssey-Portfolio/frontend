import { useState } from "react";
import Image from "next/image";
import { LoggedInUser } from "../../_models/LoggedInUser";
import { FONTSTYLE_PARAGRAPH1, FONT_POPPINS } from "../../_constants/Fonts";

interface AvatarUploaderProps {
  loggedInUser: LoggedInUser;
}
export default function AvatarUploader(props: AvatarUploaderProps) {
  const [hovered, setHovered] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [preview, setPreview] = useState("/airplane.png");
  const topSectionClassname =
    "flex flex-row justify-center items-center space-x-12";
  const avatarWrapperClassname = `relative w-32 h-32 rounded-full border-2 overflow-hidden transition-all duration-300 ${
    hovered ? "border-blue-500 scale-105" : "border-gray-300"
  }`;
  const avatarOverlayClassname = `
  ${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH1}
  absolute inset-0 bg-black bg-opacity-40 flex select-none
      items-center justify-center text-white`;

  return (
    <div className={topSectionClassname}>
      <div
        className={avatarWrapperClassname}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setDialogOpen(true)}
      >
        <Image
          src={preview}
          alt="User Avatar"
          fill
          className="object-cover w-full"
        />
        {hovered && <div className={avatarOverlayClassname}>Change</div>}
      </div>
      {dialogOpen && (
        <UploadDialog setDialogOpen={setDialogOpen} setPreview={setPreview} />
      )}
    </div>
  );
}

interface UploadDialogProps {
  setDialogOpen: (value: boolean) => void;
  setPreview: (value: string) => void;
}
function UploadDialog({ setDialogOpen, setPreview }: UploadDialogProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) setPreview(e.target.result as string);
      };
      reader.readAsDataURL(file);
      setDialogOpen(false);
    }
  };
  const dialogBackdropClassname =
    "fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50";
  const dialogContainerClassname =
    "bg-white rounded-xl p-6 shadow-lg space-y-4 w-80 text-center";
  const dialogTitleClassname = "text-lg font-semibold";
  const fileInputClassname = "w-full";
  const cancelButtonClassname =
    "mt-3 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition";

  // --- Component Return ---
  return (
    <div className={dialogBackdropClassname}>
      <div className={dialogContainerClassname}>
        <h2 className={dialogTitleClassname}>Choose an image</h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={fileInputClassname}
        />

        <button
          onClick={() => setDialogOpen(false)}
          className={cancelButtonClassname}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
