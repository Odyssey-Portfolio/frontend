import Image from "next/image";
export interface RoundedImageProps {
  src: string;
  width: number;
  height: number;
}
export default function RoundedImage(props: RoundedImageProps) {
  const avatarClassname = `w-4/5 h-4/5 rounded-full overflow-hidden`;
  return (
    <Image
      className={avatarClassname}
      src={props.src}
      alt="avatar"
      objectFit="contain"
      width={props.width}
      height={props.height}
    />
  );
}
