import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RotatingText = ({
  fixedText = "",
  texts = [],
  mainClassName = "",
  staggerFrom = "last",
  initial = { y: "100%", opacity: 0 },
  animate = { y: 0, opacity: 1 },
  exit = { y: "-120%", opacity: 0 },
  staggerDuration = 0.03,
  splitLevelClassName = "",
  transition = { type: "spring", damping: 25, stiffness: 300 },
  rotationInterval = 2500,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (texts.length === 0) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % texts.length);
    }, rotationInterval);
    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  const currentText = texts[index] || "";
  const letters = currentText.split("");

  return (
    <div className={`flex items-center space-x-3 ${mainClassName} select-none`}>
      {/* Fixed text */}
      <span className="font-semibold text-lg">{fixedText}</span>

      {/* Rotating text container */}
      <div className="relative h-8 w-[110px] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentText}
            className="absolute left-0 top-0 flex space-x-1 text-lg font-extrabold tracking-tight"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              initial: {},
              animate: {},
              exit: {},
            }}
          >
            {letters.map((letter, i) => (
              <motion.span
                key={letter + i}
                className={splitLevelClassName}
                initial={initial}
                animate={animate}
                exit={exit}
                transition={{
                  ...transition,
                  delay:
                    staggerFrom === "last"
                      ? (letters.length - i - 1) * staggerDuration
                      : i * staggerDuration,
                }}
                style={{ display: "inline-block" }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RotatingText;
