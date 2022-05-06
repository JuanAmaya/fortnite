import { Center, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

// FRAMER MOTION VARIANTS
const topbarVariants = {
  hidden: {
    width: "100px",
    borderRadius: "50%",
    y: -100,
  },
  visible: {
    width: "100vw",
    borderRadius: "30%",
    y: 0,
    background: [
      "linear-gradient(90deg, #409AE2, #80D4F6)",
      "linear-gradient(90deg,#80D4F6,  #409AE2)",
      "linear-gradient(90deg, #409AE2, #80D4F6)",
    ],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      background: {
        duration: 1,
        repeat: Infinity,
        duration: 3,
      },
    },
  },
};

const imageVariants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.4,
    },
  },
};

const Topbar = () => {
  return (
    <Center>
      <motion.div
        style={{
          maxWidth: "100%",
          height: 130,
          marginTop: "-1.5rem",
          position: "absolute",
          zIndex: "1",
        }}
        variants={topbarVariants}
        initial="hidden"
        animate="visible"
      />

      <Image
        as={motion.img}
        src="/ForniteLogo.png"
        alt="Fortnite Logo"
        h="50px"
        zIndex="10"
        mt="1rem"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      />
    </Center>
  );
};

export default Topbar;
