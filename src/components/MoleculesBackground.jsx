import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import MolecularCluster from "./MolecularCluster";

const MoleculesBackground = () => {
  const controls = useAnimation();
  const [scrollY, setScrollY] = useState(0);

  // Track scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scale background based on scroll
  useEffect(() => {
    const scale = 1 + scrollY / 2000; 
    controls.start({ scale });
  }, [scrollY]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      animate={controls}
      style={{ originX: 0.5, originY: 0.5 }}
    >
      {/* Add multiple molecular clusters */}
      <MolecularCluster top="12%" left="8%" scale={1.1} delay={0.2} color="text-emerald-500" />
      <MolecularCluster top="25%" left="70%" scale={1} delay={0.6} color="text-teal-500" hideOnMobile />
      <MolecularCluster top="55%" left="18%" scale={1.2} delay={1} color="text-cyan-500" />
      <MolecularCluster top="75%" left="80%" scale={0.9} delay={1.4} color="text-emerald-400" hideOnMobile />
      <MolecularCluster top="40%" left="50%" scale={1.3} delay={0.8} color="text-teal-400" />
      <MolecularCluster top="85%" left="30%" scale={1} delay={1.6} color="text-cyan-400" hideOnMobile />
      <MolecularCluster top="10%" left="50%" scale={0.8} delay={2} color="text-emerald-600" />
      <MolecularCluster top="60%" left="65%" scale={1} delay={2.4} color="text-teal-600" hideOnMobile />
      <MolecularCluster top="20%" left="85%" scale={1.1} delay={2.8} color="text-cyan-600" hideOnMobile />
      <MolecularCluster top="70%" left="10%" scale={0.9} delay={3.2} color="text-emerald-500" />
    </motion.div>
  );
};

export default MoleculesBackground;
