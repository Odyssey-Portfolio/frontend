import { AnimatePresence, motion } from "motion/react";
import { JSX } from "react";

interface FM_AppearOnHoverProps {
  children: JSX.Element;
  className?: string;
}
export default function FM_AppearOnHover(props: FM_AppearOnHoverProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={props.className}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
}
