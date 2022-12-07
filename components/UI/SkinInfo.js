import {
  Heading,
  Image,
  Box,
  Icon,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import SkinText from "./SkinText";
import { UilEstate, UilHeart, UilHeartBreak } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// const marqueeVariants = {
//   animate: {
//     x: [0, -1035],
//     transition: {
//       x: {
//         repeat: Infinity,
//         repeatType: "loop",
//         duration: 5,
//         ease: "linear",
//       },
//     },
//   },
// };

const boxVariants = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.3,
      delay: 0.4,
    },
  },
};

const imageVariants = {
  hidden: {
    scale: 2,
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

const banner = {
  animate: {
    x: ["calc(0)", "calc(-50%)"],
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,

      x: {
        duration: 7,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  },
};

const letterAni = {
  initial: { y: 400 },
  animate: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1,
    },
  },
};

const bottomBorderVariants = {
  hidden: {
    width: 0,
  },
  visible: {
    width: "70%",
    transition: {
      delay: 0.4,
    },
  },
};

const SkinInfo = (props) => {
  const [likedSkins, setLikedSkins] = useState([]);
  const [buttonBGColor, setButtonBGColor] = useState("gray");
  const [buttonIcon, setButtonIcon] = useState(<UilHeart />);

  let bg = "#B3B3B3";

  switch (props.rarity) {
    case "uncommon":
      bg = "#84C173";
      break;

    case "rare":
      bg = "#82BFDC";
      break;

    case "epic":
      bg = "#BD7BF5 ";
      break;

    case "legendary":
      bg = "#E0661C";
      break;

    case "dark":
      bg = " #CF6FBD ";
      break;

    case "frozen":
      bg = "#B2DFFF";
      break;

    case "lava":
      bg = "#C1687B";
      break;

    case "shadow":
      bg = "#6A6A6A";
      break;

    case "slurp":
      bg = "#73D4F2 ";
      break;

    case "dc":
      bg = " #2D6290 ";
      break;

    case "marvel":
      bg = " #AB0000 ";
      break;

    case "starwars":
      bg = " #0A1833 ";
      break;

    case "icon":
      bg = "#3F9EBE ";
      break;

    case "gaminglegends":
      bg = "#312B7B ";
      break;
  }

  useEffect(() => {
    if (localStorage.getItem("likedSkins") === null) {
      localStorage.setItem("likedSkins", JSON.stringify(likedSkins));
    } else {
      const currentLikedSkins = JSON.parse(localStorage.getItem("likedSkins"));
      if (currentLikedSkins.indexOf(props.id) !== -1) {
        setButtonBGColor("red");
        setButtonIcon(<UilHeart />);
      } else {
        setButtonBGColor("gray");
        setButtonIcon(<UilHeartBreak />);
      }
    }
  }, []);

  const handleLike = () => {
    console.log(props.id);
    const currentLikedSkins = JSON.parse(localStorage.getItem("likedSkins"));

    if (currentLikedSkins.indexOf(props.id) !== -1) {
      const filteredLikedSkins = currentLikedSkins.filter(
        (skin) => skin !== props.id
      );
      localStorage.setItem("likedSkins", JSON.stringify(filteredLikedSkins));
      setButtonBGColor("gray");
      setButtonIcon(<UilHeartBreak />);
    } else {
      localStorage.setItem(
        "likedSkins",
        JSON.stringify([...currentLikedSkins, props.id])
      );
      setButtonBGColor("red");
      setButtonIcon(<UilHeart />);
    }
  };

  return (
    <Box position="relative" overflow="hidden" minH="100vh">
      <Heading
        as={motion.h2}
        color={bg}
        whiteSpace="nowrap"
        fontSize="25vw"
        display="flex"
        justifyContent="center"
        overflowY="hidden"
        overflowX="visible"
        // textOverflow="clip"
        minW="150vw"
        w="max-content"
        position={["static", "static", "static", "absolute"]}
        textTransform="uppercase"
        top="-7rem"
        userSelect="none"
        variants={banner}
        initial="initial"
        animate="animate"
      // variants={marqueeVariants}
      // animate="animate"
      >
        {[...props.name].map((letter, i) => (
          <motion.span variants={letterAni} key={i}>
            {letter}
          </motion.span>
        ))}
      </Heading>

      <Flex flexDirection="column">
        <Box position={["static", "static", "static", "absolute"]}>
          <Image
            as={motion.img}
            src={props.img}
            alt={props.name}
            w={["100vw", "600px", "700px", "100vh"]}
            marginInline="auto"
            userSelect="none"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          />
          <Flex
            h="5px"
            w="70%"
            background={bg}
            margin="0 auto"
            borderRadius="5px"
            mb="1rem"
            as={motion.div}
            variants={bottomBorderVariants}
            initial="hidden"
            animate="visible"
          ></Flex>
        </Box>

        <Box
          as={motion.div}
          position={["static", "static", "static", "absolute"]}
          left="45%"
          top="40%"
          padding="1rem"
          marginX={["1rem", "2rem", "3rem", "0"]}
          bg="#111315"
          borderRadius="10px"
          marginRight={["1rem", "2rem", "3rem", "2rem"]}
          variants={boxVariants}
          initial="hidden"
          animate="visible"
        >
          <SkinText title="Description" text={props.description} likeButton={<Button
            onClick={handleLike}
            colorScheme={buttonBGColor}
          >
            {buttonIcon}
          </Button>} />
          <SkinText title="Rarity" text={props.rarity} />
          <SkinText title="Introduction" text={props.introduction} />
        </Box>
      </Flex>

      <Link href="/">
        <Button
          as={motion.div}
          position="absolute"
          fontSize="2rem"
          bottom="1rem"
          left={["52%", "52%", "52%", "5%"]}
          marginLeft="-50px"
          bg="blackAlpha.400"
          _hover={{ bg: `${bg}` }}
          _focus={{ bg: `${bg}` }}
          padding="1.5rem"
          borderRadius="5px"
          variants={boxVariants}
          initial="hidden"
          animate="visible"
        >
          <Icon as={UilEstate} color="gray.300" />
        </Button>
      </Link>

      <Box paddingBottom="5rem" />
    </Box>
  );
};

export default skinInfo;
