import { COLOR_PRIMARY } from "@/_constants/Colors";
import { FONT_POPPINS, FONTSTYLE_SUBTEXT2 } from "@/_constants/Fonts";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
export default function SearchBar() {
  const searchBarContainerClassname =
    "grid grid-cols-12 items-center border-2 rounded-xl bg-white";
  const searchIconClassname = `col-span-2 rounded-lg border-l-2`;
  const searchBarClassname = `col-span-10`;
  const inputClassname = `${FONT_POPPINS.className} ${FONTSTYLE_SUBTEXT2} 
  w-full h-full focus:outline-none px-5`
  return (
    <div
      className={searchBarContainerClassname}
      style={{ borderColor: COLOR_PRIMARY }}
    >
      <div className={searchBarClassname}>
        <input
          type="text"
          placeholder="Enter a blog title..."
          className={inputClassname}          
        />
      </div>
      <div className={searchIconClassname} style={{borderColor:COLOR_PRIMARY}}>
        <MagnifyingGlassIcon />
      </div>
    </div>
  );
}
