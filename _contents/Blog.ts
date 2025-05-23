import {
  FONT_LEXEND,
  FONT_POPPINS,
  FONTSTYLE_PARAGRAPH1,
  FONTSTYLE_SUBTEXT2,
} from "@/_constants/Fonts";

export const CONTENT_BLOG_ABOUT_TITLE = "About this Page";
export const CONTENT_BLOG_ABOUT_CONTENT = `
    <div class="flex flex-col gap-5">
        <p class="${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT2}">Dear Visitor,</p>

        <p class="${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH1}">Firstly, thank you very much for visiting my Blogs page.</p>
        
        <p class="${FONT_POPPINS.className}">So you might be wondering - how did it come to life?</p>
        <p class="${FONT_POPPINS.className}">    
            To be frank, I'm a forgetful person, so whenever I come across something new, regardless of its complexity, I tend to jot it down.    
            The more I do so, the more I realize its potential as a personal documentation, 
            as basic, yet essential lessons tend to slip my mind the further I proceed in my career.
        </p>
        <p class="${FONT_POPPINS.className}">
            From my experience, it's intriguing to explain complex topics in the simplest way possible.
            Not only does this make the whole learning process more enjoyable, but it helps me
            build strong fundamentals to tackle more challenging issues.
        <p class="${FONT_POPPINS.className}">
            Hence the birth of this page.
        </p>
        <p class="${FONT_POPPINS.className}">
            With that said, I'm looking forward to seeing this page becoming a useful source of information —
            especially for beginners who are struggling to grasp the basics of programming, just like who I used to be.
            
        </p>
        <p class="${FONT_POPPINS.className}">  
            Lastly, I hope that through the comment section (which will be implemented in the near future),
            we can learn something more from each other.
        </p>

        <p class="${FONT_LEXEND.className} ${FONTSTYLE_SUBTEXT2}">Enjoy!</p>
    </div>

`;
