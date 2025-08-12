"use client";
import { useIsMediumScreen } from "@/_hooks/useIsMediumScreen";
import { useSelector } from "react-redux";
import { selectWavyBackgroundEnabled } from "../_redux/wavyBackground/wavyBackgroundSelector";
import FM_FadeIn from "./FramerMotion/FM_FadeIn";

interface WavyBackgroundProps {
  children: React.ReactNode;
}
export default function WavyBackground(props: WavyBackgroundProps) {
  const backgroundEnabled = useSelector(selectWavyBackgroundEnabled);
  return (
    <>
      <div className="w-full min-h-screen">
        <FM_FadeIn showChildren={backgroundEnabled} duration={0.5}>
          <Background />
        </FM_FadeIn>
        {/* Page content */}
        <div className="relative">{props.children}</div>
      </div>
    </>
  );
}

function Background() {
  const isMedium = useIsMediumScreen();
  const waveColors = ["#0066cc", "#3399ff", "#66ccff", "#99ddff", "#cceeff"];

  const base = "M0,160";
  const wave1 = isMedium
    ? "C360,320, 720,0, 1080,160 "
    : "C860,320, 720,0, 1980,160 ";
  const wave2 = isMedium ? "C1260,213, 1380,213, 1440,160 " : "";
  const wave3 = "L1440,320 L0,320 Z"; // Bottom close
  const wavePath = `${base} ${wave1} ${wave2} ${wave3}`;

  return (
    //replaced Tailwind classname with css style to fix styling not working on Vercel deployment
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        zIndex: -10,
      }}
    >
      {waveColors.map((fill, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{ top: `${i * 10 * 0.3}rem`, width: "100vw", height: "100vh" }}
        >
          <svg
            viewBox="0 0 1440 320"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path d={wavePath} fill={fill} fillOpacity={0.05} />
          </svg>
        </div>
      ))}
    </div>
  );
}
