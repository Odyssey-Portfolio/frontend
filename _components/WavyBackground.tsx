interface WavyBackgroundProps {
  children: React.ReactNode;
}
export default function WavyBackground(props: WavyBackgroundProps) {
  return (
    <>
      <div className="w-full min-h-screen">
        <Background />
        {/* Page content */}
        <div className="relative">{props.children}</div>
      </div>
    </>
  );
}

function Background() {
  const waveColors = ["#0066cc", "#3399ff", "#66ccff", "#99ddff", "#cceeff"];

  // 2 full wave crests: Start -> Down -> Up -> Down again
  const wavePath =
    "M0,160 " +
    "C360,320, 720,0, 1080,160 " + // Wave 1 (down -> up)
    "C1260,213, 1380,213, 1440,160 " + // Wave 2 (gentle dip)
    "L1440,320 L0,320 Z"; // Bottom close

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
