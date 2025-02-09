import RoundedImage from "@/_components/RoundedImage";
import { LOREM_IPSUM } from "../_constants/DummyText";
import { FONT_LEXEND, FONT_POPPINS } from "../_constants/Fonts";

export default function HomePage() {
  const aboutMeClassname = `flex flex-col m-12 items-center justify-center space-y-4`;
  return (
    <div className={aboutMeClassname}>
      <WelcomeText />
      <AvatarAndBio />
    </div>
  );
}

function WelcomeText() {
  const welcomeClassname = `${FONT_LEXEND.className} text-center space-y-2`;
  return (
    <div className={welcomeClassname}>
      <h1 className="text-6xl font-bold">Howdey hey! I'm Anh.</h1>
      <h6 className="text-2xl">Or you can call me Andy for short.</h6>
    </div>
  );
}
function AvatarAndBio() {
  const avatarAndBioClassname = `flex flex-row w-4/5 grid grid-cols-12`;
  const roundedImageClassname = `col-span-4`;
  const bioClassname = `${FONT_POPPINS.className} text-lg/8 grid col-span-8`;
  const dummyImage = `https://i.pinimg.com/736x/a0/bd/c9/a0bdc928b19f388f23d6891b9756d2a0.jpg`;
  return (
    <div className={avatarAndBioClassname}>
      <div className={roundedImageClassname}>
        <RoundedImage src={dummyImage} height={300} width={300} />
      </div>
      <p className={bioClassname}>{LOREM_IPSUM}</p>
    </div>
  );
}
