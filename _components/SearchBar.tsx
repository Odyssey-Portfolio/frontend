import { COLOR_PRIMARY } from "@/_constants/Colors";
import { FONT_POPPINS, FONTSTYLE_SUBTEXT2 } from "@/_constants/Fonts";
import { setKeyword } from "@/_redux/getBlogs/getBlogsActions";
import { useDispatch } from "react-redux";

export default function SearchBar() {
  const searchBarClassname = `col-span-10 min-h-16 border-2 rounded-xl`;
  const inputClassname = `${FONT_POPPINS.className} ${FONTSTYLE_SUBTEXT2} 
  w-full h-full focus:outline-none rounded-xl p-5`;
  const dispatch = useDispatch();

  return (
    <div className={searchBarClassname} style={{ borderColor: COLOR_PRIMARY }}>
      <input
        type="text"
        placeholder="Enter a blog title..."
        className={inputClassname}
        onChange={(event) => dispatch(setKeyword(event.target.value))}
      />
    </div>
  );
}
