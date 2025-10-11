import { motion } from "framer-motion";

const MolecularCluster = ({
  top,
  left,
  scale = 1,
  delay = 0,
  color = "text-emerald-500",
  hideOnMobile = false,
}) => {
  const nodes = [
    { cx: 40, cy: 60, r: 5 },
    { cx: 100, cy: 30, r: 4 },
    { cx: 160, cy: 80, r: 6 },
    { cx: 220, cy: 40, r: 5 },
    { cx: 280, cy: 70, r: 4 },
  ];

  return (
    <motion.svg
      className={`absolute opacity-40 ${color} ${
        hideOnMobile ? "hidden sm:block" : ""
      }`}
      style={{ top, left, transform: `scale(${scale})` }}
      viewBox="0 0 300 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {/* Connecting lines */}
      <motion.g
        stroke="currentColor"
        strokeWidth="1.2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="40" y1="60" x2="100" y2="30" />
        <line x1="100" y1="30" x2="160" y2="80" />
        <line x1="160" y1="80" x2="220" y2="40" />
        <line x1="220" y1="40" x2="280" y2="70" />
      </motion.g>

      {/* Atom nodes */}
      {nodes.map((node, i) => (
        <motion.circle
          key={i}
          cx={node.cx}
          cy={node.cy}
          r={node.r}
          fill="currentColor"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{
            delay: i * 0.4,
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.svg>
  );
};

export default MolecularCluster;
