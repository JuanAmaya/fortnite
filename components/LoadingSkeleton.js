import { Skeleton, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";

const LoadingSkeleton = () => {
  const n = 15;

  return (
    <Grid
      as={motion.div}
      templateColumns="repeat(auto-fit, minmax(9rem, 1fr))"
      maxW="50rem"
      gap="1rem"
      mx="auto"
      mt="5"
      pb="5"
      justifyItems="center"
      initial="hidden"
      animate="visible"
      variants={{
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
      }}
    >
      {[...Array(n)].map((e, i) => (
        <Skeleton
          height="12rem"
          width="9rem"
          borderRadius="10px"
          startColor="#1a1b1c"
          endColor="#2a2c2e"
          key={Math.random().toString()}
        />
      ))}
    </Grid>
  );
};

export default LoadingSkeleton;
