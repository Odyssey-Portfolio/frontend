import { ImageButtonWithModalType } from "@/_components/ImageButtonWithModal";
import { NumberedTitleContentType } from "../_components/NumberedTitleContent";
import { FONT_POPPINS, FONTSTYLE_PARAGRAPH1 } from "../_constants/Fonts";

export const CONTENT_SHORTINTRO = `As of now, I am a Consultant at Netcompany Vietnam for almost half a year, maintaining React applications based on customers requirements. 
Although I can wrap my head around most domains in the IT industry, be it Back-end, DevOps, I decide to stick to front-end development for now, as it feels like home to me.`;

export const CONTENT_LIFESTORY = `Since High School, I have always dreamt of creating software products that better our lives. My journey started with Python - a simple yet powerful language which allowed me to create simple apps, like a calculator, a Pomodoro Timer, and so on.
Shortly after entering the University, I got to know awesome tech geeks, as thanks to them, I had learnt more about different technologies, for example, API, Containerzation..., and apply them in some of my personal projects.
Throughout such a journey, there were times when I felt like giving up halfway. But the joy of seeing your brainchildren up and running as expected has propelled me forward.
Hence, I would love to put into good use my perseverance, and some other soft skills, including concise communication, teamwork, open-mindedness.`;

export const CONTENT_BADMINTON = `
<div>
    <div className='mb-12 flex flex-col items-center'>
        <img 
            src="https://english.cdn.zeenews.com/sites/default/files/2023/05/02/1193507-everything-about-badminton.png"                        
            width="500"            
            alt="Badminton players in action"
            class="rounded-lg shadow-lg"
        />
    </div>
    <div className='${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH1}'>
        The first time I took up badminton was 6 years ago, when I was just a high school student. Back then, I was fortunate enough to exchange skills with professional players, who had a lot of tricks up their sleeves. <br/><br/>
        Most importantly, however, they were easy-going for newcomers, and ready to cover/support newbies like me during intense matches. So… special shoutout to them for shaping a not-so-horrible player like who I am today. 🤣 <br/><br/>
        And until now, I still decide to stick to this badass sport, as it helps me improve qualities that, I believe, no other alternatives can do, including agility, stamina, and sportsmanship.
    <div>
</div>
`;
export const CONTENT_MOTORCYCLETRIPS = `<div>
    <div className='mb-12 flex flex-col items-center'>
        <img 
            src="https://www.motorcyclenews.com/wp-images/5035/sinnis-terrain-125-01.jpg" 
            alt="Motorcycle with terrain"
            width="500"
            class="rounded-lg shadow-lg"
        />
    </div>
    <div className='${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH1}'>
        Long before I began engaging in motorcycle trips, I once had a time taking bicycle trips around my hometown. The feeling of taking in fresh sea breeze, or having a wide vision of surrounding scenery, while slowly pedaling, … it’s indescribable. <br/><br/>
        I believe such days have also molded me into someone who derives joy from taking motorbike trips around HCMC during my free time. <br/><br/>
        I have been thinking about taking long trips to different provinces in the country. But, safety issues explains why I'm still hesitant to take such trips. <br/><br/>

    <div>
</div>
`;

export const CONTENT_COFFEE = `<div>
    <div className='mb-12 flex flex-col items-center'>
        <img 
            src="/coffee.jpg" 
            alt="Badminton players in action"
            width="500"
            class="rounded-lg shadow-lg"
        />
    </div>
    <div className='${FONT_POPPINS.className} ${FONTSTYLE_PARAGRAPH1}'>
        Ah yes, my so-called “liquid nitrogen of the day” (laughs). Just a trivia, do you know that overclocking masters use liquid nitrogen to boost CPU frequencies to shocking numbers? Well, this applies the same for me, as without coffee, I can say that most of my daily productivity is wasted. <br/><br/>
        This is also probably my most commonly ordered drink, especially during the university days, when I and my classmates hung out at different coffee shops to speedrun group projects. <br/><br/>
        And definitely, one of my future goals/dreams is to work on a laptop, by the window, with a cup of coffee, and in front of me would be a garden of some kind. <br/><br/>
    <div>
</div>
`;

export const CONTENT_FUTUREGOALS: NumberedTitleContentType[] = [
  {
    title: "Improve my expertise",
    description:
      "With solid knowledge of a specific domain, I believe we can create long-term values, and tackle complex challenges with more ease. Hence, I've been open to new ideas, and challenges.",
  },
  {
    title: "Expand professional connection",
    description:
      "For me, professional connection is something that shouldn't be overlooked. Simply put, I can't imagine who I am now, if it were not for the supportive buddies that I had made along the way.",
  },
  {
    title: "Share knowledge with everyone",
    description:
      "Honestly, I feel highly motivated when I can wrap my head around complex topics, and share them with everyone. With that said, stay tuned for ELI5 Stories!",
  },
  {
    title: "Become the best version of myself",
    description:
      "I believe that by doing what I'm best at and truly enjoy, I can achieve not only the skills for the future, but also most importantly, happiness.",
  },
];

export const CONTENT_HOBBIES: ImageButtonWithModalType[] = [
  {
    image: "/badminton.jpg",
    title: "Badminton",
    htmlContent: CONTENT_BADMINTON,
  },
  {
    image: "/mtb-touring.jpg",
    title: "Motorcycle Trips",
    htmlContent: CONTENT_MOTORCYCLETRIPS,
  },
  {
    image: "/coffee.jpg",
    title: "Coffee",
    htmlContent: CONTENT_COFFEE,
  },
];
