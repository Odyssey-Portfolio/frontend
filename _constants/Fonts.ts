import { Lexend, Poppins } from "next/font/google";

/*Custom fonts here */
export const FONT_LEXEND = Lexend({ subsets: ["latin"] });
export const FONT_POPPINS = Poppins({ weight: "400", subsets: ["latin"] });
export const FONT_POPPINS2 = Poppins({ weight: "800", subsets: ["latin"] });

/*Custom font styles here */
export const FONTSTYLE_HEADING1 = `font-bold text-6xl`;
export const FONTSTYLE_HEADING2 = `font-bold text-5xl`;
export const FONTSTYLE_HEADING3 = `text-6xl`;
export const FONTSTYLE_HEADING4 = `text-[2.5rem]`;
export const FONTSTYLE_SUBTEXT1 = `text-3xl`;
export const FONTSTYLE_SUBTEXT2 = `text-2xl`;
export const FONTSTYLE_SUBTEXT3 = `font-bold text-2xl`;
export const FONTSTYLE_PARAGRAPH1 = `text-xl`;
export const FONTSTYLE_PARAGRAPH2 = `text-lg`;
