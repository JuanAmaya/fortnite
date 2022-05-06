import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";

const boxVariants = {
  hidden: {
    y: "120vh",
  },
  visible: {
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.5,
      type: "spring",
    },
  },
};

const imageVariants = {
  hidden: {
    scale: 0.5,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      type: "spring",
    },
  },
};

const notFound = () => {
  return (
    <Box
      h="100vh"
      maxHeight="100%"
      overflow="hidden"
      textAlign="center"
      backgroundColor="#18191a"
    >
      <Flex
        as={motion.div}
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        height="50vh"
        variants={boxVariants}
        initial="hidden"
        animate="visible"
      >
        <Heading
          fontSize={["10rem", "10rem", "15rem", "15rem"]}
          marginTop={["-1rem", "-1rem", "-4rem", "-4rem"]}
          marginBottom="-3rem"
          color="gray.300"
        >
          404
        </Heading>
        <Text
          fontSize="2xl"
          color="gray.400"
          marginY="1rem"
          textTransform="capitalize"
        >
          Page Not Found
        </Text>
        <Link href="/">
          <Button colorScheme="blue" marginBottom="1rem">
            Return To Menu
          </Button>
        </Link>
      </Flex>
      <Box
        overflow="hidden"
        w="100vw"
        position="absolute"
        bottom="0"
        zIndex="1"
      >
        <Image
          as={motion.img}
          src="/errorScreen.jpg"
          alt="Page Not Found"
          objectFit="cover"
          w="100%"
          h="500px"
          maxH="50vh"
          objectPosition="center"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        />
      </Box>
    </Box>
  );
};

export default notFound;
